$.aaacplApp.managePage.getLayout = function (pageheader, pagecontents , pagesubheader){
	pageheader = (typeof pageheader == 'undefined' ? "" : pageheader);
	pagesubheader = (typeof pagesubheader == 'undefined' ? "" : pagesubheader);
	pagecontents = (typeof pagecontents == 'undefined' ? "" : pagecontents);
	//This code will be dynamic - for now it is static
	var tmpl = '<div class="box box-primary">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Select Department</h3>'+
            '</div>'+
            '<div class="box-body">'+
            '<!-- /.box-body -->'+
         ' </div>';
	return tmpl;
};

$.aaacplApp.managePage.executeScript = function(){
	
};