$.aaacplApp.manageDept.getLayout = function (){
	
	/***
	** COMPLETE DEPARTMENT PAGE LAYOUT 
	**/
	var tmpl = 
               '<div id="departments" class="box box-solid manage">'+
               '<div class="box-header">'+
               '<h3 class="box-title">Departments</h3>'+
               '<div class="box-tools pull-right">'+
               '<button class="btn bg-orange" data-toggle="modal" data-target="#add-dept-form">Add New Department</button>'+
               '</div>'+
               '</div>'+
               '<div class="box-body" id="dept-rows-cont">'+
               '</div><!-- /.box-body -->'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
               '</div>'+
               		 //Modal for adding new department
               '<div class="modal fade" tabindex="-1" role="dialog" id="add-dept-form" aria-labelledby="model-heading" data-backdrop="static" data-keyboard="false">'+
               '<div class="modal-dialog" role="document">'+
               '<div class="modal-content">'+
               '<div class="modal-header">'+
               '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
               '<span aria-hidden="true">×</span></button>'+
               '<h4 class="modal-title" id="model-heading">New Department</h4>'+
               '</div>'+
               '<form class="form" role="form">'+
               '<div class="modal-body">'+
               '<div class="form-group">'+
               ' <label for="deptInputName">Department Name</label>'+
               ' <input type="text" class="form-control" name="name" id="deptInputName" required>'+
               '</div>'+
               '<div class="form-group"> <label>Department Logo</label>'+
               '<div><input type="hidden" id="deptLogoPath" name="logoPath" value=""><input type="file" class="hidden" id="deptInputFile" accept="image/*">'+
               '<label class="form-control btn btn-default" for="deptInputFile" style="width: 15%;">Select a file</label>'+
               '<span id="deptInputFileText" style="padding:8px;">no file chosen</span>'+
               '</div>'+
               '</div>'+
               '<div class="form-group">'+
               '<button type="button" class="btn btn-primary" style="display:none;" id="deptUploadLogoFile">Upload</button>'+
               '<img class="help-block uploaded" id="deptLogoSrc" src="#" alt="preview logo here" style="max-height: 150px;">'+
               '</div>'+
               '</div>'+
               '<div class="modal-footer">'+
               '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>'+
               '  <button type="submit" class="btn bg-orange">Create</button>'+
               '  <button type="reset" class="btn">Reset</button>'+
               '</div>'+
               '</form>'+
               '</div>'+
               '<!-- /.modal-content -->'+
               '</div>'+
               '<!-- /.modal-dialog -->'+
               '<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
               '</div>';
	return tmpl;
};

$.aaacplApp.manageDept.executeScript = function(){
	var _this = this;

	$("#deptUploadLogoFile").on('click',function(e){
	        $(".overlay").show();
    		var file = $('#deptInputFile').get(0).files[0];
    		if (file) {
    		var formData = new FormData();
    		formData.append('file', file);
			var curDate = new Date();
    		$.aaacplApp.ajaxCall("POST", "files/upload?fn=dept_logo_" + curDate.getTime(), function success(response){
    		    if(response.filePath && response.filePath != ""){
                    $("#deptLogoPath").val(response.filePath);
                    $('#deptUploadLogoFile').hide();
                    $(".overlay").hide();
    		    }else{
    		    $.notify("Unable to upload file","error");
    		    }
    		}, function error(msg){
    		    $(".overlay").hide();
    		    $.notify("Unable to upload file","error");
    		}, formData, true, false);
    		}
    	});

    $("#deptInputFile").on('change',function(){
              if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#deptLogoSrc').attr('src', e.target.result);
                    $('#deptUploadLogoFile').show();
					$.notify(" Click upload button to upload file on server.","info");
                }
                reader.readAsDataURL(this.files[0]);
                 $('#deptInputFileText').html(this.files[0].name);
              }
        });

    $(":reset").click(function(){
         $('#deptLogoSrc').attr('src', "#");
         $('#deptUploadLogoFile').hide();
    });

	_this.loadDeptRows();

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
			if(response.successMessage && response.successMessage !=""){
				$('#add-dept-form').modal('hide');
                 $.notify('Department has been created.',"success");
				payload.id = response.successMessage;
				$.aaacplApp.dataStorage.deptList.push(payload);
				_this.loadDeptRows();
			}else {
				$.notify('Unable to create department. Please try again later.',"error");
            }
		}, function error(msg){
			$(".overlay").hide();
			$.notify('Unable to create department. Please try again later.',"error")
		}, JSON.stringify(payload), undefined, false);
	});
	
};

$.aaacplApp.manageDept.loadDeptRows = function (){
	    $(".overlay").show();
		var deptList = $.aaacplApp.dataStorage.deptList;
		    $("#dept-rows-cont").html('');
		    $(".overlay").hide();
		$.each(deptList, function(key , value){
			var deptRow = '<div class="box box-default box-solid collapsed-box dept-row" id="dr-'+value.id+'">'+
			' <div class="box-header with-border">'+
			'  <h3 id="box-title'+value.id+'" class="box-title">'+value.name+'</h3>'+
			 ' <div class="box-tools pull-right">'+
			  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
			  '  <a href="#/manage/auctions?deptid='+value.id+'" id="href'+value.id+'" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE AUCTIONS</a>'+
			  '</div>'+
			'</div>'+
			'<form id="editDeptForm'+value.id+'" class="form" role="form">'+
			'<div class="box-body">'+
			 '<div class="form-group">'+
			  ' <label for="dept'+value.id+'InputName">Department Name</label>'+
			   ' <input type="text" class="form-control" id="dept'+value.id+'InputName" name="name" value="'+value.name+'" required>'+
			 '</div>'+
              '<div class="form-group">'+
              '<label>Status</label>'+
                '<select class="form-control" name="status" id ="dept'+value.id+'status">'+
                '<option value="A">Active</option>'+
                '<option value="I">Inactive</option>'+
                '</select>'+
              '</div>'+
              '<div class="form-group"> <label>Department Logo</label>'+
              '<div><input type="hidden" id="dept'+value.id+'LogoPath" name="logoPath" value="'+value.logoPath+'"><input type="file" class="hidden" id="dept'+value.id+'InputLogoFile" accept="image/*">'+
              '<label class="form-control btn btn-default" for="dept'+value.id+'InputLogoFile" style="width: 10%;">Select a file</label><span id="dept'+value.id+'InputFileText" style="padding:8px;">no file chosen</span>'+
              '</div>'+
              '</div>'+
			 '<div class="form-group">'+
			   /*$.aaacplApp.uploadPath = "http://eauction.aaacpl.com/tmp/"*/
			   '<img class="help-block uploaded img-thumbnail" id="dept'+value.id+'LogoSrc" src="#" alt="No logo uploaded" style="max-height: 150px;">'+
			   '<button type="button" style="display:none;" class="btn btn-primary" id="dept'+value.id+'UploadLogoFile">Upload</button>'+
			   '</div>'+
			 '</div>'+
			'<div class="box-footer">'+
				'<button type="submit" class="btn bg-orange">UPDATE</button>'+
                ' <button type="button" id="resetEditDept" class="btn">Reset</button>'+
			'</div>'+
			'</form>'+
		'</div>';

		 $("#dept-rows-cont").append(deptRow);

		 if(value.status && value.status == "I"){
		 $('#dept'+value.id+'status').val('I');
		 }

		 $("#href"+value.id).on('click', function() {
            $.aaacplApp.getAuctionList(value.id);
         });

		 $("#resetEditDept").click(function(){
		     $("#editDeptForm"+value.id)[0].reset();
		 });

         var logoPath = "#";
		 if(typeof(value.logoPath) !== 'undefined' && value.logoPath !== null){
		    logoPath = $.aaacplApp.uploadPath + value.logoPath;
            $('#dept'+value.id+'LogoSrc').attr('src',logoPath);
            $('#dept'+value.id+'InputFileText').html(value.logoPath.split('/')[1]);
		 }

		 $(":reset").click(function(){
                  $('#dept'+value.id+'LogoSrc').attr('src', logoPath);
                  $('#dept'+value.id+'UploadLogoFile').hide();
             });

	$("#dept"+value.id+"UploadLogoFile").on('click',function(e){
		var file = $('#dept'+value.id+'InputLogoFile').get(0).files[0];
		var formData = new FormData();
		formData.append('file', file);
		$(".overlay").show();
		var curDate = new Date();
		var logoFolder = value.logoPath.split("/").length > 0 ? value.logoPath.split("/")[0] :  ("dept_logo_" + curDate.getTime());
		$.aaacplApp.ajaxCall("POST", "files/upload?fn=" + logoFolder, function success(response){
		    if(response.filePath && response.filePath != ""){
                $("#dept"+value.id+"LogoPath").val(response.filePath);
                $(".overlay").hide();
                $('#dept'+value.id+'UploadLogoFile').hide();
		    }
		    else{
		        $.notify("Unable to upload file","error");
		    }
		}, function error(msg){
		    $.notify("Unable to upload file","error");
		    $(".overlay").hide();
		}, formData,true);
	});

	$("#dept"+value.id+"InputLogoFile").on('change',function(){
    		  if (this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#dept'+value.id+'LogoSrc').attr('src', e.target.result);
                    $('#dept'+value.id+'UploadLogoFile').show();
					$.notify("Click upload button before creating department for uploading logo.","info");
                }
                reader.readAsDataURL(this.files[0]);
                $('#dept'+value.id+'InputFileText').html(this.files[0].name);
              }
    	});

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
					$("#dr-"+deptID+" [data-widget]").click();
					 $.notify('Department has been updated',"success");
                    $.aaacplApp.getDeptList();
                    $("#box-title"+value.id).text(deptPost.name);
                } else {
					 $.notify('Unable to update department. Please try again.',"error");
                }
            }, function error(msg){
                $(".overlay").hide();
				$.notify('Unable to update department. Please try again later.',"error");
            },
            //POST PAYLOAD
            JSON.stringify(deptPost), undefined, false);
        });
			
		});
}

     