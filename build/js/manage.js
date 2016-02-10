$.aaacplApp.managePage.getLayout = function (){
	
	/***
	** COMPLETE DEPARTMENT PAGE LAYOUT 
	**/
	var tmpl = '<div id="departments" class="box box-solid">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Departments</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange" data-toggle="modal" data-target="#add-dept-form">New Department</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body">'+
			
			//Department 1
		'<div class="box box-warning collapsed-box dept-row">'+
			' <div class="box-header with-border">'+
			'  <h3 class="box-title"><i class="fa fa-bank"></i> Department 1</h3>'+
			 ' <div class="box-tools pull-right">'+
			  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
			  '  <button type="button" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE AUCTIONS</button>'+
			  '</div>'+
			'</div>'+
			'<div class="box-body">'+
			'<div class="form" role="form">'+
			 '<div class="form-group">'+
			  ' <label for="deptInputName">Department Name</label>'+
			   ' <input type="text" class="form-control" id="deptInputName">'+
			 '</div>'+
			 '<div class="form-group">'+
			 ' <label for="deptInputLogoFile">Department Logo</label>'+
			   ' <input type="file" class="form-control" id="deptInputLogoFile">'+
			 '</div>'+
			'</div>'+
			'</div>'+
			'<div class="box-footer">'+
				'  <button type="button" class="btn bg-orange">UPDATE</button>'+
			'</div>'+
		'</div>'+
		
		//Department 2
		
		'<div class="box box-warning collapsed-box dept-row">'+
			' <div class="box-header with-border">'+
			'  <h3 class="box-title"><i class="fa fa-bank"></i> Department 2</h3>'+
			 ' <div class="box-tools pull-right">'+
			  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
			  '  <button type="button" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE AUCTIONS</button>'+
			  '</div>'+
			'</div>'+
			'<div class="box-body">'+
			'<div class="form" role="form">'+
			 '<div class="form-group">'+
			  ' <label for="deptInputName">Department Name</label>'+
			   ' <input type="text" class="form-control" id="deptInputName">'+
			 '</div>'+
			 '<div class="form-group">'+
			 ' <label for="deptInputLogoFile">Department Logo</label>'+
			   ' <input type="file" class="form-control" id="deptInputLogoFile">'+
			 '</div>'+
			'</div>'+
			'</div>'+
			'<div class="box-footer">'+
				'  <button type="button" class="btn bg-orange">UPDATE</button>'+
			'</div>'+
		'</div>'+
		
			'</div><!-- /.box-body -->'+
         ' </div>'+
		 
		 //Modal for adding new department
		 '<div class="modal fade" tabindex="-1" role="dialog" id="add-dept-form" aria-labelledby="model-heading">'+
          '<div class="modal-dialog" role="document">'+
           ' <div class="modal-content">'+
              '<div class="modal-header">'+
               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
               '   <span aria-hidden="true">×</span></button>'+
               ' <h4 class="modal-title" id="model-heading">New Department</h4>'+
              '</div>'+
              '<div class="modal-body">'+
              '<div class="form" role="form">'+
			 '<div class="form-group">'+
			  ' <label for="deptInputName">Department Name</label>'+
			   ' <input type="text" class="form-control" id="deptInputName">'+
			 '</div>'+
			 '<div class="form-group">'+
			 ' <label for="deptInputLogoFile">Department Logo</label>'+
			   ' <input type="file" class="form-control" id="deptInputLogoFile">'+
			 '</div>'+
			'</div>'+
              '</div>'+
              '<div class="modal-footer">'+
              '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>'+
              '  <button type="button" class="btn btn-primary">Save changes</button>'+
              '</div>'+
            '</div>'+
            '<!-- /.modal-content -->'+
          '</div>'+
          '<!-- /.modal-dialog -->'+
        '</div>';
	return tmpl;
};

$.aaacplApp.managePage.executeScript = function(){
	
};

     