//>>built
define("dgrid/OnDemandList",["./List","./_StoreMixin","dojo/_base/declare","dojo/_base/lang","dojo/dom-construct","dojo/on","dojo/when","./util/misc"],function(_1,_2,_3,_4,_5,on,_6,_7){return _3([_1,_2],{minRowsPerPage:25,maxRowsPerPage:250,maxEmptySpace:Infinity,bufferRows:10,farOffRemoval:2000,queryRowsOverlap:0,pagingMethod:"debounce",pagingDelay:_7.defaultDelay,keepScrollPosition:false,rowHeight:0,postCreate:function(){this.inherited(arguments);var _8=this;on(this.bodyNode,"scroll",_7[this.pagingMethod](function(_9){_8._processScroll(_9);},null,this.pagingDelay));},destroy:function(){this.inherited(arguments);if(this._refreshTimeout){clearTimeout(this._refreshTimeout);}},renderQuery:function(_a,_b){var _c=this,_d=(_b&&_b.container)||this.contentNode,_e={query:_a,count:0},_f,_10=this.preload;var _11={node:_5.create("div",{className:"dgrid-preload",style:{height:"0"}},_d),count:0,query:_a,next:_e};_11.node.rowIndex=0;_e.node=_f=_5.create("div",{className:"dgrid-preload"},_d);_e.previous=_11;_f.rowIndex=this.minRowsPerPage;if(_10){if((_e.next=_10.next)&&_f.offsetTop>=_10.node.offsetTop){_e.previous=_10;}else{_e.next=_10;_e.previous=_10.previous;}_e.previous.next=_e;_e.next.previous=_e;}else{this.preload=_e;}var _12=_5.create("div",{className:"dgrid-loading"},_f,"before"),_13=_5.create("div",{className:"dgrid-below"},_12);_13.innerHTML=this.loadingMessage;_b=_4.mixin({start:0,count:this.minRowsPerPage},"level" in _a?{queryLevel:_a.level}:null);return this._trackError(function(){var _14=_a(_b);return _c.renderQueryResults(_14,_f,_b).then(function(trs){return _14.totalLength.then(function(_15){var _16=trs.length,_17=_f.parentNode,_18=_c.noDataNode;if(_c._rows){_c._rows.min=0;_c._rows.max=_16===_15?Infinity:_16-1;}_5.destroy(_12);if(!("queryLevel" in _b)){_c._total=_15;}if(_15===0&&_17){if(_18){_5.destroy(_18);delete _c.noDataNode;}_c.noDataNode=_18=_5.create("div",{className:"dgrid-no-data",innerHTML:_c.noDataMessage});_17.insertBefore(_18,_c._getFirstRowSibling(_17));}var _19=0;for(var i=0;i<_16;i++){_19+=_c._calcRowHeight(trs[i]);}if(_16&&_19){_c.rowHeight=_19/_16;}_15-=_16;_e.count=_15;_f.rowIndex=_16;if(_15){_f.style.height=Math.min(_15*_c.rowHeight,_c.maxEmptySpace)+"px";}else{_f.style.display="none";}if(_c._previousScrollPosition){_c.scrollTo(_c._previousScrollPosition);delete _c._previousScrollPosition;}return _6(_c._processScroll()).then(function(){return trs;});});}).otherwise(function(err){_5.destroy(_12);throw err;});});},refresh:function(_1a){var _1b=this,_1c=(_1a&&_1a.keepScrollPosition);if(typeof _1c==="undefined"){_1c=this.keepScrollPosition;}if(_1c){this._previousScrollPosition=this.getScrollPosition();}this.inherited(arguments);if(this._renderedCollection){return this.renderQuery(function(_1d){return _1b._renderedCollection.fetchRange({start:_1d.start,end:_1d.start+_1d.count});}).then(function(){_1b._refreshTimeout=setTimeout(function(){on.emit(_1b.domNode,"dgrid-refresh-complete",{bubbles:true,cancelable:false,grid:_1b});_1b._refreshTimeout=null;},0);});}},resize:function(){this.inherited(arguments);this._processScroll();},cleanup:function(){this.inherited(arguments);this.preload=null;},renderQueryResults:function(_1e){var _1f=this.inherited(arguments);var _20=this._renderedCollection;if(_20&&_20.releaseRange){_1f.then(function(_21){if(_21[0]&&!_21[0].parentNode.tagName){_1e.totalLength.then(function(){_20.releaseRange(_21[0].rowIndex,_21[_21.length-1].rowIndex+1);});}});}return _1f;},_getFirstRowSibling:function(_22){return _22.lastChild;},_calcRowHeight:function(_23){var _24=_23.nextSibling;if(_24&&!/\bdgrid-preload\b/.test(_24.className)){return _24.offsetTop-_23.offsetTop;}return _23.offsetHeight;},lastScrollTop:0,_processScroll:function(evt){if(!this.rowHeight){return;}var _25=this,_26=_25.bodyNode,_27=(evt&&evt.scrollTop)||this.getScrollPosition().y,_28=_26.offsetHeight+_27,_29,_2a,_2b=_25.preload,_2c=_25.lastScrollTop,_2d=_25.bufferRows*_25.rowHeight,_2e=_2d-_25.rowHeight,_2f,_30=true;var _31=1;_25.lastScrollTop=_27;function _32(_33,_34,_35,_36){var _37=_25.farOffRemoval,_2a=_33.node;if(_34>2*_37){var row;var _38=_2a[_35];var _39=0;var _3a=0;var _3b=[];var _3c=_38&&_38.rowIndex;var _3d;while((row=_38)){var _3e=_25._calcRowHeight(row);if(_39+_3e+_37>_34||(_38.className.indexOf("dgrid-row")<0&&_38.className.indexOf("dgrid-loading")<0)){break;}_38=row[_35];_39+=_3e;_3a+=row.count||1;_25.removeRow(row,true);_3b.push(row);if("rowIndex" in row){_3d=row.rowIndex;}}if(_25._renderedCollection.releaseRange&&typeof _3c==="number"&&typeof _3d==="number"){if(_36){_25._renderedCollection.releaseRange(_3d,_3c+1);}else{_25._renderedCollection.releaseRange(_3c,_3d+1);}_25._rows[_36?"max":"min"]=_3d;if(_25._rows.max>=_25._total-1){_25._rows.max=Infinity;}}_33.count+=_3a;if(_36){_2a.rowIndex-=_3a;_3f(_33);}else{_2a.style.height=(_2a.offsetHeight+_39)+"px";}var _40=document.createElement("div");for(var i=_3b.length;i--;){_40.appendChild(_3b[i]);}setTimeout(function(){_5.destroy(_40);},1);}};function _3f(_41,_42){_41.node.style.height=Math.min(_41.count*_25.rowHeight,_42?Infinity:_25.maxEmptySpace)+"px";};function _43(_44,_45){do{_44=_45?_44.next:_44.previous;}while(_44&&!_44.node.offsetWidth);return _44;};while(_2b&&!_2b.node.offsetWidth){_2b=_2b.previous;}while(_2b&&_2b!==_29){_29=_25.preload;_25.preload=_2b;_2a=_2b.node;var _46=_2a.offsetTop;var _47;if(_28+_31+_2e<_46){_2b=_43(_2b,(_30=false));}else{if(_27-_31-_2e>(_46+(_47=_2a.offsetHeight))){_2b=_43(_2b,(_30=true));}else{var _48=((_2a.rowIndex?_27-_2d:_28)-_46)/_25.rowHeight;var _49=(_28-_27+2*_2d)/_25.rowHeight;var _4a=Math.max(Math.min((_27-_2c)*_25.rowHeight,_25.maxRowsPerPage/2),_25.maxRowsPerPage/-2);_49+=Math.min(Math.abs(_4a),10);if(_2a.rowIndex===0){_48-=_49;}_48=Math.max(_48,0);if(_48<10&&_48>0&&_49+_48<_25.maxRowsPerPage){_49+=Math.max(0,_48);_48=0;}_49=Math.min(Math.max(_49,_25.minRowsPerPage),_25.maxRowsPerPage,_2b.count);if(_49===0){_2b=_43(_2b,_30);continue;}_49=Math.ceil(_49);_48=Math.min(Math.floor(_48),_2b.count-_49);var _4b={};_2b.count-=_49;var _4c=_2a,_4d,_4e=_25.queryRowsOverlap,_4f=(_2a.rowIndex>0||_2a.offsetTop>_27)&&_2b;if(_4f){var _50=_2b.previous;if(_50){_32(_50,_27-(_50.node.offsetTop+_50.node.offsetHeight),"nextSibling");if(_48>0&&_50.node===_2a.previousSibling){_48=Math.min(_2b.count,_48);_2b.previous.count+=_48;_3f(_2b.previous,true);_2a.rowIndex+=_48;_4e=0;}else{_49+=_48;}_2b.count-=_48;}_4b.start=_2a.rowIndex-_4e;_4b.count=Math.min(_49+_4e,_25.maxRowsPerPage);_2a.rowIndex=_4b.start+_4b.count;}else{if(_2b.next){_32(_2b.next,_2b.next.node.offsetTop-_28,"previousSibling",true);_4c=_2a.nextSibling;if(_4c===_2b.next.node){_2b.next.count+=_2b.count-_48;_2b.next.node.rowIndex=_48+_49;_3f(_2b.next);_2b.count=_48;_4e=0;}else{_4d=true;}}_4b.start=_2b.count;_4b.count=Math.min(_49+_4e,_25.maxRowsPerPage);}if(_4d&&_4c&&_4c.offsetWidth){_4d=_4c.offsetTop;}_3f(_2b);if("level" in _2b.query){_4b.queryLevel=_2b.query.level;}if(!("queryLevel" in _4b)&&(_4b.start>_25._total||_4b.count<0)){continue;}var _51=_5.create("div",{className:"dgrid-loading",style:{height:_49*_25.rowHeight+"px"}},_4c,"before");_5.create("div",{className:"dgrid-"+(_4f?"below":"above"),innerHTML:_25.loadingMessage},_51);_51.count=_49;_25._trackError(function(){(function(_52,_53,_54){var _55=_2b.query(_4b);_2f=_25.renderQueryResults(_55,_52,_4b).then(function(_56){var _57=_25._rows;if(_57&&!("queryLevel" in _4b)&&_56.length){if(_53){if(_57.max<=_57.min){_57.min=_56[0].rowIndex;}_57.max=_56[_56.length-1].rowIndex;}else{if(_57.max<=_57.min){_57.max=_56[_56.length-1].rowIndex;}_57.min=_56[0].rowIndex;}}_4c=_52.nextSibling;_5.destroy(_52);if(_54&&_4c&&_4c.offsetWidth){var pos=_25.getScrollPosition();_25.scrollTo({x:pos.x,y:pos.y+_4c.offsetTop-_54,preserveMomentum:true});}_55.totalLength.then(function(_58){if(!("queryLevel" in _4b)){_25._total=_58;if(_25._rows&&_25._rows.max>=_25._total-1){_25._rows.max=Infinity;}}if(_53){_53.count=_58-_53.node.rowIndex;_3f(_53);}});_25._processScroll();return _56;},function(e){_5.destroy(_52);throw e;});})(_51,_4f,_4d);});_2b=_2b.previous;}}}return _2f;}});});