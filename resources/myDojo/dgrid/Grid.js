//>>built
define("dgrid/Grid",["dojo/_base/declare","dojo/_base/kernel","dojo/dom-construct","dojo/dom-class","dojo/on","dojo/has","./List","./util/misc","dojo/_base/sniff"],function(_1,_2,_3,_4,_5,_6,_7,_8){function _9(_a,_b){if(_b&&_b.nodeType){_a.appendChild(_b);}};function _c(_d){return _8.escapeCssIdentifier(_d,"-");};var _e=_1(_7,{columns:null,hasNeutralSort:false,cellNavigation:true,tabableHeader:true,showHeader:true,column:function(_f){if(typeof _f!=="object"){return this.columns[_f];}else{return this.cell(_f).column;}},listType:"grid",cell:function(_10,_11){if(_10.column&&_10.element){return _10;}if(_10.target&&_10.target.nodeType){_10=_10.target;}var _12;if(_10.nodeType){do{if(this._rowIdToObject[_10.id]){break;}var _13=_10.columnId;if(_13){_11=_13;_12=_10;break;}_10=_10.parentNode;}while(_10&&_10!==this.domNode);}if(!_12&&typeof _11!=="undefined"){var row=this.row(_10),_14=row&&row.element;if(_14){var _15=_14.getElementsByTagName("td");for(var i=0;i<_15.length;i++){if(_15[i].columnId===_11){_12=_15[i];break;}}}}if(_10!=null){return {row:row||this.row(_10),column:_11&&this.column(_11),element:_12};}},createRowCells:function(tag,_16,_17,_18){var row=_3.create("table",{className:"dgrid-row-table",role:"presentation"}),_19=(_6("ie")<9)?_3.create("tbody",null,row):row,tr,si,sl,i,l,_1a,_1b,id,_1c,_1d,_1e,_1f,_20;_17=_17||this.subRows;for(si=0,sl=_17.length;si<sl;si++){_1a=_17[si];tr=_3.create("tr",null,_19);if(_1a.className){tr.className=_1a.className;}for(i=0,l=_1a.length;i<l;i++){_1b=_1a[i];id=_1b.id;_1c=_1b.field?" field-"+_c(_1b.field):"";_1d=typeof _1b.className==="function"?_1b.className(_18):_1b.className;if(_1d){_1c+=" "+_1d;}_1e=_3.create(tag,{className:"dgrid-cell"+(id?" dgrid-column-"+_c(id):"")+_1c,role:tag==="th"?"columnheader":"gridcell"});_1e.columnId=id;_1f=_1b.colSpan;if(_1f){_1e.colSpan=_1f;}_20=_1b.rowSpan;if(_20){_1e.rowSpan=_20;}_16(_1e,_1b);tr.appendChild(_1e);}}return row;},left:function(_21,_22){if(!_21.element){_21=this.cell(_21);}return this.cell(this._move(_21,-(_22||1),"dgrid-cell"));},right:function(_23,_24){if(!_23.element){_23=this.cell(_23);}return this.cell(this._move(_23,_24||1,"dgrid-cell"));},_defaultRenderCell:function(_25,_26,td){if(this.formatter){var _27=this.formatter,_28=this.grid.formatterScope;td.innerHTML=typeof _27==="string"&&_28?_28[_27](_26,_25):this.formatter(_26,_25);}else{if(_26!=null){td.appendChild(document.createTextNode(_26));}}},renderRow:function(_29,_2a){var _2b=this;var row=this.createRowCells("td",function(td,_2c){var _2d=_29;if(_2c.get){_2d=_2c.get(_29);}else{if("field" in _2c&&_2c.field!=="_item"){_2d=_2d[_2c.field];}}if(_2c.renderCell){_9(td,_2c.renderCell(_29,_2d,td,_2a));}else{_2b._defaultRenderCell.call(_2c,_29,_2d,td,_2a);}},_2a&&_2a.subRows,_29);var div=_3.create("div",{role:"row"});div.appendChild(row);return div;},renderHeader:function(){var _2e=this,_2f=this.headerNode;_2f.setAttribute("role","row");_3.empty(_2f);var row=this.createRowCells("th",function(th,_30){var _31=_30.headerNode=th;var _32=_30.field;if(_32){th.field=_32;}if(_30.renderHeaderCell){_9(_31,_30.renderHeaderCell(_31));}else{if("label" in _30||_30.field){_31.appendChild(document.createTextNode("label" in _30?_30.label:_30.field));}}if(_30.sortable!==false&&_32&&_32!=="_item"){th.sortable=true;th.className+=" dgrid-sortable";}},this.subRows&&this.subRows.headerRows);this._rowIdToObject[row.id=this.id+"-header"]=this.columns;_2f.appendChild(row);if(this._sortListener){this._sortListener.remove();}this._sortListener=_5(row,"click,keydown",function(_33){if(_33.type==="click"||_33.keyCode===32||(!_6("opera")&&_33.keyCode===13)){var _34=_33.target;var _35;var _36;var _37;var _38;do{if(_34.sortable){_35=_34.field||_34.columnId;_36=_2e.sort[0];if(!_2e.hasNeutralSort||!_36||_36.property!==_35||!_36.descending){_37=[{property:_35,descending:_36&&_36.property===_35&&!_36.descending}];}else{_37=[];}_38={bubbles:true,cancelable:true,grid:_2e,parentType:_33.type,sort:_37};if(_5.emit(_33.target,"dgrid-sort",_38)){_2e._sortNode=_34;_2e.set("sort",_37);}break;}}while((_34=_34.parentNode)&&_34!==_2f);}});},resize:function(){var _39=this.headerNode.firstChild,_3a=this.contentNode,_3b;this.inherited(arguments);_3a.style.width="";if(_3a&&_39){if((_3b=_39.offsetWidth)>_3a.offsetWidth){_3a.style.width=_3b+"px";}}},destroy:function(){this._destroyColumns();if(this._sortListener){this._sortListener.remove();}this.inherited(arguments);},_setSort:function(){this.inherited(arguments);this.updateSortArrow(this.sort);},_findSortArrowParent:function(_3c){var _3d=this.columns;for(var i in _3d){var _3e=_3d[i];if(_3e.field===_3c){return _3e.headerNode;}}},updateSortArrow:function(_3f,_40){if(this._lastSortedArrow){_4.remove(this._lastSortedArrow.parentNode,"dgrid-sort-up dgrid-sort-down");_3.destroy(this._lastSortedArrow);delete this._lastSortedArrow;}if(_40){this.sort=_3f;}if(!_3f[0]){return;}var _41=_3f[0].property,_42=_3f[0].descending,_43=this._sortNode||this._findSortArrowParent(_41),_44;delete this._sortNode;if(_43){_43=_43.contents||_43;_44=this._lastSortedArrow=_3.create("div",{className:"dgrid-sort-arrow ui-icon",innerHTML:"&nbsp;",role:"presentation"},_43,"first");_4.add(_43,"dgrid-sort-"+(_42?"down":"up"));this.resize();}},styleColumn:function(_45,css){return this.addCssRule("#"+_8.escapeCssIdentifier(this.domNode.id)+" .dgrid-column-"+_c(_45),css);},_configColumns:function(_46,_47){var _48=[],_49=_47 instanceof Array;function _4a(_4b,_4c){if(typeof _4b==="string"){_47[_4c]=_4b={label:_4b};}if(!_49&&!_4b.field){_4b.field=_4c;}_4c=_4b.id=_4b.id||(isNaN(_4c)?_4c:(_46+_4c));if(this._configColumn){this._configColumn(_4b,_47,_46);_4c=_4b.id;}if(_49){this.columns[_4c]=_4b;}_4b.grid=this;if(typeof _4b.init==="function"){_2.deprecated("colum.init","Column plugins are being phased out in favor of mixins for better extensibility. "+"column.init may be removed in a future release.");_4b.init();}_48.push(_4b);};_8.each(_47,_4a,this);return _49?_47:_48;},_destroyColumns:function(){var _4d=this.subRows,_4e=_4d&&_4d.length,i,j,_4f,len;this.cleanup();for(i=0;i<_4e;i++){for(j=0,len=_4d[i].length;j<len;j++){_4f=_4d[i][j];if(typeof _4f.destroy==="function"){_2.deprecated("colum.destroy","Column plugins are being phased out in favor of mixins for better extensibility. "+"column.destroy may be removed in a future release.");_4f.destroy();}}}},configStructure:function(){var _50=this.subRows,_51=this._columns=this.columns;this.columns=!_51||_51 instanceof Array?{}:_51;if(_50){for(var i=0;i<_50.length;i++){_50[i]=this._configColumns(i+"-",_50[i]);}}else{this.subRows=[this._configColumns("",_51)];}},_getColumns:function(){return this._columns||this.columns;},_setColumns:function(_52){this._destroyColumns();this.subRows=null;this.columns=_52;this._updateColumns();},_setSubRows:function(_53){this._destroyColumns();this.subRows=_53;this._updateColumns();},_updateColumns:function(){this.configStructure();this.renderHeader();this.refresh();this._lastCollection&&this.renderArray(this._lastCollection);if(this._started){if(this.sort.length){this._lastSortedArrow=null;this.updateSortArrow(this.sort);}else{this.resize();}}}});_e.appendIfNode=_9;return _e;});