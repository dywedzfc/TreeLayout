//>>built
define("dojox/mobile/app/_event",["dojo","dijit","dojox"],function(b,u,c){b.provide("dojox.mobile.app._event");b.experimental("dojox.mobile.app._event.js");b.mixin(c.mobile.app,{eventMap:{},connectFlick:function(c,d,e){var f,h,k=!1,l,m,n,p,q,g;b.connect("onmousedown",c,function(a){k=!1;f=a.targetTouches?a.targetTouches[0].clientX:a.clientX;h=a.targetTouches?a.targetTouches[0].clientY:a.clientY;g=(new Date).getTime();n=b.connect(c,"onmousemove",r);p=b.connect(c,"onmouseup",t)});var r=function(a){b.stopEvent(a);
l=a.targetTouches?a.targetTouches[0].clientX:a.clientX;m=a.targetTouches?a.targetTouches[0].clientY:a.clientY;15<Math.abs(Math.abs(l)-Math.abs(f))?(k=!0,q=l>f?"ltr":"rtl"):15<Math.abs(Math.abs(m)-Math.abs(h))&&(k=!0,q=m>h?"ttb":"btt")},t=function(a){b.stopEvent(a);n&&b.disconnect(n);p&&b.disconnect(p);if(k)if(a={target:c,direction:q,duration:(new Date).getTime()-g},d&&e)d[e](a);else e(a)}}});c.mobile.app.isIPhone=b.isSafari&&(-1<navigator.userAgent.indexOf("iPhone")||-1<navigator.userAgent.indexOf("iPod"));
c.mobile.app.isWebOS=-1<navigator.userAgent.indexOf("webOS");c.mobile.app.isAndroid=-1<navigator.userAgent.toLowerCase().indexOf("android");if(c.mobile.app.isIPhone||c.mobile.app.isAndroid)c.mobile.app.eventMap={onmousedown:"ontouchstart",mousedown:"ontouchstart",onmouseup:"ontouchend",mouseup:"ontouchend",onmousemove:"ontouchmove",mousemove:"ontouchmove"};b._oldConnect=b._connect;b._connect=function(g,d,e,f,h){d=c.mobile.app.eventMap[d]||d;if("flick"==d||"onflick"==d)if(b.global.Mojo)d=Mojo.Event.flick;
else return c.mobile.app.connectFlick(g,e,f);return b._oldConnect(g,d,e,f,h)}});
//# sourceMappingURL=_event.js.map