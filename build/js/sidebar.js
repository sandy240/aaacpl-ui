$.aaacplApp.pageSidebar.getLayout = function (userInfo){
	//This code will be dynamic - for now it is static
	
	var menuTmpl = "";
	
	switch(userInfo.typeId){
		case 1:
		menuTmpl = $.aaacplApp.pageSidebar.getAdminMenuItems();
		break;
		case 2 , 3:
		menuTmpl = $.aaacplApp.pageSidebar.getPrctMenuItems();
		break;
		case 4:
		menuTmpl = $.aaacplApp.pageSidebar.getClientMenuItems();
		break;
	}
	
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
             ' <p>' + userInfo.name +'</p>' +
              '<!-- Status -->' +
              '<a href="#">' + userInfo.userTypeLabel +'</a>' +
            '</div>' +
          '</div>' +
		'<!-- Sidebar Menu -->' +
		menuTmpl +
        '<!-- /.sidebar-menu -->' +
        '</section>' +
        '<!-- /.sidebar -->' +
      '</aside>';
	return tmpl;
};
$.aaacplApp.pageSidebar.getPrctMenuItems = function (){
	var tml = '<ul class="sidebar-menu">' +
			'<li><a href="#"><i class="fa fa-dashboard"></i><span>DASHBOARD</span></a></li>' +
			'<li><a href="#"><i class="fa fa-user"></i><span>PROFILE</span></a></li>' +
			'<li><a href="#"><i class="fa fa-history"></i><span>HISTORY</span></a></li>' +
            '<li><a href="#"><i class="fa fa-circle"></i><span>Live Auctions</span></a></li>' +
           ' <li><a href="#"><i class="fa fa-circle-o"></i><span>Upcoming Auctions</span></a></li>' +
          '</ul>';
		  return tml;
};
$.aaacplApp.pageSidebar.getClientMenuItems = function (){
	var tml =  '<ul class="sidebar-menu">' +
			'<li><a href="#"><i class="fa fa-dashboard"></i><span>DASHBOARD</span></a></li>' +
			'<li><a href="#"><i class="fa fa-user"></i><span>PROFILE</span></a></li>' +
			'<li><a href="#"><i class="fa fa-history"></i><span>HISTORY</span></a></li>' +
            '<li><a href="#"><i class="fa fa-circle"></i><span>OBSERVATION</span></a></li>' +
          '</ul>';
		  return tml;
};
$.aaacplApp.pageSidebar.getAdminMenuItems = function (){
	var tml =  '<ul class="sidebar-menu">' +
			'<li><a href="#"><i class="fa fa-dashboard"></i><span>DASHBOARD</span></a></li>' +
			'<li><a href="#"><i class="fa fa-user"></i><span>PROFILE</span></a></li>' +
            '<li><a href="#/manage"><i class="fa fa-cog"></i><span>MANAGE</span></a></li>' +
			'<li><a href="#/"><i class="fa fa-pie-chart"></i><span>REPORTS</span></a></li>' +
          '</ul>';
		  return tml;
};
