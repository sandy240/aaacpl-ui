//Make sure jQuery has been loaded before main.js
if (typeof jQuery === "undefined") {
  throw new Error("jQuery not loaded");
}

//AAACPL auction app
$.aaacplApp = {
	// A hash to store our routes:
	routes : {},
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
		}
		
	},
	init : function(){
		var _this = this;
		
		//Add all possible routes
		_this.addRoutes();
		
		_this.wrapperElem = $('#main-viewport');
		
		// Listen on hash change:
		window.addEventListener('hashchange', _this.router);
		// Listen on page load:
		window.addEventListener('load', _this.router);

        // Setting a cookie for which the dashboard will be displayed instead of login page

        //document.cookie="userName=neville; expires=Thu, 31 Dec 2016 12:00:00 UTC; path=/"; note : uncomment line for direct login

		function readCookie(userName) {
            var cookieValue, cookieList, name = userName + "=";
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
        }

		var sId = readCookie('userName');
		//Redirection to login if authentication fails i.e session does not exists
        if(sId.length == 0){
                var href = location.href;
                var hash = href.indexOf("#");
                var route = '/login';
                location.href = hash < 0 ? href+'#'+route : href ;
            }
        //OR get logged in user info when session exists. Here we can either get info from cookie or REST API

	},
	addRoutes : function(){
		var _this = this;
		//ROUTER URLs binding
		_this.route('/', 'home', function () {
			_this.changeBodyLayoutType('sidebar-mini');
			_this.wrapperElem[0].className = 'wrapper';
			return _this.getCommonLayout() + _this.pageContent.getLayout() + _this.pageFooter.getLayout();
		});

		_this.route('/login', 'login', function () {						
			_this.changeBodyLayoutType('login-page');
			_this.wrapperElem[0].className = 'login-box';
			return _this.loginPage.getLayout();
		}, function(){
			_this.loginPage.executeScript();
		});
		_this.route('/forgot', 'forgotPassword', function () {
			_this.changeBodyLayoutType('login-page');
			_this.wrapperElem[0].className = 'login-box';
			return _this.forgotPage.getLayout();
		}, function(){
			_this.forgotPage.executeScript();
		});
		
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
	getCommonLayout : function (){
		var _this = this;
		var pageCommonHeader = _this.pageHeader.getLayout();
		var pageCommonSidebar = _this.pageSidebar.getLayout();
		return pageCommonHeader + pageCommonSidebar;
	}
};
$.aaacplApp.pageHeader = {};
$.aaacplApp.pageSidebar = {};
$.aaacplApp.pageContent = {};
$.aaacplApp.pageFooter = {};
$.aaacplApp.loginPage = {};
$.aaacplApp.forgotPage = {};
$.aaacplApp.registerPage = {};
$.aaacplApp.init();




