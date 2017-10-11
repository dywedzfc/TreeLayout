//>>built
define("cbtree/store/ObjectStore",["module","dojo/_base/declare","dojo/_base/lang","dojo/store/util/QueryResults","./Hierarchy","../Evented","../errors/createError!../errors/CBTErrors.json"],function(_1,_2,_3,_4,_5,_6,_7){var _8=_7(_1.id);var _9;var _a=_2([_5,_6],{eventable:true,add:function(_b,_c){var id=this.inherited(arguments);if(id!=_9){this.emit("new",{type:"new",detail:{item:_b}});}return id;},put:function(_d,_e){var id=this._getObjectId(_d,_e);var at=this._indexId[id];var _f,_10=false;if(at>=0){if(_e&&_e.overwrite===false){throw new _8("ItemExist","put");}_f=this._data[at];_10=true;}id=this._writeObject(id,_d,at,_e);if(_10){this.emit("change",{type:"change",detail:{item:_d,oldItem:_f}});}else{this.emit("new",{type:"new",detail:{item:_d}});}return id;},remove:function(id){var _11=this.get(id);if(_11){var _12=this.inherited(arguments);if(_12){this.emit("delete",{type:"delete",detail:{item:_11}});}return _12;}return false;}});return _a;});