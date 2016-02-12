//Make sure jQuery has been loaded before main.js
if (typeof jQuery === "undefined") {
  throw new Error("jQuery not loaded");
}

//AAACPL auction app
$.aaacplApp = {
	
	//API Root path
	apiSrvPath : "http://api.aaacpl.com/rest/",
	
	userAuthKey : "uAuthIDAAACPL",

	sessionInfo : {
	"sessionId" : "",
	"userId" : ""
	},

	
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
			"address": "",
			"name": "",
			"id": 0,
			"state": "",
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
		"manage": '#/manage'
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
		
		var routeObj = _this.routes[url];
		
		// Do we have both a view and a route?
		if (_this.wrapperElem) {
			if(routeObj.presenter){
				// Render route template :
				_this.wrapperElem.html(routeObj.presenter());	
			}
			if(routeObj.controller){
				$(document).ready(routeObj.controller());
			}
		}
		
		//AdminLTE app.js
		if(typeof $.AdminLTE == 'undefined'){
			var scrpt = document.createElement('script');
			scrpt.src = "dist/js/app.min.js";
			document.body.appendChild(scrpt);
		} else {
			$.AdminLTE.layout.fix();
		}
		
	},
	init : function(){
		var _this = this;
		
		var pageURL = window.location.href;
		
		//Add all possible routes
		_this.addRoutes();
		
		_this.wrapperElem = $('#main-viewport');
		

        // Setting a cookie for which the dashboard will be displayed instead of login page
        //document.cookie="uAuthIDAAACPL=neville; expires=Thu, 31 Dec 2016 12:00:00 UTC; path=/"; //note : uncomment line for direct login
		
		if(pageURL.indexOf(_this.template['register'])<0 || pageURL.indexOf(_this.template['login'])<0){
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
		_this.route('/manage', 'manage_dept', function () {	
			var managecontents = _this.managePage.getLayout();
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("MANAGE", managecontents , "Departments <i class='fa fa-link'></i> Auctions <i class='fa fa-link'></i> Lots"));
		});
		
		//PROFILE PAGE
	   _this.route('/profile', 'profile', function () {
			var userprofilecontents = _this.profilePage.getLayout();
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("PROFILE", userprofilecontents , ""));
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
		var userdata = (typeof _this.dataStorage.userInfo != 'undefined' ? this.dataStorage.userInfo : {} );
		var pageCommonHeader = _this.pageHeader.getLayout();
		var pageCommonSidebar = _this.pageSidebar.getLayout();
		var pageCommonFooter = _this.pageFooter.getLayout();
		
		_this.changeBodyLayoutType('sidebar-mini');
		_this.wrapperElem[0].className = 'wrapper';
		
		return pageCommonHeader + pageCommonSidebar + actualContents + pageCommonFooter;
	},

	redirectTo : function(sectionTo) {
		var href, _this = this;
		if(sectionTo == 'home' && _this.sessionInfo !=""){
		       getSessionUserInfo();
		}
		window.location.href = _this.template[sectionTo];
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

    getSessionUserInfo : function (){
    var _this = this;
     // ajax call on page load which will return the user Info on passing sessionId and userId
                 $.ajax({
                   type: "POST",
                   url: _this.apiSrvPath + 'user/userinfo',
                   data: JSON.stringify(_this.sessionInfo),
                   dataType : "json",
                   crossDomain : true,
                   contentType : "application/json",
                   success: function(response){
                   var isValidJson = _this.tryParseJSON(response);
                   if(isValidJson){
                    $.each(data, function (key, value) {
                        _this.dataStorage.userInfo[key] = value;
                   });
                   }else{
                        alert("Something went wrong! Please try again later");
                        _this.redirectTo('login');   //REDIRECT TO login or we can make a page having a
                        //panel showing messages when REST API behaves inappropriately or sends incorrect data
                     }
                   },
                    error: function() {
                     alert("Something went wrong! Please try again later");
                     _this.redirectTo('login');  //REDIRECT TO login
                   }
                });
    }
};
$.aaacplApp.pageHeader = {};
$.aaacplApp.pageSidebar = {};
$.aaacplApp.pageContent = {};
$.aaacplApp.dashboardPage = {};
$.aaacplApp.managePage = {};
$.aaacplApp.profilePage = {};
$.aaacplApp.pageFooter = {};
$.aaacplApp.loginPage = {};
$.aaacplApp.forgotPage = {};
$.aaacplApp.registerPage = {};
$.aaacplApp.init();




