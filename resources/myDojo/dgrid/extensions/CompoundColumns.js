//>>built
define("dgrid/extensions/CompoundColumns",["dojo/_base/lang","dojo/_base/declare","dojo/sniff","dojo/query","../util/misc"],function(_1,_2,_3,_4,_5){return _2(null,{configStructure:function(){var _6=(this.subRows&&this.subRows[0])||this.columns,_7=[[]],_8=_7[0],_9=[];_7[0].className="dgrid-spacer-row";function _a(_b,_c,_d,_e){var _f=0,_10=function(){},_11,_12;function _13(_14,i){if(typeof _14==="string"){_14={label:_14};}if(!(_b instanceof Array)&&!_14.field){_14.field=i;}_11=_14.children;_12=_11&&(_14.showChildHeaders!==false);_14.parentColumn=_e;if(_11){if(_14.id==null){_14.id=((_e&&_e.id)||_c-1)+"-"+_8.length;}else{if(_e&&_e.id){_14.id=_e.id+"-"+_14.id;}}}else{_9.push(_14);_8.push(_1.delegate(_14,{renderHeaderCell:_10}));_f++;}if(!_12){_14=_1.delegate(_14,{rowSpan:-_c});}if(_11){_f+=(_14.colSpan=_a(_11,_c+1,_12,_14));}if(_d){(_7[_c]||(_7[_c]=[])).push(_14);}};_5.each(_b,_13,this);return _f;};_a(_6,1,true);var _15=_7.length,i,j,_16,_17;for(i=0;i<_15;i++){_16=_7[i];for(j=0;j<_16.length;j++){_17=_16[j];if(_17.rowSpan<1){_17.rowSpan+=_15;}}}_9=[_9];_9.headerRows=_7;this.subRows=_9;this.inherited(arguments);},renderHeader:function(){var i,_18=this.subRows[0],_19=this.subRows.headerRows[0];this.inherited(arguments);for(i=_18.length;i--;){_18[i].headerNode=_19[i].headerNode;}},_findSortArrowParent:function(){var _1a=this.inherited(arguments),_1b,_1c;if(_1a&&_5.contains(_4(".dgrid-spacer-row",this.headerNode)[0],_1a)){_1b=_1a.columnId||_1a.parentNode.columnId;_1c=_4(".dgrid-column-"+_1b,this.headerNode);return _1c[_1c.length-1];}},_configColumn:function(_1d,_1e,_1f){var _20=_1d.parentColumn;var _21=_1d.id;if(_20){var id=_21.indexOf(_1f)===0?_21.substring(_1f.length):_21;_1f=_20.id+"-";_21=_1d.id=_1f+id;}this.inherited(arguments,[_1d,_1e,_1f]);},cell:function(_22,_23){if(typeof _23!=="object"){var _24=this.column(_23);if(_24){_23=_24.id;}}return this.inherited(arguments,[_22,_23]);},column:function(_25){var _26=this.inherited(arguments);if(_26==null&&typeof _25!=="object"){var _27="-"+_25,_28=_27.length;for(var _29 in this.columns){if(_29.indexOf(_27,_29.length-_28)!==-1){return this.columns[_29];}}}return _26;},_updateCompoundHiddenStates:function(id,_2a){var _2b=this.columns[id],_2c;if(_2b&&_2b.hidden===_2a){return;}while(_2b&&_2b.parentColumn){_2b=_2b.parentColumn;_2c=_2b.colSpan=_2b.colSpan+(_2a?-1:1);if(_2c){_2b.headerNode.colSpan=_2c;}if(_2c===1&&!_2a){this._showColumn(_2b.id);}else{if(!_2c&&_2a){this._hideColumn(_2b.id);}}}},_hideColumn:function(id){var _2d=this;this._updateCompoundHiddenStates(id,true);this.inherited(arguments);if(_3("ff")){this.headerNode.style.display="none";setTimeout(function(){_2d.headerNode.style.display="";_2d.resize();},0);}},_showColumn:function(id){this._updateCompoundHiddenStates(id,false);this.inherited(arguments);},_getResizedColumnWidths:function(){var _2e=0,_2f=this.columns,id;for(id in _2f){_2e+=_2f[id].headerNode.offsetWidth;}return {totalWidth:_2e,lastColId:this.subRows[0][this.subRows[0].length-1].id};}});});