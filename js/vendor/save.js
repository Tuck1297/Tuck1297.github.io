/**
*what-input-Aglobalutilityfortrackingthecurrentinputmethod(mouse,keyboardortouch).
*@versionv5.2.10
*@linkhttps://github.com/ten1seven/what-input
*@licenseMIT
*/

(functionwebpackUniversalModuleDefinition(root,factory){	if(typeofexports==='object'&&typeofmodule==='object')
		module.exports=factory();	elseif(typeofdefine==='function'&&define.amd)
		define("whatInput",[],factory);	elseif(typeofexports==='object')
		exports["whatInput"]=factory();	elseb\ root["whatInput"]=factory();
})(this,function(){
return/******/(function(modules){//webpackBootstrap
/******/	//Themodulecache
/******/	varinstalledModules={};

/******/	//Therequirefunction
/******/	function__webpack_require__(moduleId){

/******/		//Checkifmoduleisincache
/******/		if(installedModules[moduleId])
/******/			returninstalledModules[moduleId].exports;

/******/		//Createanewmodule(andputitintothecache)
/******/		varmodule=installedModules[moduleId]={
/******/			exports:{},
/******/			id:moduleId,
/******/			loaded:false
/******/		};

/******/		//Executethemodulefunction
/******/		modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);

/******/		//Flagthemoduleasloaded
/******/		module.loaded=true;

/******/		//Returntheexportsofthemodule
/******/		returnmodule.exports;
/******/	}


/******/	//exposethemodulesobject(__webpack_modules__)
/******/	__webpack_require__.m=modules;

/******/	//exposethemodulecache
/******/	__webpack_require__.c=installedModules;

/******/	//__webpack_public_path__
/******/	__webpack_require__.p="";

/******/	//Loadentrymoduleandreturnexports
/******/	return__webpack_require__(0);
/******/})
/************************************************************************/
/******/([
/*0*/
/***/(function(module,exports){

	'usestrict';

	module.exports=function(){
	/*
	*bailoutifthereisnodocumentorwindow
	*(i.e.inanode/non-DOMenvironment)
	*
	*ReturnastubbedAPIinstead
	*/
	if(typeofdocument==='undefined'||typeofwindow==='undefined'){
	return{
	//alwaysreturn"initial"becausenointeractionwilleverbedetected
	ask:functionask(){
	return'initial';
	},

	//alwaysreturnnull
	element:functionelement(){
	returnnull;
	},

	//no-op
	ignoreKeys:functionignoreKeys(){},

	//no-op
	specificKeys:functionspecificKeys(){},

	//no-op
	registerOnChange:functionregisterOnChange(){},

	//no-op
	unRegisterOnChange:functionunRegisterOnChange(){}
	};
	}

	/*
	*variables
	*/

	//cachedocument.documentElement
	vardocElem=document.documentElement;

	//currentlyfocuseddomelement
	varcurrentElement=null;

	//lastusedinputtype
	varcurrentInput='initial';

	//lastusedinputintent
	varcurrentIntent=currentInput;

	//UNIXtimestampofcurrentevent
	varcurrentTimestamp=Date.now();

	//checkfora`data-whatpersist`attributeoneitherthe`html`or`body`elements,defaultsto`true`
	varshouldPersist='false';

	//forminputtypes
	varformInputs=['button','input','select','textarea'];

	//emptyarrayforholdingcallbackfunctions
	varfunctionList=[];

	//listofmodifierkeyscommonlyusedwiththemouseand
	//canbesafelyignoredtopreventfalsekeyboarddetection
	varignoreMap=[16,//shift
	17,//control
	18,//alt
	91,//Windowskey/leftApplecmd
	93//Windowsmenu/rightApplecmd
	];

	varspecificMap=[];

	//mappingofeventstoinputtypes
	varinputMap={
	keydown:'keyboard',
	keyup:'keyboard',
	mousedown:'mouse',
	mousemove:'mouse',
	MSPointerDown:'pointer',
	MSPointerMove:'pointer',
	pointerdown:'pointer',
	pointermove:'pointer',
	touchstart:'touch',
	touchend:'touch'

	//boolean:trueifthepageisbeingscrolled
	};varisScrolling=false;

	//storecurrentmouseposition
	varmousePos={
	x:null,
	y:null

	//mapofIE10pointerevents
	};varpointerMap={
	2:'touch',
	3:'touch',//treatpenliketouch
	4:'mouse'

	//checksupportforpassiveeventlisteners
	};varsupportsPassive=false;

	try{
	varopts=Object.defineProperty({},'passive',{
	get:functionget(){
	supportsPassive=true;
	}
	});

	window.addEventListener('test',null,opts);
	}catch(e){}
	//failsilently


	/*
	*setup
	*/

	varsetUp=functionsetUp(){
	//addcorrectmousewheeleventmappingto`inputMap`
	inputMap[detectWheel()]='mouse';

	addListeners();
	};

	/*
	*events
	*/

	varaddListeners=functionaddListeners(){
	//`pointermove`,`MSPointerMove`,`mousemove`andmousewheeleventbinding
	//canonlydemonstratepotential,butnotactual,interaction
	//andaretreatedseparately
	varoptions=supportsPassive?{passive:true}:false;

	document.addEventListener('DOMContentLoaded',setPersist);

	//pointerevents(mouse,pen,touch)
	if(window.PointerEvent){
	window.addEventListener('pointerdown',setInput);
	window.addEventListener('pointermove',setIntent);
	}elseif(window.MSPointerEvent){
	window.addEventListener('MSPointerDown',setInput);
	window.addEventListener('MSPointerMove',setIntent);
	}else{
	//mouseevents
	window.addEventListener('mousedown',setInput);
	window.addEventListener('mousemove',setIntent);

	//touchevents
	if('ontouchstart'inwindow){
	window.addEventListener('touchstart',setInput,options);
	window.addEventListener('touchend',setInput);
	}
	}

	//mousewheel
	window.addEventListener(detectWheel(),setIntent,options);

	//keyboardevents
	window.addEventListener('keydown',setInput);
	window.addEventListener('keyup',setInput);

	//focusevents
	window.addEventListener('focusin',setElement);
	window.addEventListener('focusout',clearElement);
	};

	//checksifinputpersistenceshouldhappenand
	//getsavedstatefromsessionstorageiftrue(defaultsto`false`)
	varsetPersist=functionsetPersist(){
	shouldPersist=!(docElem.getAttribute('data-whatpersist')||document.body.getAttribute('data-whatpersist')==='false');

	if(shouldPersist){
	//checkforsessionvariablesanduseifavailable
	try{
	if(window.sessionStorage.getItem('what-input')){
	currentInput=window.sessionStorage.getItem('what-input');
	}

	if(window.sessionStorage.getItem('what-intent')){
	currentIntent=window.sessionStorage.getItem('what-intent');
	}
	}catch(e){
	//failsilently
	}
	}

	//alwaysrunthesesoatleast`initial`stateisset
	doUpdate('input');
	doUpdate('intent');
	};

	//checksconditionsbeforeupdatingnewinput
	varsetInput=functionsetInput(event){
	vareventKey=event.which;
	varvalue=inputMap[event.type];

	if(value==='pointer'){
	value=pointerType(event);
	}

	varignoreMatch=!specificMap.length&&ignoreMap.indexOf(eventKey)===-1;

	varspecificMatch=specificMap.length&&specificMap.indexOf(eventKey)!==-1;

	varshouldUpdate=value==='keyboard'&&eventKey&&(ignoreMatch||specificMatch)||value==='mouse'||value==='touch';

	//preventtouchdetectionfrombeingoverriddenbyeventexecutionorder
	if(validateTouch(value)){
	shouldUpdate=false;
	}

	if(shouldUpdate&&currentInput!==value){
	currentInput=value;

	persistInput('input',currentInput);
	doUpdate('input');
	}

	if(shouldUpdate&&currentIntent!==value){
	//preserveintentforkeyboardinteractionwithformfields
	varactiveElem=document.activeElement;
	varnotFormInput=activeElem&&activeElem.nodeName&&(formInputs.indexOf(activeElem.nodeName.toLowerCase())===-1||activeElem.nodeName.toLowerCase()==='button'&&!checkClosest(activeElem,'form'));

	if(notFormInput){
	currentIntent=value;

	persistInput('intent',currentIntent);
	doUpdate('intent');
	}
	}
	};

	//updatesthedocand`inputTypes`arraywithnewinput
	vardoUpdate=functiondoUpdate(which){
	docElem.setAttribute('data-what'+which,which==='input'?currentInput:currentIntent);

	fireFunctions(which);
	};

	//updatesinputintentfor`mousemove`and`pointermove`
	varsetIntent=functionsetIntent(event){
	varvalue=inputMap[event.type];

	if(value==='pointer'){
	value=pointerType(event);
	}

	//testtoseeif`mousemove`happenedrelativetothescreentodetectscrollingversusmousemove
	detectScrolling(event);

	//onlyexecuteifscrollingisn'thappening
	if((!isScrolling&&!validateTouch(value)||isScrolling&&event.type==='wheel'||event.type==='mousewheel'||event.type==='DOMMouseScroll')&&currentIntent!==value){
	currentIntent=value;

	persistInput('intent',currentIntent);
	doUpdate('intent');
	}
	};

	varsetElement=functionsetElement(event){
	if(!event.target.nodeName){
	//IfnodeNameisundefined,cleartheelement
	//Thiscanhappenifclickinsidean<svg>element.
	clearElement();
	return;
	}

	currentElement=event.target.nodeName.toLowerCase();
	docElem.setAttribute('data-whatelement',currentElement);

	if(event.target.classList&&event.target.classList.length){
	docElem.setAttribute('data-whatclasses',event.target.classList.toString().replace('',','));
	}
	};

	varclearElement=functionclearElement(){
	currentElement=null;

	docElem.removeAttribute('data-whatelement');
	docElem.removeAttribute('data-whatclasses');
	};

	varpersistInput=functionpersistInput(which,value){
	if(shouldPersist){
	try{
	window.sessionStorage.setItem('what-'+which,value);
	}catch(e){
	//failsilently
	}
	}
	};

	/*
	*utilities
	*/

	varpointerType=functionpointerType(event){
	if(typeofevent.pointerType==='number'){
	returnpointerMap[event.pointerType];
	}else{
	//treatpenliketouch
	returnevent.pointerType==='pen'?'touch':event.pointerType;
	}
	};

	//preventtouchdetectionfrombeingoverriddenbyeventexecutionorder
	varvalidateTouch=functionvalidateTouch(value){
	vartimestamp=Date.now();

	vartouchIsValid=value==='mouse'&&currentInput==='touch'&&timestamp-currentTimestamp<200;

	currentTimestamp=timestamp;

	returntouchIsValid;
	};

	//detectversionofmousewheeleventtouse
	//viahttps://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
	vardetectWheel=functiondetectWheel(){
	varwheelType=null;

	//Modernbrowserssupport"wheel"
	if('onwheel'indocument.createElement('div')){
	wheelType='wheel';
	}else{
	//WebkitandIEsupportatleast"mousewheel"
	//orassumethatremainingbrowsersareolderFirefox
	wheelType=document.onmousewheel!==undefined?'mousewheel':'DOMMouseScroll';
	}

	returnwheelType;
	};

	//runscallbackfunctions
	varfireFunctions=functionfireFunctions(type){
	for(vari=0,len=functionList.length;i<len;i++){
	if(functionList[i].type===type){
	functionList[i].fn.call(undefined,type==='input'?currentInput:currentIntent);
	}
	}
	};

	//findsmatchingelementinanobject
	varobjPos=functionobjPos(match){
	for(vari=0,len=functionList.length;i<len;i++){
	if(functionList[i].fn===match){
	returni;
	}
	}
	};

	vardetectScrolling=functiondetectScrolling(event){
	if(mousePos.x!==event.screenX||mousePos.y!==event.screenY){
	isScrolling=false;

	mousePos.x=event.screenX;
	mousePos.y=event.screenY;
	}else{
	isScrolling=true;
	}
	};

	//manualversionof`closest()`
	varcheckClosest=functioncheckClosest(elem,tag){
	varElementPrototype=window.Element.prototype;

	if(!ElementPrototype.matches){
	ElementPrototype.matches=ElementPrototype.msMatchesSelector||ElementPrototype.webkitMatchesSelector;
	}

	if(!ElementPrototype.closest){
	do{
	if(elem.matches(tag)){
	returnelem;
	}

	elem=elem.parentElement||elem.parentNode;
	}while(elem!==null&&elem.nodeType===1);

	returnnull;
	}else{
	returnelem.closest(tag);
	}
	};

	/*
	*init
	*/

	//don'tstartscriptunlessbrowsercutsthemustard
	//(alsopassesifpolyfillsareused)
	if('addEventListener'inwindow&&Array.prototype.indexOf){
	setUp();
	}

	/*
	*api
	*/

	return{
	//returnsstring:thecurrentinputtype
	//opt:'intent'|'input'
	//'input'(default):returnsthesamevalueasthe`data-whatinput`attribute
	//'intent':includes`data-whatintent`valueifit'sdifferentthan`data-whatinput`
	ask:functionask(opt){
	returnopt==='intent'?currentIntent:currentInput;
	},

	//returnsstring:thecurrentlyfocusedelementornull
	element:functionelement(){
	returncurrentElement;
	},

	//overwritesignoredkeyswithprovidedarray
	ignoreKeys:functionignoreKeys(arr){
	ignoreMap=arr;
	},

	//overwritesspecificcharkeystoupdateon
	specificKeys:functionspecificKeys(arr){
	specificMap=arr;
	},

	//attachfunctionstoinputandintent"events"
	//funct:functiontofireonchange
	//eventType:'input'|'intent'
	registerOnChange:functionregisterOnChange(fn,eventType){
	functionList.push({
	fn:fn,
	type:eventType||'input'
	});
	},

	unRegisterOnChange:functionunRegisterOnChange(fn){
	varposition=objPos(fn);

	if(position||position===0){
	functionList.splice(position,1);
	}
	},

	clearStorage:functionclearStorage(){
	window.sessionStorage.clear();
	}
	};
	}();

/***/})
/******/])
});
;