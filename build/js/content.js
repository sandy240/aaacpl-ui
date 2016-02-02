$.aaacplApp.pageContent.getLayout = function (){
	//This code will be dynamic - for now it is static
	var tmpl = '<!-- Content Wrapper. Contains page content -->'+
      '<div class="content-wrapper">'+
       ' <!-- Content Header (Page header) -->'+
       ' <section class="content-header">'+
         ' <h1>'+
          '  DASHBOARD'+
           ' <small>Welcome</small>'+
          '</h1>'+
          '<ol class="breadcrumb">'+
          '  <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>'+
           ' <li class="active">Dashboard</li>'+
          '</ol>'+
        '</section>'+
        '<!-- Main content -->'+
        '<section class="content">'+
         ' <!-- Your Page Content Here -->'+
        '</section><!-- /.content -->'+
      '</div><!-- /.content-wrapper -->';
	return tmpl;
};