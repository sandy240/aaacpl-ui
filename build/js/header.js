$.aaacplApp.pageHeader.getLayout = function (userInfo){
	//This code will be dynamic - for now it is static
	var tmpl = ' <!-- Main Header --> '+
      '<header class="main-header">'+
       ' <!-- Logo -->'+
       ' <a href="/" class="logo">'+
        '  <!-- mini logo for sidebar mini 50x50 pixels -->'+
         ' <span class="logo-mini"><img src="dist/img/logo-sm.png" height="50"></span>'+
          '<!-- logo for regular state and mobile devices -->'+
          '<span class="logo-lg"><img src="dist/img/logo.png" height="50"></span>'+
        '</a>'+
       ' <!-- Header Navbar -->'+
        '<nav class="navbar navbar-static-top" role="navigation">'+
          '<!-- Sidebar toggle button-->'+
         ' <button class="sidebar-toggle" data-toggle="offcanvas" role="button">'+
           ' <span class="sr-only">Toggle navigation</span>'+
         ' </button>'+
		 '<span class="headertitle"><strong>E-Auction</strong><small class="hidden-xs"> - A.A.Auctioneers & Contractors Pvt. Ltd.</small></span>'+
         ' <!-- Navbar Right Menu -->'+
         ' <div class="navbar-custom-menu">'+
         '<input type="hidden" id="adminCheck" value="'+userInfo.typeId+'">'+
         '   <ul class="nav navbar-nav">'+
         '<!-- send notification -->'+
          '<li id="notifyUser"><a href="#/notification"><i class="fa fa-share"></i><span>Notify Users</span></a></li>'+
          '<li><a id="sign-out-user" href="#/logout" class="btn btn-flat"><i class="fa fa-sign-out"></i><span>Logout</span></a></li>'+
                '</ul>'+
              '</li>'+
           ' </ul>'+
         ' </div>'+
        '</nav>'+
     ' </header>';
	return tmpl;
};

$.aaacplApp.pageHeader.executeScript = function(){
	$('#sign-out-user').click(function(e){
		e.preventDefault();
		$.aaacplApp.logoutUser();
	});

	$("#adminCheck").val() == 1 ? $("#notifyUser").show() : $("#notifyUser").hide();
};