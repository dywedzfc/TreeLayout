//>>built
define("cbtree/store/extensions/CORS",["module","dojo/_base/lang","dojo/Deferred","dojo/request","dojo/request/handlers","../Memory","../../errors/createError!../../errors/CBTErrors.json"],function(_1,_2,_3,_4,_5,_6,_7){"use strict";var _8=_7(_1.id);var _9={timeout:null,_xhrGet:function(_a,_b,_c){var _c=_2.mixin({timeout:this.timeout},_c);var _d=null;if(/^https?\:\/\//i.test(_a)){if(typeof XDomainRequest!=="undefined"){var _e=new XDomainRequest();var _f=new _3(_e.abort);if(_e){_e.onprogress=function(){};_e.onload=function(){var _10={text:_e.responseText,options:{handleAs:_b}};var _11=_5(_10).data;_f.resolve(_11);};_e.onerror=function(){_f.reject(new _8("RequestError","_xhrGet","Failed to load: "+_a));};_e.ontimeout=function(){_f.reject(new _8("RequestError","_xhrGet","Timeout loading: "+_a));};if(_c.timeout&&_c.timeout>0){_e.timeout=_c.timeout;}_e.open("get",_a);_e.send();return _f.promise;}}else{_d={"X-Requested-With":null};}}return _4(this.url,{method:"GET",handleAs:_b,headers:_d,timeout:_c.timeout,preventCache:true});}};_6.extend(_9);return true;});