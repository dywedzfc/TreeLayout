//>>built
define("cbtree/models/ItemWriteStoreEX",["dojo/_base/array","dojo/_base/lang","dojo/data/ItemFileWriteStore"],function(_1,_2,_3){_2.extend(_3,{_validated:false,addReference:function(_4,_5,_6,_7){if(!this.isItem(_4)||!this.isItem(_5)){throw new Error("ItemWriteStoreEX::addReference(): refItem and/or parentItem is not a valid store item");}if(_4!==_5){var _8;if(_5[_6]){_8=_5[_6];this._addReferenceToMap(_4,_5,_6);if(typeof _7==="number"){_5[_6].splice(_7,0,_4);}else{_5[_6].push(_4);}}else{this._addReferenceToMap(_4,_5,_6);_5[_6]=[_4];}this.onSet(_5,_6,_8,_5[_6]);return true;}throw new Error("ItemWriteStoreEX::addReference(): parent and reference items are identical");},attachToRoot:function(_9,_a){if(!this.isRootItem(_9)){_9[this._rootItemPropName]=true;if(_a!==undefined){this._arrayOfTopLevelItems.splice(_a,0,_9);}else{this._arrayOfTopLevelItems.push(_9);}this.onRoot(_9,"attach");}},detachFromRoot:function(_b){if(this.isRootItem(_b)){this._removeArrayElement(this._arrayOfTopLevelItems,_b);delete _b[this._rootItemPropName];this.onRoot(_b,"detach");}},getIdentifierAttr:function(){if(!this._loadFinished){this._forceLoad();}return this._getIdentifierAttribute();},getParents:function(_c){var _d=[],_e;if(_c){var _f=_c[this._reverseRefMap]||_c["backup_"+this._reverseRefMap];if(_f){for(_e in _f){_d.push(this._getItemByIdentity(_e));}}return _d;}},isRootItem:function(_10){this._assertIsItem(_10);return _10[this._rootItemPropName]?true:false;},isValidated:function(){return this._validated;},itemExist:function(_11){var _12,_13,_14;if(typeof _11!="object"&&typeof _11!="undefined"){throw new Error("ItemWriteStoreEX::itemExist(): argument is not an object");}this._assert(!this._saveInProgress);_12=this.getIdentifierAttr();if(_12!==Number&&this._itemsByIdentity){_13=_11[_12];if(typeof _13==="undefined"){throw new Error("ItemWriteStoreEX::itemExist(): item has no identity");}if(!this._pending._deletedItems[_13]){_14=this._itemsByIdentity[_13];}else{throw new Error("ItemWriteStoreEX::itemExist(): item is pending deletion");}}return _14;},loadStore:function(_15){var _16=_15.scope||window.global;var _17=this;function _18(_19,_1a){var _1b=_1a.loadArgs||null;var _1c=_1b.scope;_17.onLoad(_19);if(_1b){if(_1b.onComplete){_1b.onComplete.call(_1c,_19);}}};if(!this._loadFinished){var _1d={queryOptions:{deep:true},loadArgs:_15,onBegin:_18,onError:_15.onError,scope:this};try{this.fetch(_1d);}catch(err){if(onError){onError.call(_16,err);}else{throw err;}}}else{if(onComplete){onComplete.call(_16,this._allFileItems.length);}}},onDelete:function(_1e){if(_1e[this._rootItemPropName]===true){this.onRoot(_1e,"delete");}},onNew:function(_1f,_20){if(this.isRootItem(_1f)){this.onRoot(_1f,"new");}},onLoad:function(_21){},onRoot:function(_22,_23){},setValidated:function(_24){this._validated=Boolean(_24);},removeReference:function(_25,_26,_27){if(!this.isItem(_25)||!this.isItem(_26)){throw new Error("ItemWriteStoreEX::removeReference(): refItem and/or parentItem is not a valid store item");}if(_26[_27]){this._removeReferenceFromMap(_25,_26,_27);var _28=_26[_27];if(this._removeArrayElement(_26[_27],_25)){if(this._isEmpty(_26[_27])){delete _26[_27];}this.onSet(_26,_27,_28,_26[_27]);return true;}}return false;}});});