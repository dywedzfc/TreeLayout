//>>built
define("cbtree/model/_base/Parents",["../../util/shim/Array"],function(){function _1(_2,_3){var _3=_3||"parent";var _4;this.multiple=true;this.length=0;this.input=null;function _5(_6){Array.prototype.splice.call(this,0,this.length);if(_6 instanceof Array){_6.forEach(function(id,_7){this[_7]=id;this.length++;},this);}else{_5.call(this,[_6]);this.multiple=false;this.length=1;}};this.add=function(id,_8){if(id!=_4){if(!this.contains(id)){if(_8||this.multiple){this[this.length++]=id;this.multiple=(this.length>1);}else{this.set(id);}return true;}return false;}};this.contains=function(id){return Array.prototype.some.call(this,function(_9){return _9===id;});};this.forEach=function(_a,_b){Array.prototype.forEach.call(this,_a,_b);};this.remove=function(id){return Array.prototype.some.call(this,function(_c,_d){if(_c===id){Array.prototype.splice.call(this,_d,1);return true;}},this);};this.set=function(id){Array.prototype.splice.call(this,0,this.length);this[0]=id;this.length=1;return true;};this.toValue=function(){return (this.multiple?Array.prototype.slice.call(this):this[0]);};if(_2!=_4){if(_2 instanceof Array){this.input=_2;}else{if(typeof _2==="object"){this.input=_2[_3];}else{if(typeof _2==="string"){this.input=_2.split(/\s*,\s*/);if(this.input.length==1){this.input=_2;}}else{this.input=_2;}}}if(this.input!=_4){_5.call(this,this.input);}else{this.multiple=false;}}};return _1;});