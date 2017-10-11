//>>built
define("cbtree/util/QueryEngine",["module","../errors/createError!../errors/CBTErrors.json","./shim/Array"],function(_1,_2){"use strict";var _3=_2(_1.id);function _4(_5,_6,_7){if(_6){if(_6.test){return _5.some(function(_8){return _6.test(_8);});}if(_6 instanceof Array){return _6.every(function(_9){_9=(_7&&_9.toLowerCase)?_9.toLowerCase():_9;return _4(_5,_9,_7);});}if(_7){return _5.some(function(_a){_a=(_7&&_a.toLowerCase)?_a.toLowerCase():_a;return (_a==_6);});}return (_5.indexOf(_6)!=-1);}return false;};function _b(_c,_d){var _e=_c.split(".");var p,i=0;while(_d&&(p=_e[i++])){_d=(p in _d?_d[p]:undefined);}return _d;};function _f(_10){if(_10){for(var key in _10){if(/\./.test(key)){return true;}}}return false;};function _11(_12,_13,_14){if(_14&&_13&&!_13.test){_13=_13.toLowerCase?_13.toLowerCase():_13;_12=_12.toLowerCase?_12.toLowerCase():_12;}if(_13==_12){return true;}if(_12 instanceof Array){return _4(_12,_13,_14);}if(_13&&_13.test){return _13.test(_12);}if(_13 instanceof Array){return _15(_12,_13,_14);}return false;};function _15(_16,_17,_18){return _17.some(function(_19){return _11(_16,_19,_18);});};var _1a=function(_1b,_1c){var _1d=_1c&&!!_1c.ignoreCase;var _1e=function(){};var _1f=false;switch(typeof _1b){case "undefined":case "object":_1f=_f(_1b);_1e=function(_20){var key,_21,_22;for(key in _1b){_22=_1b[key];_21=_1f?_b(key,_20):_20[key];if(!_11(_21,_22,_1d)){if(typeof _22=="function"){if(_22(_21,key,_20)){continue;}}return false;}}return true;};break;case "string":if(!this[_1b]||typeof this[_1b]!="function"){throw new _3("MethodMissing","QueryEngine","No filter function "+_1b+" was found in store");}_1e=this[_1b];break;case "function":_1e=_1b;break;default:throw new _3("InvalidType","QueryEngine","Can not query with a "+typeof _1b);}function _23(_24,_25){var _24=_24||[];var _26=_1c&&_1c.sort;var _27=_25?_24:_24.filter(_1e);var _28=_26;if(_26){if(typeof _28!="function"){_28=function(a,b){var i,_29,_2a,_2b,_2c;for(i=0;_29=_26[i];i++){_2a=_29.property||_29.attribute;_2b=_b(_2a,a);_2c=_b(_2a,b);if(_29.ignoreCase){_2b=(_2b&&_2b.toLowerCase)?_2b.toLowerCase():_2b;_2c=(_2c&&_2c.toLowerCase)?_2c.toLowerCase():_2c;}if(_2b!=_2c){return (!!_29.descending==(_2b==null||_2b>_2c))?-1:1;}}return 0;};}_27.sort(_28);}if(_1c&&(_1c.start||_1c.count)){var _2d=_27.length;_27=_27.slice(_1c.start||0,(_1c.start||0)+(_1c.count||Infinity));_27.total=_2d;}return _27;};_23.matches=_1e;return _23;};return _1a;});