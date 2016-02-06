$.aaacplApp.pageSidebar.getLayout = function (userInfo){
	//This code will be dynamic - for now it is static
	var tmpl = ' <!-- Left side column. contains the logo and sidebar --> ' +
      '<aside class="main-sidebar">' +
       ' <!-- sidebar: style can be found in sidebar.less -->' +
        '<section class="sidebar">' +
         ' <!-- Sidebar user panel (optional) -->' +
          '<div class="user-panel">' +
           ' <div class="pull-left image">' +
            '  <img src="dist/img/default-user.png" class="img-circle" alt="User Image">' +
            '</div>' +
            '<div class="pull-left info">' +
             ' <p>Alexander Pierce</p>' +
              '<!-- Status -->' +
              '<a href="#">Participator</a>' +
            '</div>' +
          '</div>' +
		'<!-- Sidebar Menu -->' +
		//Call as per the user type
		$.aaacplApp.pageSidebar.getPrctMenuItems() +
        '<!-- /.sidebar-menu -->' +
        '</section>' +
        '<!-- /.sidebar -->' +
      '</aside>';
	return tmpl;
};
$.aaacplApp.pageSidebar.getPrctMenuItems = function (){
	var tml = '<ul class="sidebar-menu">' +
			'<li class="active"><a href="#"><i class="fa fa-dashboard"></i> <span>DASHBOARD</span></a></li>' +
			'<li><a href="#"><i class="fa fa-user"></i> <span>PROFILE</span></a></li>' +
			'<li><a href="#"><i class="fa fa-exchange"></i> <span>MY HISTORY</span></a></li>' +
            '<li class="header"><i class="fa fa-ticket"></i> <span> AUCTIONS</span></li>' +
            '<!-- Optionally, you can add icons to the links -->' +
            '<li><a href="#"><i class="fa fa-circle"></i> <span>Live Auctions</span></a></li>' +
           ' <li><a href="#"><i class="fa fa-circle-o"></i> <span>Upcoming Auctions</span></a></li>' +
          '</ul>';
		  return tml;
};
$.aaacplApp.pageSidebar.getClientMenuItems = function (){
	var tml =  '<ul class="sidebar-menu">' +
			'<li class="active"><a href="#"><i class="fa fa-dashboard"></i> <span>DASHBOARD</span></a></li>' +
			'<li><a href="#"><i class="fa fa-user"></i> <span>PROFILE</span></a></li>' +
			'<li><a href="#"><i class="fa fa-exchange"></i> <span>HISTORY</span></a></li>' +
            '<li class="header"><i class="fa fa-ticket"></i> <span>AUCTIONS</span></li>' +
            '<!-- Optionally, you can add icons to the links -->' +
            '<li><a href="#"><i class="fa fa-circle"></i> <span>Observation</span></a></li>' +
          '</ul>';
		  return tml;
};
$.aaacplApp.pageSidebar.getAdminMenuItems = function (){
	var tml =  '<ul class="sidebar-menu">' +
			'<li class="active"><a href="#"><i class="fa fa-dashboard"></i> <span>DASHBOARD</span></a></li>' +
			'<li><a href="#"><i class="fa fa-user"></i> <span>PROFILE</span></a></li>' +
			'<li><a href="#"><i class="fa fa-circle"></i> <span>OBSERVATION</span></a></li>' +
			'<li><a href="#"><i class="fa fa-circle"></i> <span>REPORTS</span></a></li>' +
			'<li class="header"><i class="fa fa-ticket"></i> <span>MANAGE</span></li>' +
            '<!-- Optionally, you can add icons to the links -->' +
            '<li><a href="#"><i class="fa fa-circle"></i> <span>DEPARTMENTS</span></a></li>' +
			'<li><a href="#"><i class="fa fa-circle"></i> <span>AUCTIONS</span></a></li>' +
          '</ul>';
		  return tml;
};
