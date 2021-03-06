define("dgrid/extensions/DnD", [
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/_base/array',
	'dojo/aspect',
	'dojo/dom-class',
	'dojo/on',
	'dojo/topic',
	'dojo/has',
	'dojo/when',
	'dojo/dnd/Source',
	'dojo/dnd/Manager',
	'dojo/_base/NodeList',
	'../Selection',
	'dojo/has!touch?../util/touch',
	'dojo/has!touch?./_DnD-touch-autoscroll'
], function (declare, lang, arrayUtil, aspect, domClass, on, topic, has, when, DnDSource,
		DnDManager, NodeList, Selection, touchUtil) {
	// Requirements
	// * requires a store (sounds obvious, but not all Lists/Grids have stores...)
	// * must support options.before in put calls
	//   (if undefined, put at end)
	// * should support copy
	//   (copy should also support options.before as above)

	// TODOs
	// * consider sending items rather than nodes to onDropExternal/Internal
	// * consider emitting store errors via OnDemandList._trackError

	var GridDnDSource = declare(DnDSource, {
		grid: null,

		getObject: function (node) {
			// summary:
			//		getObject is a method which should be defined on any source intending
			//		on interfacing with dgrid DnD.

			var grid = this.grid;
			// Extract item id from row node id (gridID-row-*).
			return grid.collection.get(node.id.slice(grid.id.length + 5));
		},
		_legalMouseDown: function (evt) {
			// Fix _legalMouseDown to only allow starting drag from an item
			// (not from bodyNode outside contentNode).
			var legal = this.inherited(arguments);
			return legal && evt.target !== this.grid.bodyNode;
		},

		// DnD method overrides
		onDrop: function (sourceSource, nodes, copy) {
			var targetSource = this,
				targetRow = this._targetAnchor = this.targetAnchor, // save for Internal
				grid = this.grid,
				store = grid.collection;

			if (!this.before && targetRow) {
				// target before next node if dropped within bottom half of this node
				// (unless there's no node to target at all)
				targetRow = targetRow.nextSibling;
			}
			targetRow = targetRow && grid.row(targetRow);

			when(targetRow && store.get(targetRow.id), function (target) {
				// Note: if dropping after the last row, or into an empty grid,
				// target will be undefined.  Thus, it is important for store to place
				// item last in order if options.before is undefined.

				// Delegate to onDropInternal or onDropExternal for rest of logic.
				// These are passed the target item as an additional argument.
				if (targetSource !== sourceSource) {
					targetSource.onDropExternal(sourceSource, nodes, copy, target);
				}
				else {
					targetSource.onDropInternal(nodes, copy, target);
				}
			});
		},
		onDropInternal: function (nodes, copy, targetItem) {
			var grid = this.grid,
				store = grid.collection,
				targetSource = this,
				anchor = targetSource._targetAnchor,
				targetRow,
				nodeRow;

			if (anchor) { // (falsy if drop occurred in empty space after rows)
				targetRow = this.before ? anchor.previousSibling : anchor.nextSibling;
			}

			// Don't bother continuing if the drop is really not moving anything.
			// (Don't need to worry about edge first/last cases since dropping
			// directly on self doesn't fire onDrop, but we do have to worry about
			// dropping last node into empty space beyond rendered rows.)
			nodeRow = grid.row(nodes[0]);
			if (!copy && (targetRow === nodes[0] ||
					(!targetItem && nodeRow && grid.down(nodeRow).element === nodes[0]))) {
				return;
			}

			nodes.forEach(function (node) {
				when(targetSource.getObject(node), function (object) {
					var id = store.getIdentity(object);

					// For copy DnD operations, copy object, if supported by store;
					// otherwise settle for put anyway.
					// (put will relocate an existing item with the same id, i.e. move).
					store[copy && store.copy ? 'copy' : 'put'](object, {
						beforeId: targetItem ? store.getIdentity(targetItem) : null
					});

					// Self-drops won't cause the dgrid-select handler to re-fire,
					// so update the cached node manually
					if (targetSource._selectedNodes[id]) {
						targetSource._selectedNodes[id] = grid.row(id).element;
					}
				});
			});
		},
		onDropExternal: function (sourceSource, nodes, copy, targetItem) {
			// Note: this default implementation expects that two grids do not
			// share the same store.  There may be more ideal implementations in the
			// case of two grids using the same store (perhaps differentiated by
			// query), dragging to each other.
			var store = this.grid.collection,
				sourceGrid = sourceSource.grid;

			// TODO: bail out if sourceSource.getObject isn't defined?
			nodes.forEach(function (node, i) {
				when(sourceSource.getObject(node), function (object) {
					if (!copy) {
						if (sourceGrid) {
							// Remove original in the case of inter-grid move.
							// (Also ensure dnd source is cleaned up properly)
							when(sourceGrid.collection.getIdentity(object), function (id) {
								!i && sourceSource.selectNone(); // deselect all, one time
								sourceSource.delItem(node.id);
								sourceGrid.collection.remove(id);
							});
						}
						else {
							sourceSource.deleteSelectedNodes();
						}
					}
					// Copy object, if supported by store; otherwise settle for put
					// (put will relocate an existing item with the same id).
					// Note that we use store.copy if available even for non-copy dnd:
					// since this coming from another dnd source, always behave as if
					// it is a new store item if possible, rather than replacing existing.
					store[store.copy ? 'copy' : 'put'](object, {
						beforeId: targetItem ? store.getIdentity(targetItem) : null
					});
				});
			});
		},

		onDndStart: function (source) {
			// Listen for start events to apply style change to avatar.

			this.inherited(arguments); // DnDSource.prototype.onDndStart.apply(this, arguments);
			if (source === this) {
				// If TouchScroll is in use, cancel any pending scroll operation.
				if (this.grid.cancelTouchScroll) {
					this.grid.cancelTouchScroll();
				}

				// Set avatar width to half the grid's width.
				// Kind of a naive default, but prevents ridiculously wide avatars.
				DnDManager.manager().avatar.node.style.width =
					this.grid.domNode.offsetWidth / 2 + 'px';
			}
		},

		onMouseDown: function (evt) {
			// Cancel the drag operation on presence of more than one contact point.
			// (This check will evaluate to false under non-touch circumstances.)
			if (has('touch') && this.isDragging &&
					touchUtil.countCurrentTouches(evt, this.grid.touchNode) > 1) {
				topic.publish('/dnd/cancel');
				DnDManager.manager().stopDrag();
			}
			else {
				this.inherited(arguments);
			}
		},

		onMouseMove: function (evt) {
			// If we're handling touchmove, only respond to single-contact events.
			if (!has('touch') || touchUtil.countCurrentTouches(evt, this.grid.touchNode) <= 1) {
				this.inherited(arguments);
			}
		},

		checkAcceptance: function (source) {
			// Augment checkAcceptance to block drops from sources without getObject.
			return source.getObject &&
				DnDSource.prototype.checkAcceptance.apply(this, arguments);
		},
		getSelectedNodes: function () {
			// If dgrid's Selection mixin is in use, synchronize with it, using a
			// map of node references (updated on dgrid-[de]select events).

			if (!this.grid.selection) {
				return this.inherited(arguments);
			}
			var t = new NodeList(),
				id;
			for (id in this.grid.selection) {
				t.push(this._selectedNodes[id]);
			}
			return t;	// NodeList
		}
		// TODO: could potentially also implement copyState to jive with default
		// onDrop* implementations (checking whether store.copy is available);
		// not doing that just yet until we're sure about default impl.
	});

	// Mix in Selection for more resilient dnd handling, particularly when part
	// of the selection is scrolled out of view and unrendered (which we
	// handle below).
	var DnD = declare(Selection, {
		// dndSourceType: String
		//		Specifies the type which will be set for DnD items in the grid,
		//		as well as what will be accepted by it by default.
		dndSourceType: 'dgrid-row',

		// dndParams: Object
		//		Object containing params to be passed to the DnD Source constructor.
		dndParams: null,

		// dndConstructor: Function
		//		Constructor from which to instantiate the DnD Source.
		//		Defaults to the GridSource constructor defined/exposed by this module.
		dndConstructor: GridDnDSource,

		postMixInProperties: function () {
			this.inherited(arguments);
			// ensure dndParams is initialized
			this.dndParams = lang.mixin({ accept: [this.dndSourceType] }, this.dndParams);
		},

		postCreate: function () {
			this.inherited(arguments);

			// Make the grid's content a DnD source/target.
			var Source = this.dndConstructor || GridDnDSource;
			this.dndSource = new Source(
				this.bodyNode,
				lang.mixin(this.dndParams, {
					// add cross-reference to grid for potential use in inter-grid drop logic
					grid: this,
					dropParent: this.contentNode
				})
			);

			// Set up select/deselect handlers to maintain references, in case selected
			// rows are scrolled out of view and unrendered, but then dragged.
			var selectedNodes = this.dndSource._selectedNodes = {};

			function selectRow(row) {
				selectedNodes[row.id] = row.element;
			}
			function deselectRow(row) {
				delete selectedNodes[row.id];
				// Re-sync dojo/dnd UI classes based on deselection
				// (unfortunately there is no good programmatic hook for this)
				domClass.remove(row.element, 'dojoDndItemSelected dojoDndItemAnchor');
			}

			this.on('dgrid-select', function (event) {
				arrayUtil.forEach(event.rows, selectRow);
			});
			this.on('dgrid-deselect', function (event) {
				arrayUtil.forEach(event.rows, deselectRow);
			});

			aspect.after(this, 'destroy', function () {
				delete this.dndSource._selectedNodes;
				selectedNodes = null;
				this.dndSource.destroy();
			}, true);
		},

		insertRow: function (object) {
			// override to add dojoDndItem class to make the rows draggable
			var row = this.inherited(arguments),
				type = typeof this.getObjectDndType === 'function' ?
					this.getObjectDndType(object) : [this.dndSourceType];

			domClass.add(row, 'dojoDndItem');
			this.dndSource.setItem(row.id, {
				data: object,
				type: type instanceof Array ? type : [type]
			});
			return row;
		},

		removeRow: function (rowElement) {
			this.dndSource.delItem(this.row(rowElement));
			this.inherited(arguments);
		}
	});
	DnD.GridSource = GridDnDSource;

	return DnD;
});
