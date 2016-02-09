$.aaacplApp.managePage.getLayout = function (pageheader, pagecontents , pagesubheader){
	pageheader = (typeof pageheader == 'undefined' ? "" : pageheader);
	pagesubheader = (typeof pagesubheader == 'undefined' ? "" : pagesubheader);
	pagecontents = (typeof pagecontents == 'undefined' ? "" : pagecontents);
	//This code will be dynamic - for now it is static
	var tmpl = '<div class="box box-solid">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Departments</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange">Add Departments</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body">'+
		'<div class="box box-default collapsed-box dept-row">'+
        ' <div class="box-header with-border">'+
        '  <h3 class="box-title">Department 1</h3>'+
         ' <div class="box-tools pull-right">'+
          '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>'+
          '</div>'+
        '</div>'+
        '<div class="box-body">'+
        '</div>'+
        '</div>'+
			'</div><!-- /.box-body -->'+
         ' </div>';
	return tmpl;
};

$.aaacplApp.managePage.executeScript = function(){
	
};

     