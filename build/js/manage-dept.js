$.aaacplApp.manageDept.getLayout = function (){
	
	/***
	** COMPLETE DEPARTMENT PAGE LAYOUT 
	**/
	var tmpl = '<div id="form-success">'+
               '<div class="alert alert-success">'+
               '<strong>Department has been created/updated successfully! </strong>'+
               '</div>'+
               '</div>'+
			   '<div id="form-failure">'+
              '<div class="alert alert-danger">'+
              '<strong>Error !</strong> <span class="message-text"></span>'+
              '</div>'+
              '</div>'+
			  '<div id="departments" class="box box-solid manage">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Departments</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange" data-toggle="modal" data-target="#add-dept-form">New Department</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body" id="dept-rows-cont">'+
			'</div><!-- /.box-body -->'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
         '</div>'+
		 
		 //Modal for adding new department
		 '<div class="modal fade" tabindex="-1" role="dialog" id="add-dept-form" aria-labelledby="model-heading">'+
          '<div class="modal-dialog" role="document">'+
           ' <div class="modal-content">'+
              '<div class="modal-header">'+
               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
               '   <span aria-hidden="true">×</span></button>'+
               ' <h4 class="modal-title" id="model-heading">New Department</h4>'+
              '</div>'+
			  '<form class="form" role="form">'+
              '<div class="modal-body">'+
			 '<div class="form-group">'+
			  ' <label for="deptInputName">Department Name</label>'+
			   ' <input type="text" class="form-control" name="name" id="deptInputName" required>'+
			 '</div>'+
			 '<div class="form-group">'+
			 ' <label for="deptInputLogoFile">Department Logo</label>'+
			   ' <input type="file" class="form-control" name="logoPath" id="deptInputLogoFile">'+
			 '</div>'+
              '</div>'+
              '<div class="modal-footer">'+
              '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>'+
              '  <button type="submit" class="btn btn-primary">Save changes</button>'+
              '</div>'+
			  '</form>'+
            '</div>'+
            '<!-- /.modal-content -->'+
          '</div>'+
          '<!-- /.modal-dialog -->'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
        '</div>';
		
	return tmpl;
};

$.aaacplApp.manageDept.executeScript = function(){
	var _this = this;
	
	_this.loadDeptRows();
	
	$('#form-success').hide();
		$('#form-failure').hide();

	
	var addNewDeptForm = $("#add-dept-form form");
	addNewDeptForm.submit(function(event){
		event.preventDefault(); // Prevent the form from submitting via the browser
		var formData = addNewDeptForm.serializeArray(); // JSON data of values entered in form
		var payload = {};
		$.each(formData, function (key, item) {
			payload[item.name] = item.value;
		});
		$(".overlay").show();
		$.aaacplApp.ajaxCall("POST","department/create",function success(response){
			$(".overlay").hide();
			if(response.successMessage && response.successMessage == "SUCCESS"){
				$('#add-dept-form').modal('hide');
				_this.loadDeptRows();
			}
		}, function error(msg){
			$(".overlay").hide();
		}, JSON.stringify(payload));
	});
	
};

$.aaacplApp.manageDept.loadDeptRows = function (){
	$(".overlay").show();
	$.aaacplApp.ajaxCall("GET","department/list",function success(response){
		$(".overlay").hide();
		$("#dept-rows-cont").html('');
		var deptList = response.departmentResponseList;
		$.each(deptList, function(key , value){
			
			var deptRow = '<div class="box box-default box-solid collapsed-box dept-row" id="dr-'+value.id+'">'+
			' <div class="box-header with-border">'+
			'  <h3 class="box-title">'+value.name+'</h3>'+
			 ' <div class="box-tools pull-right">'+
			  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
			  '  <a href="#/manage/auctions?deptid='+value.id+'" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE AUCTIONS</a>'+
			  '</div>'+
			'</div>'+
			'<form id="editDeptForm'+value.id+'" class="form" role="form">'+
			'<div class="box-body">'+
			 '<div class="form-group">'+
			  ' <label for="dept'+value.id+'InputName">Department Name</label>'+
			   ' <input type="text" class="form-control" id="dept'+value.id+'InputName" name="name" value="'+value.name+'" required>'+
			 '</div>'+
			 '<div class="form-group">'+
			 ' <label for="dept'+value.id+'InputLogoFile">Department Logo</label>'+
			   ' <input type="file" class="form-control" name="logoPath" id="dept'+value.id+'InputLogoFile">'+
			 '</div>'+
			'</div>'+
			'<div class="box-footer">'+
				'<button type="submit" class="btn bg-orange">UPDATE</button>'+
                ' <button type="button" class="btn" data-dismiss="modal">Reset</button>'+
			'</div>'+
			'</form>'+
		'</div>';

		 $("#dept-rows-cont").append(deptRow);


        $('#editDeptForm' + value.id).submit(function(event){
            var deptID = event.target.id.replace('editDeptForm','');
            event.preventDefault(); // Prevent the form from submitting via the browser
            var formData = $('#editDeptForm' + deptID).serializeArray(); // JSON data of values entered in form
            var deptPost = {};
                 $.each(formData, function (key, item) {
                                 deptPost[item.name] = item.value;
                             });
                 deptPost["id"] = deptID;
            $(".overlay").show();
            $.aaacplApp.ajaxCall("PUT", 'department/update', function success(response){
                $(".overlay").hide();
                if(response.successMessage && response.successMessage != ""){
                    $('#form-success').show();
                } else {
                    $('#form-failure').show();
                    $('#form-failure .message-text').html('Unable to update department. Please try again.');
                }
            }, function error(msg){
                $(".overlay").hide();
                $('#form-failure').show();
                $('#form-failure .message-text').html('Unable to update department. Please try again later.');
            },
            //POST PAYLOAD
            JSON.stringify(deptPost));
        });
			
		});
	}, function error(msg){
		$(".overlay").hide();
	});
}

     