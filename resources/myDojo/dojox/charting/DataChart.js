//>>built
define("dojox/charting/DataChart","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/_base/html dojo/_base/connect dojo/_base/array ./Chart2D ./themes/PlotKit/blue dojo/dom".split(" "),function(l,d,m,h,f,e,n,p,q){l.experimental("dojox.charting.DataChart");var r={vertical:!0,min:0,max:10,majorTickStep:5,minorTickStep:1,natural:!1,stroke:"black",majorTick:{stroke:"black",length:8},minorTick:{stroke:"gray",length:2},majorLabels:!0},t={natural:!0,majorLabels:!0,includeZero:!1,majorTickStep:1,
majorTick:{stroke:"black",length:8},fixUpper:"major",stroke:"black",htmlLabels:!0,from:1},k={markers:!0,tension:2,gap:2};return m("dojox.charting.DataChart",n,{scroll:!0,comparative:!1,query:"*",queryOptions:"",fieldName:"value",chartTheme:p,displayRange:0,stretchToFit:!0,minWidth:200,minHeight:100,showing:!0,label:"name",constructor:function(b,a){this.domNode=q.byId(b);d.mixin(this,a);this.xaxis=d.mixin(d.mixin({},t),a.xaxis);"seriesLabels"==this.xaxis.labelFunc&&(this.xaxis.labelFunc=d.hitch(this,
"seriesLabels"));this.yaxis=d.mixin(d.mixin({},r),a.yaxis);"seriesLabels"==this.yaxis.labelFunc&&(this.yaxis.labelFunc=d.hitch(this,"seriesLabels"));this._events=[];this.convertLabels(this.yaxis);this.convertLabels(this.xaxis);this.onSetItems={};this.dataLength=this.onSetInterval=0;this.seriesData={};this.seriesDataBk={};this.firstRun=!0;this.dataOffset=0;this.chartTheme.plotarea.stroke={color:"gray",width:3};this.setTheme(this.chartTheme);this.displayRange&&(this.stretchToFit=!1);this.stretchToFit||
(this.xaxis.to=this.displayRange);var c=a.type&&"Pie"!=a.type&&"dojox.charting.plot2d.Pie"!=a.type.prototype.declaredClass;c&&(this.addAxis("x",this.xaxis),this.addAxis("y",this.yaxis));k.type=a.type||"Markers";this.addPlot("default",d.mixin(k,a.chartPlot));c&&this.addPlot("grid",d.mixin(a.grid||{},{type:"Grid",hMinorLines:!0}));this.showing&&this.render();a.store&&this.setStore(a.store,a.query,a.fieldName,a.queryOptions)},destroy:function(){e.forEach(this._events,f.disconnect);this.inherited(arguments)},
setStore:function(b,a,c,d){this.firstRun=!0;this.store=b||this.store;this.query=a||this.query;this.fieldName=c||this.fieldName;this.label=this.store.getLabelAttributes();this.queryOptions=d||d;e.forEach(this._events,f.disconnect);this._events=[f.connect(this.store,"onSet",this,"onSet"),f.connect(this.store,"onError",this,"onError")];this.fetch()},show:function(){this.showing||(h.style(this.domNode,"display",""),this.showing=!0,this.render())},hide:function(){this.showing&&(h.style(this.domNode,"display",
"none"),this.showing=!1)},onSet:function(b){var a=this.getProperty(b,this.label);if(a in this.runs||this.comparative)clearTimeout(this.onSetInterval),this.onSetItems[a]||(this.onSetItems[a]=b),this.onSetInterval=setTimeout(d.hitch(this,function(){clearTimeout(this.onSetInterval);var a=[],b;for(b in this.onSetItems)a.push(this.onSetItems[b]);this.onData(a);this.onSetItems={}}),200)},onError:function(b){console.error("DataChart Error:",b)},onDataReceived:function(b){},getProperty:function(b,a){if(a==
this.label)return this.store.getLabel(b);if("id"==a)return this.store.getIdentity(b);var c=this.store.getValues(b,a);2>c.length&&(c=this.store.getValue(b,a));return c},onData:function(b){if(b&&b.length){this.items&&this.items.length!=b.length&&(e.forEach(b,function(a){var b=this.getProperty(a,"id");e.forEach(this.items,function(a,c){this.getProperty(a,"id")==b&&(this.items[c]=a)},this)},this),b=this.items);this.stretchToFit&&(this.displayRange=b.length);this.onDataReceived(b);this.items=b;if(this.comparative){var a=
"default";this.seriesData[a]=[];this.seriesDataBk[a]=[];e.forEach(b,function(b){b=this.getProperty(b,this.fieldName);this.seriesData[a].push(b)},this)}else e.forEach(b,function(a,b){var c=this.store.getLabel(a);this.seriesData[c]||(this.seriesData[c]=[],this.seriesDataBk[c]=[]);var g=this.getProperty(a,this.fieldName);if(d.isArray(g))this.seriesData[c]=g;else{if(this.scroll)this.seriesDataBk[c].length>this.seriesData[c].length&&(this.seriesData[c]=this.seriesDataBk[c]),this.seriesData[c].push(Number(g));
else{var f=e.map(Array(b+1),function(){return 0});f.push(Number(g));this.seriesData[c]=f}this.seriesDataBk[c].push(Number(g))}},this);var c;if(this.firstRun)for(a in this.firstRun=!1,this.seriesData)this.addSeries(a,this.seriesData[a]),c=this.seriesData[a];else for(a in this.seriesData)c=this.seriesData[a],this.scroll&&c.length>this.displayRange&&(this.dataOffset=c.length-this.displayRange-1,c=c.slice(c.length-this.displayRange,c.length)),this.updateSeries(a,c);this.dataLength=c.length;this.showing&&
this.render()}},fetch:function(){this.store&&this.store.fetch({query:this.query,queryOptions:this.queryOptions,start:this.start,count:this.count,sort:this.sort,onComplete:d.hitch(this,function(b){setTimeout(d.hitch(this,function(){this.onData(b)}),0)}),onError:d.hitch(this,"onError")})},convertLabels:function(b){if(!b.labels||d.isObject(b.labels[0]))return null;b.labels=e.map(b.labels,function(a,b){return{value:b,text:a}});return null},seriesLabels:function(b){b--;if(1>this.series.length||!this.comparative&&
b>this.series.length)return"-";if(this.comparative)return this.store.getLabel(this.items[b]);for(var a=0;a<this.series.length;a++)if(0<this.series[a].data[b])return this.series[a].name;return"-"},resizeChart:function(b){this.resize(Math.max(b.w,this.minWidth),Math.max(b.h,this.minHeight))}})});
//# sourceMappingURL=DataChart.js.map