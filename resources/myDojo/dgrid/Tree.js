//>>built
define("dgrid/Tree",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/aspect","dojo/dom-construct","dojo/dom-class","dojo/on","dojo/query","dojo/when","./util/has-css3","./Grid","dojo/has!touch?./util/touch"],function(_1,_2,_3,_4,_5,_6,on,_7,_8,_9,_a,_b){return _1(null,{collapseOnRefresh:false,enableTreeTransitions:true,treeIndentWidth:9,constructor:function(){this._treeColumnListeners=[];},shouldExpand:function(_c,_d,_e){return _e;},expand:function(_f,_10,_11){if(!this._treeColumn){return;}var _12=this,row=_f.element?_f:this.row(_f),_13=!!this._expanded[row.id],_14=_9("transitionend"),_15;_f=row.element;_f=_f.className.indexOf("dgrid-expando-icon")>-1?_f:_7(".dgrid-expando-icon",_f)[0];_11=_11||!this.enableTreeTransitions;if(_f&&_f.mayHaveChildren&&(_11||_10!==_13)){var _16=_10===undefined?!this._expanded[row.id]:_10;_6.replace(_f,"ui-icon-triangle-1-"+(_16?"se":"e"),"ui-icon-triangle-1-"+(_16?"e":"se"));_6.toggle(row.element,"dgrid-row-expanded",_16);var _17=row.element,_18=_17.connected,_19,_1a,_1b={};if(!_18){_18=_1b.container=_17.connected=_5.create("div",{className:"dgrid-tree-container"},_17,"after");var _1c=function(_1d){var _1e=_12._renderedCollection.getChildren(row.data),_1f;if(_12.sort){_1e=_1e.sort(_12.sort);}if(_1e.track&&_12.shouldTrackCollection){_18._rows=_1d.rows=[];_1e=_1e.track();_18._handles=[_1e.tracking,_12._observeCollection(_1e,_18,_1d)];}if("start" in _1d){var _20={start:_1d.start,end:_1d.start+_1d.count};_1f=_1e.fetchRange(_20);}else{_1f=_1e.fetch();}return _1f;};if("level" in _f){_1c.level=_f.level;}if(this.renderQuery){_15=this.renderQuery(_1c,_1b);}else{var _21=_5.create("div",null,_18);_15=this._trackError(function(){return _12.renderQueryResults(_1c(_1b),_21,_2.mixin({rows:_1b.rows},"level" in _1c?{queryLevel:_1c.level}:null)).then(function(_22){_5.destroy(_21);return _22;});});}if(_14&&!_11){on.once(_18,_14,this._onTreeTransitionEnd);}else{this._onTreeTransitionEnd.call(_18);}}_18.hidden=!_16;_19=_18.style;if(!_14||_11){_19.display=_16?"block":"none";_19.height="";}else{if(_16){_19.display="block";_1a=_18.scrollHeight;_19.height="0px";}else{_6.add(_18,"dgrid-tree-resetting");_19.height=_18.scrollHeight+"px";}setTimeout(function(){_6.remove(_18,"dgrid-tree-resetting");_19.height=_16?(_1a?_1a+"px":"auto"):"0px";},0);}if(_16){this._expanded[row.id]=true;}else{delete this._expanded[row.id];}}return _8(_15);},_configColumns:function(){var _23=this.inherited(arguments);this._expanded={};for(var i=0,l=_23.length;i<l;i++){if(_23[i].renderExpando){this._configureTreeColumn(_23[i]);break;}}return _23;},insertRow:function(){var _24=this.inherited(arguments);var row=this.row(_24),_25=this.shouldExpand(row,this._currentLevel,this._expanded[row.id]);if(_25){this.expand(_24,true,true);}return _24;},removeRow:function(_26,_27){var _28=_26.connected,_29={};if(_28){if(_28._handles){_3.forEach(_28._handles,function(_2a){_2a.remove();});delete _28._handles;}if(_28._rows){_29.rows=_28._rows;}_7(">.dgrid-row",_28).forEach(function(_2b){this.removeRow(_2b,true,_29);},this);if(_28._rows){_28._rows.length=0;delete _28._rows;}if(!_27){_5.destroy(_28);}}this.inherited(arguments);},cleanup:function(){this.inherited(arguments);if(this.collapseOnRefresh){this._expanded={};}},_destroyColumns:function(){var _2c=this._treeColumnListeners;for(var i=_2c.length;i--;){_2c[i].remove();}this._treeColumnListeners=[];this._treeColumn=null;},_calcRowHeight:function(_2d){var _2e=_2d.connected;return this.inherited(arguments)+(_2e?_2e.offsetHeight:0);},_configureTreeColumn:function(_2f){var _30=_2f.renderCell||this._defaultRenderCell;var _31;this._treeColumn=_2f;var _32=this,_33=".dgrid-content .dgrid-column-"+_2f.id;if(!_32.collection){throw new Error("dgrid Tree mixin requires a collection to operate.");}if(typeof _2f.renderExpando!=="function"){_2f.renderExpando=this._defaultRenderExpando;}this._treeColumnListeners.push(this.on(_2f.expandOn||".dgrid-expando-icon:click,"+_33+":dblclick,"+_33+":keydown",function(_34){var row=_32.row(_34);if((!_32.collection.mayHaveChildren||_32.collection.mayHaveChildren(row.data))&&(_34.type!=="keydown"||_34.keyCode===32)&&!(_34.type==="dblclick"&&_31&&_31.count>1&&row.id===_31.id&&_34.target.className.indexOf("dgrid-expando-icon")>-1)){_32.expand(row);}if(_34.target.className.indexOf("dgrid-expando-icon")>-1){if(_31&&_31.id===_32.row(_34).id){_31.count++;}else{_31={id:_32.row(_34).id,count:1};}}}));if(_9("touch")){this._treeColumnListeners.push(this.on(_b.selector(_33,_b.dbltap),function(){_32.expand(this);}));}_2f.renderCell=function(_35,_36,td,_37){var _38=_2f.grid,_39=Number(_37&&_37.queryLevel)+1,_3a=!_38.collection.mayHaveChildren||_38.collection.mayHaveChildren(_35),_3b,_3c;_39=_38._currentLevel=isNaN(_39)?0:_39;_3b=_2f.renderExpando(_39,_3a,_38._expanded[_38.collection.getIdentity(_35)],_35);_3b.level=_39;_3b.mayHaveChildren=_3a;_3c=_30.call(_2f,_35,_36,td,_37);if(_3c&&_3c.nodeType){td.appendChild(_3b);td.appendChild(_3c);}else{td.insertBefore(_3b,td.firstChild);}};},_defaultRenderExpando:function(_3d,_3e,_3f){var dir=this.grid.isRTL?"right":"left",cls="dgrid-expando-icon";if(_3e){cls+=" ui-icon ui-icon-triangle-1-"+(_3f?"se":"e");}return _5.create("div",{className:cls,innerHTML:"&nbsp;",style:"margin-"+dir+": "+(_3d*this.grid.treeIndentWidth)+"px; float: "+dir+";"});},_onTreeTransitionEnd:function(_40){var _41=this,_42=this.style.height;if(_42){this.style.display=_42==="0px"?"none":"block";}if(_40){_6.add(this,"dgrid-tree-resetting");setTimeout(function(){_6.remove(_41,"dgrid-tree-resetting");},0);}this.style.height="";}});});