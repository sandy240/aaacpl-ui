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
          '<li class="user user-menu" id="notifyUser"><a href="#/notification"><i class="fa fa-share"></i><span>Notify Users</span></a></li>'+
            '  <!-- User Account Menu -->'+
             ' <li class="dropdown user user-menu">'+
              '  <!-- Menu Toggle Button -->'+
              '  <a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
               '   <!-- The user image in the navbar-->'+
                '  <img src="dist/img/default-user.png" class="user-image" alt="User Image">'+
                '  <!-- hidden-xs hides the username on small devices so only the image appears. -->'+
                 ' <span class="hidden-xs">' + userInfo.companyName+ '</span>'+
               ' </a>'+
                '<ul class="dropdown-menu">'+
                 ' <!-- The user image in the menu -->'+
                 ' <li class="user-header">'+
                   ' <img src="dist/img/default-user.png" class="img-circle" alt="User Image">'+
                   ' <p id="userName">'+
					userInfo.companyName + ' - ' + userInfo.userTypeLabel.split('-')[0] +
                     '<!-- small>Member since Nov. 2012</small -->'+
                  '  </p>'+
                 ' </li>'+
                  '<!-- Menu Footer-->'+
                 ' <li class="user-footer">'+
                   ' <div class="pull-left">'+
                    '  <!-- a href="#" class="btn btn-default btn-flat">Change Password</a -->'+
                  '  </div>'+
                   ' <div class="pull-right">'+
                    '  <button  id="sign-out-user" class="btn btn-default btn-flat">Sign out</button>'+
                  ' </div>'+
                 ' </li>'+
                '</ul>'+
              '</li>'+
           ' </ul>'+
         ' </div>'+
        '</nav>'+
     ' </header>';
	return tmpl;
};

$.aaacplApp.pageHeader.executeScript = function(){
	$('#sign-out-user').click(function(){
		$.aaacplApp.logoutUser();
	});

	$("#adminCheck").val() == 1 ? $("#notifyUser").show() : $("#notifyUser").hide();
};