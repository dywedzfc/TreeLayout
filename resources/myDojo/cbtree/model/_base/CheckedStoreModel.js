//>>built
define("cbtree/model/_base/CheckedStoreModel",["module","dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/when","./BaseStoreModel","../../errors/createError!../../errors/CBTErrors.json"],function(_1,_2,_3,_4,_5,_6,_7){var _8=_7(_1.id);var _9;var _a=_2([_6],{checkedAll:true,checkedAttr:"checked",checkedRoot:false,checkedState:false,checkedStrict:true,enabledAttr:"",multiState:true,normalize:true,_validating:0,_checkedInherit:true,constructor:function(_b){if(!this._writeEnabled){throw new _8("MethodMissing","constructor","Store must be write enabled, no put() supported");}this.set("checkedStrict",this.checkedStrict);if(this.checkedStrict===true){this._loadOptions={all:true};}this._validateDefer=new _4();},_checkedAttrSetter:function(_c){if(typeof _c=="string"){if(/\./.test(_c)){throw new _8("InvalidType","set","checkedAttr can not be a dot separated string");}}else{throw new _8("InvalidType","set","checkedAttr value must be a string");}return this.checkedAttr;},_checkedStrictSetter:function(_d){_d=_d.toLowerCase?_d.toLowerCase():!!_d;this._checkedInherit=true;switch(_d){case false:this._checkedInherit=false;break;case true:break;case "inherit":_d=false;break;default:throw new _8("InvalidType","set","invalid checkedStrict value");}this.checkedStrict=_d;return this.checkedStrict;},_enabledAttrSetter:function(_e){if(typeof _e==="string"){if(this.enabledAttr!==_e){throw new _8("ReadOnly","set","property enabledAttr is read-only");}}else{throw new _8("InvalidType","set","enabledAttr value must be a string");}return this.enabledAttr;},getChecked:function(_f){if(_f==this.root&&!this.checkedRoot){return;}var _10=_f[this.checkedAttr];if(_10==_9){if(this.checkedAll){this._setChecked(_f,this.checkedState);return this.checkedState;}}return _10;},getEnabled:function(_11){var _12=true;if(this.enabledAttr){_12=_11[this.enabledAttr];}return (_12==_9)||!!_12;},setChecked:function(_13,_14){if(!this.checkedStrict&&!this._checkedInherit){this._setChecked(_13,_14);}else{this._updateCheckedChild(_13,_14);}},setEnabled:function(_15,_16){if(this.enabledAttr){return this._setValue(_15,this.enabledAttr,!!_16);}},validateData:function(){},_getCompositeState:function(_17){var _18=false,_19=false,_1a=false,_1b,_1c;_17.some(function(_1d){_1c=this.getChecked(_1d);_1a|=(_1c=="mixed");switch(_1c){case true:_18=true;break;case false:_19=true;break;}return _1a;},this);if(_1a||_18||_19){_1a|=!(_18^_19);_1b=(_1a?"mixed":_18?true:false);}return _1b;},_normalizeState:function(_1e,_1f){if(this.multiState&&_1f=="mixed"){if(this.normalize&&!this.mayHaveChildren(_1e)){return true;}return _1f;}return !!_1f;},_setChecked:function(_20,_21){var _22=false,_23;_23=this._normalizeState(_20,_21);_22=(_23!=_21);var _24=_20[this.checkedAttr];if((_24!==_9||this.checkedAll)&&(_24!=_23||_22)){this._setValue(_20,this.checkedAttr,_23);return true;}return false;},_updateCheckedChild:function(_25,_26){var _27=this;this._setChecked(_25,_26);this.getChildren(_25,function(_28){_28.forEach(function(_29){_27._updateCheckedChild(_29,_26);});},function(err){console.error(err);});},_updateCheckedParent:function(_2a,_2b){if(!this.checkedStrict||!_2a){return;}var _2c=this.getParents(_2a),_2d=this.getChecked(_2a),_2e=this,_2f;_2c.then(function(_30){_30.forEach(function(_31){if((_2d!==_2e.getChecked(_31))||_2b){_2e.getChildren(_31,function(_32){_2f=_2e._getCompositeState(_32);if(_2f!==_9){_2e._setChecked(_31,_2f);}},_2e.onError);}},this);});},_validateChildren:function(_33,_34){var _34,_35,_36;this._validating+=1;_34=_34 instanceof Array?_34:[_34];_34.forEach(function(_37){if(this.mayHaveChildren(_37)){this.getChildren(_37,_3.hitch(this,function(_38){this._validateChildren(_37,_38);}),function(err){console.error(err);});}else{_35=this.getChecked(_37);if(_35){_36=this.normalize?!!_35:_35;if(_35!=_36){this._setValue(_37,this.checkedAttr,_36);}}}},this);_35=this.getChecked(_33);_36=this._getCompositeState(_34);if(_35!==_9&&_36!==_9&&_35!=_36){this._setChecked(_33,_36);}this._validating--;if(!this._validating){this._onDataValidated();}},_validateStore:function(){var _39=this;this._validateDefer=new _4();if(this.checkedStrict){if(!this.store.isValidated){if(!this._validating){this.getRoot(function(_3a){_39.getChildren(_3a,function(_3b){_39._validateChildren(_3a,_3b);},_39.onError);},_39.onError);}}else{this._onDataValidated();}}else{this._validateDefer.resolve();}return this._validateDefer.promise;},_onChildrenChange:function(_3c,_3d){var _3e=_3d[0]||null;var _3f=this;if(this.checkedStrict){if(_3e){if(this._observable){setTimeout(function(){_3f._updateCheckedParent(_3e,true);},0);}else{_3f._updateCheckedParent(_3e,true);}}else{if(this._observable){setTimeout(function(){_3f._setChecked(_3c,_3c[_3f.checkedAttr]);},0);}else{this._setChecked(_3c,_3c[this.checkedAttr]);}}}this.onChildrenChange(_3c,_3d);},_onDataValidated:function(){this.store.isValidated=true;this.onDataValidated();this._validateDefer.resolve();},_onSetItem:function(_40,_41,_42,_43){var _44=this;if(this.checkedStrict){if(_41===this.checkedAttr){if(this._observable){setTimeout(function(){_44._updateCheckedParent(_40,false);},0);}else{_44._updateCheckedParent(_40,false);}}}return this.inherited(arguments);},_onStoreClosed:function(_45,_46){if(!this._resetPending){if(!!_45){delete this.store.isValidated;}this.inherited(arguments);}},onDataValidated:function(){}});return _a;});