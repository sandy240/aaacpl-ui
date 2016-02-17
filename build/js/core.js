//Make sure jQuery has been loaded before main.js
if (typeof jQuery === "undefined") {
  throw new Error("jQuery not loaded");
}

//AAACPL auction app
$.aaacplApp = {
	
	//API Root path
	apiSrvPath : "http://api.aaacpl.com/rest/",
	
	userAuthKey : "uAuthIDAAACPL",
	
	// A hash to store our routes:
	routes : {},
	
	dataStorage : {
		//user Info
		userInfo : {
			"typeId": 0,
			"email": "",
			"vatNumber": "",
			"panNumber": "",
			"material": "",
			"city": "",
			"pin": 0,
			"phone": 0,
			"mobile": 0,
			"companyName": "",
			"userTypeLabel": "",
			"name": "",
			"id": 0,
			"state": "",
			"address": "",
			"country": ""
		}
	},

	// a map to store all the template and their relative path
	template : {
		"home": '',
		"login": '#/login',
		"forgot": '#/forgot',
		"register": '#/register',
		"profile": '#/profile',
		"history": '#/history',
		"auction": '#/auction',
		"manage-dept": '#/manage/dept',
		"manage-auction": '#/manage/auction',		
	},

	//Viewport element where content will be displayed
	wrapperElem : null,
	//Body CSS classes for different page layouts
	pageLayoutTypes : ['login-page','register-page','sidebar-mini'],
	//Add routes method
	route : function (path, templateId, presenter, controller) {
		var _this = this;
		_this.routes[path] = {
			templateId: templateId,
			presenter: presenter,
			controller : controller
		}
	},
	//Router handler for route URL changes
	router : function (path, templateId, presenter,controller) {
		var _this = $.aaacplApp;
		// Lazy load view element:
		_this.wrapperElem = _this.wrapperElem || $('#main-viewport');
		// Current route url (getting rid of '#' in hash as well):
		var url = location.hash.slice(1) || '/';
		// Get route by url:
		url = url.split("?")[0];
		
		var routeObj = _this.routes[url];
		
		// Do we have both a view and a route?
		if (_this.wrapperElem) {
			
			//PRE-REQUIREMENT - USER INFO
			// ajax call on page load which will return the user Info on passing sessionId and userId
			if(_this.dataStorage.userInfo.typeId == 0) {
				_this.ajaxCall("GET", 'user/userInfo/'+_this.getLoggedInUserId(), function success(response){
					_this.dataStorage.userInfo = response;
					_this.renderPage(routeObj,_this.wrapperElem);
				}, function error(msg){
					
				});
			} else {
			  _this.renderPage(routeObj,_this.wrapperElem);
			}
		}
	},
	renderPage : function(routeobj, container){
		var _this = this;
		if(routeobj.presenter){
			// Render route template :
			container.html(routeobj.presenter());	
		}
		if(routeobj.controller){
			$(document).ready(function(){
				routeobj.controller();
				_this.commonLayoutReady();
			});
		}
		
		$(document).ready(function(){
			//TEMPORARY PATCH WORK TO RELOAD BOOTSTRAP AND ADMINLTE MODULES
			//$('script[src$="bootstrap.min.js"]').remove();
			$('script[src$="app.min.js"]').remove();
			
			//var scrpt = document.createElement('script');
			//scrpt.src = "bootstrap/js/bootstrap.min.js";
			//scrpt.async = false;
			//document.body.appendChild(scrpt);
			
			var scrpt = document.createElement('script');
			scrpt.src = "dist/js/app.min.js";
			scrpt.async = false;
			document.body.appendChild(scrpt);
		});
		
	},
	init : function(){
		var _this = this;
		
		var pageURL = window.location.href;
		
		//Add all possible routes
		_this.addRoutes();
		
		_this.wrapperElem = $('#main-viewport');
		

        // Setting a cookie for which the dashboard will be displayed instead of login page
        //document.cookie="uAuthIDAAACPL=neville; expires=Thu, 31 Dec 2016 12:00:00 UTC; path=/"; //note : uncomment line for direct login
		
		if(pageURL.indexOf(_this.template['register'])<0){
			var sId = _this.readCookie(_this.userAuthKey);
			//Redirection to login if authentication fails i.e session does not exists
			if(sId.length == 0){
				_this.redirectTo("login");
			} else if(pageURL.indexOf(_this.template['login'])>=0){
				_this.redirectTo("home");
			}
		}
		
		// Listen on hash change:
		window.addEventListener('hashchange', _this.router);
		// Listen on page load:
		window.addEventListener('load', _this.router);
	},
	getLoggedInUserId : function() {
		var _this = this;
		var sId = _this.readCookie(_this.userAuthKey);
		//Redirection to login if authentication fails i.e session does not exists
		if(sId.length > 0){
			return sId.split('::')[1];
		}
		return 0;
	},
	addRoutes : function(){
		var _this = this;
		//ROUTER URLs binding
		
		//HOME - DASHBOARD
		_this.route('/', 'home', function () {
			//TODO - Dashbaord content will be passed to pageContent
			var dashboard = "";
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("DASHBOARD", dashboard , "Welcome"));
		});
		
		//MANAGE - DEPARTMENTS
		_this.route('/manage/dept', 'manage_dept', function () {	
			var manageDeptContents = _this.manageDept.getLayout();
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("MANAGE", manageDeptContents , "Departments"));
		}, function(){
			_this.manageDept.executeScript();
		});
		
		//MANAGE - AUCTIONS
		_this.route('/manage/auctions', 'manage_auctions', function () {	
			var manageAuctionContents = _this.manageAuction.getLayout();
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("MANAGE", manageAuctionContents , "Auctions"));
		}, function(){
			_this.manageAuction.executeScript();
		});
		
		//PROFILE PAGE
	   _this.route('/profile', 'profile', function () {
			var userProfileContents = _this.profilePage.getLayout();
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("PROFILE", userProfileContents , ""));
		},function(){
		    _this.profilePage.executeScript(_this.dataStorage.userInfo);
		});
		
		
		//Pages which has layout not fitting in common layouts

		//LOGIN PAGE
		_this.route('/login', 'login', function () {						
			_this.changeBodyLayoutType('login-page');
			_this.wrapperElem[0].className = 'login-box';
			return _this.loginPage.getLayout();
		}, function(){
			_this.loginPage.executeScript();
		});
		
		//FORGOT PAGE
		_this.route('/forgot', 'forgot', function () {
			_this.changeBodyLayoutType('login-page');
			_this.wrapperElem[0].className = 'login-box';
			return _this.forgotPage.getLayout();
		}, function(){
			_this.forgotPage.executeScript();
		});
		
		//REGISTER PAGE
		_this.route('/register', 'register', function () {			
			_this.changeBodyLayoutType('register-page');
			_this.wrapperElem[0].className = 'register-box';
			return _this.registerPage.getLayout();
		}, function(){
			_this.registerPage.executeScript();
		});
		
	},
	changeBodyLayoutType : function(pageClass){
		var _this = this;
		for(var i = 0; i< _this.pageLayoutTypes.length ;i++){
			$('body').removeClass(_this.pageLayoutTypes[i]);
		}
		$('body').addClass(pageClass);
	},
	wrapInCommonLayout : function (actualContents){
		var _this = this;
		var userInfo = _this.dataStorage.userInfo;
		var pageCommonHeader = _this.pageHeader.getLayout(userInfo);
		var pageCommonSidebar = _this.pageSidebar.getLayout(userInfo);
		var pageCommonFooter = _this.pageFooter.getLayout();
		
		_this.changeBodyLayoutType('sidebar-mini');
		_this.wrapperElem[0].className = 'wrapper';
		
		return pageCommonHeader + pageCommonSidebar + actualContents + pageCommonFooter;
	},
	commonLayoutReady : function(){
		var _this = this;
		if(_this.pageHeader.executeScript){
			_this.pageHeader.executeScript();
		}
		if(_this.pageSidebar.executeScript){
			_this.pageSidebar.executeScript();
		}
		if(_this.pageFooter.executeScript){
			_this.pageFooter.executeScript();
		}
	},

	redirectTo : function(sectionTo) {
		var section = sectionTo , _this = this;
		window.location.href = _this.template[section];
	},
	readCookie : function(cookieName){
		var cookieValue, cookieList, name = cookieName + "=";
		cookieList = document.cookie.split(';');
		for(var i=0;i < cookieList.length;i++) {
			cookieValue = cookieList[i];
			while (cookieValue.charAt(0)==' ') {
				cookieValue = cookieValue.substring(1,cookieValue.length);
			}
			if (cookieValue.indexOf(name) == 0) {
				return cookieValue.substring(name.length,cookieValue.length);
			}
		}
		return '';
	},
	writeCookie : function (name,value,expire) {
		var expires = "";
		if (expire && !isNaN(expire)) {
			var today  = new Date();
			today.setHours(today.getHours()+ expire);
			expires =  today.toUTCString();
		}
		document.cookie = name +"="+value+";expires=+"+expires+";path=/";
	},
	deleteCookie : function(name) {
		document.cookie = name +'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	},
	queryParams : function(key){
		var url = window.location.href;
		var parts = url.split("?");
		var params = [];
		if(parts.length > 1 && parts[1]!=""){
			params = parts[1].split("&");
			for(var i=0;i<params.length;i++){
				var tparam = params[i].split("=");
				if(tparam.length>0 && tparam[0] == key){
					return tparam.length>1 ? tparam[1] : "";
				}
			}
		}
		return "";
	},
    tryParseJSON : function (jsonString){
              try {
                  var jsonData = JSON.parse(jsonString);
                  // Handle non-exception-throwing cases:
                  // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
                  // but... JSON.parse(null) returns 'null', and typeof null === "object",
                  // so we must check for that, too.
                  if (jsonData && typeof jsonData === "object" && jsonData !== null) {
                      return jsonData;
                  }
              }
              catch (e) {}
              return false;
    },

	ajaxCall : function(method, apiUrl, successCallback, errorCallback, payload){
		var _this = this;
		$.ajax({
		   type: method,
		   url: _this.apiSrvPath + apiUrl,
		   dataType : "json",
		   data : typeof payload != 'undefined' ? payload : '',
		   crossDomain : true,
		   contentType : "application/json",
		   beforeSend: function(xhr){xhr.setRequestHeader('X-Temp-Header', 'temp-value');},
		   success: function(response){
			   if(typeof successCallback != 'undefined')
				successCallback(response);
			},
			error: function(msg){
				if(typeof errorCallback != 'undefined')
				errorCallback(msg);
			}
		});
	},
	logoutUser : function(){
		var _this = this;
		_this.deleteCookie(_this.userAuthKey);
		//RESET USER INFO
		_this.dataStorage.userInfo = {
			"typeId": 0,
			"email": "",
			"vatNumber": "",
			"panNumber": "",
			"material": "",
			"city": "",
			"pin": 0,
			"phone": 0,
			"mobile": 0,
			"companyName": "",
			"userTypeLabel": "",
			"name": "",
			"id": 0,
			"state": "",
			"address": "",
			"country": ""
		}
		_this.redirectTo("login");
	}
};
$.aaacplApp.pageHeader = {};
$.aaacplApp.pageSidebar = {};
$.aaacplApp.pageContent = {};
$.aaacplApp.dashboardPage = {};
$.aaacplApp.manageDept = {};
$.aaacplApp.manageAuction = {};
$.aaacplApp.profilePage = {};
$.aaacplApp.pageFooter = {};
$.aaacplApp.loginPage = {};
$.aaacplApp.forgotPage = {};
$.aaacplApp.registerPage = {};
$.aaacplApp.init();




