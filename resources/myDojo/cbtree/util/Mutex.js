//>>built
define("cbtree/util/Mutex",["dojo/Deferred"],function(_1){"use strict";function _2(_3){var _4=[];var _5=false;var _3=!!_3;var _6=this;function _7(){if(_4.length){var _8=_4[0];try{_8.cb();}catch(err){_6.onError(err);throw err;}return true;}};this.aquire=function(_9,_a){return this.then(function(){_a?_9.call(_a):_9();});};this.then=function(_b){var _c={cb:_b,def:new _1()};_4.push(_c);if(!_5){_5=true;_7();}return _c.def.promise;};this.release=function(_d){if(_5){var _e=_4.shift();_e.def.resolve(_d);if(!_7()){_5=false;}}};this.onError=function(_f){if(_5){var _10=_4.shift();_10.def.reject(_f);if(!_7()){_5=false;}}};};return _2;});