//>>built
define("dgrid/extensions/ColumnHider",["dojo/_base/declare","dojo/dom-construct","dojo/has","dojo/on","../util/misc","dojo/i18n!./nls/columnHider"],function(_1,_2,_3,_4,_5,_6){var _7,_8;function _9(cb,_a){return cb.id.substr(_a.id.length+18);};return _1(null,{hiderMenuNode:null,hiderToggleNode:null,i18nColumnHider:_6,_hiderMenuOpened:false,_columnHiderRules:null,_columnHiderCheckboxes:null,_renderHiderMenuEntries:function(){var _b=this.subRows,_c=true,_d,_e,sr,c;delete this._columnHiderFirstCheckbox;for(sr=0,_d=_b.length;sr<_d;sr++){for(c=0,_e=_b[sr].length;c<_e;c++){this._renderHiderMenuEntry(_b[sr][c]);if(_c){_c=false;this._columnHiderFirstCheckbox=this._columnHiderCheckboxes[_b[sr][c].id];}}}},_renderHiderMenuEntry:function(_f){var id=_f.id,_10=_5.escapeCssIdentifier(id,"-"),div,_11,_12,_13;if(_f.hidden){_f.hidden=false;this._hideColumn(id);_f.hidden=true;}if(_f.unhidable){return;}div=_2.create("div",{className:"dgrid-hider-menu-row"});_11=this.domNode.id+"-hider-menu-check-"+_10;_12=this._columnHiderCheckboxes[id]=_2.create("input",{className:"dgrid-hider-menu-check hider-menu-check-"+_10,id:_11,type:"checkbox"},div);_13=_2.create("label",{className:"dgrid-hider-menu-label hider-menu-label-"+_10,"for":_11},div);_13.appendChild(document.createTextNode(_f.label||_f.field||""));this.hiderMenuNode.appendChild(div);if(!_f.hidden){_12.checked=true;}},renderHeader:function(){var _14=this,_15=this.hiderMenuNode,_16=this.hiderToggleNode,id;function _17(_18){_18.stopPropagation();};this.inherited(arguments);if(!_15){_16=this.hiderToggleNode=_2.create("button",{"aria-label":this.i18nColumnHider.popupTriggerLabel,className:"ui-icon dgrid-hider-toggle",type:"button"},this.domNode);this._listeners.push(_4(_16,"click",function(e){_14._toggleColumnHiderMenu(e);}));_15=this.hiderMenuNode=_2.create("div",{"aria-label":this.i18nColumnHider.popupLabel,className:"dgrid-hider-menu",id:this.id+"-hider-menu",role:"dialog"});this._listeners.push(_4(_15,"keyup",function(e){var _19=e.charCode||e.keyCode;if(_19===27){_14._toggleColumnHiderMenu(e);_16.focus();}}));_15.style.display="none";this.domNode.appendChild(_15);this._listeners.push(_4(_15,".dgrid-hider-menu-check:"+(_3("ie")<9?"click":"change"),function(e){_14._updateColumnHiddenState(_9(e.target,_14),!e.target.checked);}));this._listeners.push(_4(_15,"mousedown",_17),_4(_16,"mousedown",_17));if(!_8){_8=_4.pausable(document,"mousedown",function(e){_7&&_7._toggleColumnHiderMenu(e);});_8.pause();}}else{for(id in this._columnHiderRules){this._columnHiderRules[id].remove();}_15.innerHTML="";}this._columnHiderCheckboxes={};this._columnHiderRules={};this._renderHiderMenuEntries();},destroy:function(){this.inherited(arguments);for(var id in this._columnHiderRules){this._columnHiderRules[id].remove();}},left:function(_1a,_1b){return this.right(_1a,-_1b);},right:function(_1c,_1d){if(!_1c.element){_1c=this.cell(_1c);}var _1e=this.inherited(arguments),_1f=_1c;while(_1e.column.hidden){_1e=this.inherited(arguments,[_1e,_1d>0?1:-1]);if(_1f.element===_1e.element){return _1c;}_1f=_1e;}return _1e;},isColumnHidden:function(id){return !!this._columnHiderRules[id];},_toggleColumnHiderMenu:function(){var _20=this._hiderMenuOpened,_21=this.hiderMenuNode,_22=this.domNode,_23;_21.style.display=(_20?"none":"");if(_20){_21.style.height="";}else{if(_21.offsetHeight>_22.offsetHeight-12){_21.style.height=(_22.offsetHeight-12)+"px";}(_23=this._columnHiderFirstCheckbox)&&_23.focus();}_8[_20?"pause":"resume"]();_7=_20?null:this;this._hiderMenuOpened=!_20;},_hideColumn:function(id){var _24=this,_25="#"+_5.escapeCssIdentifier(this.domNode.id)+" .dgrid-column-",_26;if(this._columnHiderRules[id]){return;}this._columnHiderRules[id]=_5.addCssRule(_25+_5.escapeCssIdentifier(id,"-"),"display: none;");if(_3("ie")===8||_3("ie")===10){_26=_5.addCssRule(".dgrid-row-table","display: inline-table;");window.setTimeout(function(){_26.remove();_24.resize();},0);}},_showColumn:function(id){if(this._columnHiderRules[id]){this._columnHiderRules[id].remove();delete this._columnHiderRules[id];}},_updateColumnHiddenState:function(id,_27){this[_27?"_hideColumn":"_showColumn"](id);this.columns[id].hidden=_27;_4.emit(this.domNode,"dgrid-columnstatechange",{grid:this,column:this.columns[id],hidden:_27,bubbles:true});this.resize();},toggleColumnHiddenState:function(id,_28){if(typeof _28==="undefined"){_28=!this._columnHiderRules[id];}this._updateColumnHiddenState(id,_28);this._columnHiderCheckboxes[id].checked=!_28;}});});