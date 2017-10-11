//>>built
define("cbtree/extensions/TreeOnSubmit",["dojo/json","dojo/when","../Tree"],function(_1,_2,_3){"use strict";function _4(_5,_6){var _7=_5.model;var _8=_7.checkedAttr;var _9=_7.store;var _a={};if(_8&&_6!==undefined){_a[_8]=_6;}return _2(_9.query(_a),function(_b){_b=_b.map(function(_c){return {id:_9.getIdentity(_c),value:_7.getLabel(_c),checked:(_8?(_c[_8]||_7.checkedState):undefined)};});if(_7._forest){_b.shift({id:_7.root.id,value:_7.rootLabel,checked:_7.root[_8],virtual:true});}return _b;},function(_d){throw _d;});};function _e(_f,_10,_11){var id,_12,_13=[],_14,_15;_11=_f.model.store?!!_11:true;if(!_11){_13=_4(_f,_10).map(function(_16){_15=_f._itemNodesMap[_16.id];_16.count=_15?_15.length:0;return _16;});}else{for(id in _f._itemNodesMap){_15=_f._itemNodesMap[id];_14=_15[0];_12={id:id,value:_14.label,checked:(_14._checkBox?_14._checkBox.checked:undefined),count:_15.length};_13.push(_12);}}return _13;};return _3.extend({_hasOnSubmit:true,onSubmit:function(_17,_18,evt){var _19=false,_1a="checkedStates",_1b;var _1c,_1d;if(_17&&!evt.defaultPrevented){if(this.attachToForm&&typeof this.attachToForm==="object"){_1b=this.attachToForm.checked;_19=this.attachToForm.domOnly||false;_1a=this.attachToForm.name||_1a;_1d=_e(this,_1b,_19);_1c=_17.children.namedItem(_1a);if(!_1c){_1c=document.createElement("INPUT");_1c.setAttribute("type","hidden");_1c.setAttribute("name",_1a);_17.appendChild(_1c);}_1c.setAttribute("value",_1.stringify(_1d));}}return !evt.defaultPrevented;}});});