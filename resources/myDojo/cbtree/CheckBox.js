//>>built
define("cbtree/CheckBox",["dijit/form/CheckBox","dojo/_base/declare","dojo/_base/event","dojo/dom-attr"],function(_1,_2,_3,_4){"use strict";return _2([_1],{baseClass:"cbtreeCheckBox",toggleState:{"mixed":true,"true":false,"false":true},multiState:true,_getCheckedAttr:function(){return this.checked;},_onClick:function(_5){if(!this.readOnly&&!this.disabled){this.toggle();return this.onClick(_5);}return _3.stop(_5);},_setCheckedAttr:function(_6,_7){var _8=_6,_9;if(_8!=="mixed"||!this.multiState){_8=_8?true:false;}_9=(_8=="mixed"?_8:(_8?"true":"false"));this._set("checked",_8);_4.set(this.focusNode||this.domNode,"checked",_8);(this.focusNode||this.domNode).setAttribute("aria-checked",_9);this._handleOnChange(_8,_7);return _8;},_setValueAttr:function(_a){if(typeof _a=="string"){this.value=_a;_4.set(this.focusNode,"value",_a);}},toggle:function(){var _b=this.get("checked");var _c;if(!this.readOnly&&!this.disabled){_c=this.toggleState[_b.toString()];_b=this._setCheckedAttr(_c!==undefined?_c:true);}return _b;}});});