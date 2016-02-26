$.aaacplApp.pageContent.getLayout = function (pageheader, pagecontents , pagesubheader){
	pageheader = (typeof pageheader == 'undefined' ? "" : pageheader);
	pagesubheader = (typeof pagesubheader == 'undefined' ? "" : pagesubheader);
	pagecontents = (typeof pagecontents == 'undefined' ? "" : pagecontents);
	//This code will be dynamic - for now it is static
	var tmpl = '<!-- Content Wrapper. Contains page content -->'+
      '<div class="content-wrapper">'+
       ' <!-- Content Header (Page header) -->'+
       ' <section class="content-header">'+
         ' <h1>'+
           pageheader +
           ' <small>'+pagesubheader+'</small>'+
          '</h1>'+
		  '<!-- TODO - BreadCrumb -->'+
          '<!-- ol id="breadcrumb" class="breadcrumb">'+
          '<li><a href="/"><i class="fa fa-dashboard"></i> Home</a></li>'+
           ' <li class="active">Dashboard</li>'+
          '</ol -->'+
        '</section>'+
        '<!-- Main content -->'+
        '<section class="content">'+
         pagecontents +
        '</section><!-- /.content -->'+
      '</div><!-- /.content-wrapper -->';
	return tmpl;
};

$.aaacplApp.pageContent.executeScript = function(){
	$('.alert').bind('show', function(){
		var $this = $(this);
		setTimeout(function(){
			$this.alert('close');
		},5000);
	});
};