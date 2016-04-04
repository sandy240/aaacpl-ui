//Make sure jQuery has been loaded before main.js
if (typeof jQuery === "undefined") {
  throw new Error("jQuery not loaded");
}

//AAACPL auction app
$.aaacplApp = {
	
	//API Root path
	apiSrvPath : "http://eauction.aaacpl.com/rest/",
	
	uploadPath : "http://eauction.aaacpl.com/tmp/",

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
		},
		// list of users
		userList: [],

		deptList: [],

		auctionList : [],

		lotList : [],

		participatorMasterList : []
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
		"userList": '#/users',
		"manage-dept": '#/manage/dept',
		"manage-auction": '#/manage/auctions',		
		"manage-lot": '#/manage/lots',		
		"live": '#/live'	
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
	router : function () {
		
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
			if(_this.isUserLoggedIn() && _this.dataStorage.userInfo.typeId == 0) {
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
		
		if(_this.dataStorage.userInfo.typeId != 1 && routeobj.templateId=="home"){
			_this.redirectTo("auction");
		}
		
		if(_this.dataStorage.deptList.length == 0 && _this.isUserLoggedIn()){
			_this.getDeptList();
		}
		if(_this.dataStorage.userList.length == 0 && _this.isUserLoggedIn()){
			_this.getUserList();
		}
		
		
		if(routeobj.presenter){
			// Render route template :
			container.html(routeobj.presenter());	
		}
		if(routeobj.controller){
			$(document).ready(function(){
				routeobj.controller();
			});
		}
		if(routeobj.templateId!="login"  || routeobj.templateId!="register")
		_this.commonLayoutReady();
		
		$(document).ready(function(){
			//TEMPORARY PATCH WORK TO RELOAD ADMINLTE MODULES
			$('script[src$="app.min.js"]').remove();
			
			var scrpt = document.createElement('script');
			scrpt.src = "dist/js/app.min.js";
			scrpt.async = false;
			document.body.appendChild(scrpt);
		});
		
	},
	isUserLoggedIn : function(){
		var _this = this;
		if(_this.readCookie(_this.userAuthKey).length > 0){
			return true;
		}
		return false;
	},
	init : function(){
		$.support.cors = true;
		
		var _this = this;
		
		var pageURL = window.location.href;
		
		//Add all possible routes
		_this.addRoutes();

        // load auction data if exists
		var deptCookie = _this.readCookie('deptId');
		if(deptCookie && deptCookie != ''){
	           _this.getAuctionList(deptCookie);
		}

		 // load auction data if exists
        var auctionCookie = _this.readCookie('auctionId');
        if(auctionCookie && auctionCookie != ''){
               _this.getLotList(auctionCookie);
        }

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
		window.onhashchange = _this.router;
		
		// Listen on page load:
		window.onload = _this.router;
		//window.addEventListener('load', _this.router);
	},
	getLoggedInUserId : function() {
		var _this = this;
		var sId = _this.readCookie(_this.userAuthKey);
		//Redirection to login if authentication fails i.e session does not exists
		if(sId.length > 0){
			return sId.split('@')[1];
		}
		return 0;
	},
	addRoutes : function(){
		var _this = this;
		//ROUTER URLs binding
		
		//HOME - DASHBOARD
		_this.route('/', 'home', function () {
			
			//TODO - Dashbaord content will be passed to pageContent
			var dashboard = "<h3>Auction</h3><p>Click on &quot;Auction&quot; to select and participate in live auction</p>";
			if(_this.dataStorage.userInfo.typeId == "1"){
				dashboard = "<h3>Manage</h3><p>Click on &quot;Manage&quot; to add or modify Departments, Auctions or Lots</p><br><h3>Reports</h3><p>Click on &quot;Reports&quot; to generate reports auction or lot wise</p>";
			}
			if(_this.dataStorage.userInfo.typeId == "4"){
				dashboard = "<h3>Observation</h3><p>Click on &quot;Observation&quot; to observe live bidding for selected live auction</p>";
			}
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("DASHBOARD", dashboard , "Welcome"));
		});
		
		//MANAGE - DEPARTMENTS
		_this.route('/manage/dept', 'manage_dept', function () {	
			var manageDeptContents = _this.manageDept.getLayout();
			
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("MANAGE", manageDeptContents , "Add / Modify Departments"));
		}, function(){
			_this.manageDept.executeScript();
		});

		//MANAGE - DEPARTMENTS
        _this.route('/users', 'userList', function () {
            var usersListContents = _this.usersListPage.getLayout();
            return _this.wrapInCommonLayout(_this.pageContent.getLayout("USERS", usersListContents , "View / Add/  Edit Users "));
        }, function(){
            _this.usersListPage.executeScript();
        });
		
		//MANAGE - AUCTIONS
		_this.route('/manage/auctions', 'manage_auctions', function () {	
			var manageAuctionContents = _this.manageAuction.getLayout();
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("MANAGE", manageAuctionContents , "Add / Modify Auctions"));
		}, function(){
			_this.manageAuction.executeScript();
		});
		
		//MANAGE - LOTS
		_this.route('/manage/lots', 'manage_lots', function () {
			var manageLotContents = _this.manageLot.getLayout();
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("MANAGE", manageLotContents , "Add / Modify Lots"));
		}, function(){
			_this.manageLot.executeScript();
		});
		
		//LIVE
		_this.route('/live', 'live', function () {	
			var livePageContents = _this.livePage.getLayout();
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("LIVE", livePageContents , "Auction"));
		}, function(){
			_this.livePage.executeScript();
		});
		
		//AUCTION
		_this.route('/auction', 'auction', function () {	
			var auctionListContents = _this.auctionListPage.getLayout();
			var title = "AUCTIONS";
			if(_this.dataStorage.userInfo.typeId == "4"){
				title = "OBSERVATION"
			}
			return _this.wrapInCommonLayout(_this.pageContent.getLayout(title, auctionListContents , "Live and Upcoming Auctions"));
		}, function(){
			_this.auctionListPage.executeScript();
		});
		
		
		//PROFILE PAGE
	   _this.route('/profile', 'profile', function () {
			var userProfileContents = _this.profilePage.getLayout(_this.dataStorage.userInfo);
			return _this.wrapInCommonLayout(_this.pageContent.getLayout("PROFILE", userProfileContents , "View / Edit account"));
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

		//REPORT
        _this.route('/reports', 'reports', function () {
        var reportContent = _this.reportPage.getLayout();
        return _this.wrapInCommonLayout(_this.pageContent.getLayout("REPORTS",  reportContent   , "View reports"));
        }, function(){
        _this.reportPage.executeScript();
        });

        //NOTIFICATION
        _this.route('/notification', 'notification', function () {
        var notificationContent = _this.notificationPage.getLayout();
        return _this.wrapInCommonLayout(_this.pageContent.getLayout("NOTIFICATION",  notificationContent   , "Notify Users"));
        }, function(){
        _this.notificationPage.executeScript();
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

	sortArrayUniqueValues : function sortArrayUniqueValues(arr) {
        arr.sort();
        var last_i;
        for (var i=0;i<arr.length;i++)
            if ((last_i = arr.lastIndexOf(arr[i])) !== i)
                arr.splice(i+1, last_i-i);
        return arr;
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

	ajaxCall : function(method, apiUrl, successCallback, errorCallback, payload, isFileUpload, isAsync){
		var _this = this;
		var cacheBuster = apiUrl.indexOf('?') >= 0 ? '&t='+ Math.random() : '?t=' + Math.random();
		//setTimeout(function () { //INSTANT TIMEOUT FOR IE9 BUG FIX
			$.ajax({
			   type: method,
			   async: typeof isAsync === 'boolean' ? isAsync : true,
			   url: _this.apiSrvPath + apiUrl + cacheBuster,
			   dataType :isFileUpload ? "" : "json",
			   data : typeof payload != 'undefined' ? payload : '',
			   crossDomain : true,
			   contentType : isFileUpload ? false : "application/json",
			   processData : isFileUpload ? false : true,
			   cache : isFileUpload ? false : true,
			   beforeSend: function(xhr){xhr.setRequestHeader('sessionId', _this.readCookie(_this.userAuthKey));},
			   success: function(response){
				   if(typeof successCallback != 'undefined')
					successCallback(response);
				},
				error: function(msg){
					if(typeof errorCallback != 'undefined')
					errorCallback(msg);
				}
			});
		//}, 0);
	},
	logoutUser : function(){
		var _this = this;
		
		_this.ajaxCall("POST","user/logout",function success(response){
		},function error(msg){
		}, JSON.stringify({
			userId : _this.getLoggedInUserId()
		}));
		
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
	},

	getUserList: function(){
	var _this = this;
	// get list of participators for each lot
            _this.ajaxCall("GET", 'user/list', function success(response){
                _this.dataStorage.userList = response || [];
                    }, function error(msg){}, undefined, undefined, false);
	},
	getDeptInfoById : function(deptid){
		var _this = this;
		for(var i=0;i<_this.dataStorage.deptList.length;i++){
				if(_this.dataStorage.deptList[i].id == deptid){
					return _this.dataStorage.deptList[i];
				}
			}
			return {};
	},
	getDeptList : function() {
	var _this = this;
	// get list of departments
	_this.ajaxCall("GET", 'department/list', function success(response){
                    _this.dataStorage.deptList = response.departmentResponseList || [];
                     }, function error(msg){}, undefined, undefined, false);

	},

	getAuctionList : function(deptId) {
    	var _this = this;
    	// get list of auctions
    	_this.ajaxCall("GET", 'auction/list/'+deptId, function success(response){
                        _this.dataStorage.auctionList = response.auctionResponseList || [];
                         }, function error(msg){}, undefined, undefined, false);
        _this.deleteCookie('deptId');
        _this.writeCookie('deptId',deptId,1);
    },

    getLotList : function(auctionId) {
            var _this = this;
            // get list of lots
            _this.ajaxCall("GET", 'lots/list/'+auctionId, function success(response){
                            _this.dataStorage.lotList = response.lotsResponseList || [];
                             }, function error(msg){}, undefined, undefined, false);
             _this.deleteCookie('auctionId');
             _this.writeCookie('auctionId',auctionId,1);
            },

    getParticipatorMasterList: function(){
            var _this = this;
            $.aaacplApp.dataStorage.userList.forEach(function(item) {
                    var userDetails = {};
                    userDetails["id"] = item.email;
                    userDetails["text"] = item.name;
                    _this.dataStorage.participatorMasterList.push(userDetails);
                });
    }
};
$.aaacplApp.pageHeader = {};
$.aaacplApp.pageSidebar = {};
$.aaacplApp.pageContent = {};
$.aaacplApp.dashboardPage = {};
$.aaacplApp.auctionListPage = {};
$.aaacplApp.manageDept = {};
$.aaacplApp.manageAuction = {};
$.aaacplApp.manageLot = {};
$.aaacplApp.livePage = {};
$.aaacplApp.profilePage = {};
$.aaacplApp.pageFooter = {};
$.aaacplApp.loginPage = {};
$.aaacplApp.forgotPage = {};
$.aaacplApp.registerPage = {};
$.aaacplApp.usersListPage = {};
$.aaacplApp.notificationPage = {};
$.aaacplApp.init();




