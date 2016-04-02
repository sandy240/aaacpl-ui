$.aaacplApp.notificationPage.getLayout = function (){

	/***
	** Notification PAGE LAYOUT
	**/
	var tmpl =
                '<div class="box box-solid">'+
                '<div class="box-header">'+
                '<div id="notificationForm-success" style="display:none;">'+
                '<div class="alert alert-success">'+
                '<strong>Mail sent successfully! </strong>'+
                '<span class="close" data-dismiss="alert" aria-label="close">&times;</span>'+
                '</div>'+
                '</div>'+
                '<div id="notificationForm-failure" style="display:none;">' +
                '<div class="alert alert-danger">' +
                '<span class="close" data-dismiss="alert" aria-label="close">&times;</span>' +
                '<strong>Error !</strong> <span class="message-text"></span>' +
                '</div>' +
                '</div>' +
                '<h4>Send Mail</h4>'+
                '</div>'+
                '<form id="notificationForm" class="form" role="form">'+
                '<div class="box-body" id="reports-cont">'+
                '<div class="form-group">'+
                '<label>TO: </label>'+
                '<select class="selectParticipator form-control select2" multiple="multiple" id="participatorList" data-placeholder="Select Participators" style="width: 100%;" required>'+
                '<option selected="selected">All Users</option>'+
                '</select>' +
                '</div>'+
                /*'<div class="form-group">'+
                '<label>CC: </label>'+
                '<input type="text" class="form-control" id="cc" value="" name="acknowledgementEmail">'+
                '</div>'+*/
                '<div class="form-group">'+
                '<label>SUBJECT: </label>'+
                '<input type="text" class="form-control" id="subject" value="" name="subject" required>'+
                '</div>'+
                '<div class="form-group">'+
                '<label>BODY: </label>'+
                '<textarea class="form-control" name="body" id="mailBody" required></textarea>' +
                '</div>'+
                /* '<div class="form-group">'+
                 ' <label>ATTACHMENTS: </label>'+
                 '<input type="hidden" id="attachmentFilePath" name="filePath" value="">'+
                 '<div class="row">'+
                   ' <div class="col-md-4"><input type="file" class="form-control" id="attachmentInputFile"></div>'+
                   ' <div class="col-sm-6"><button type="button" class="btn btn-primary" id="uploadAttachmentFile">Upload</button></div>'+
                   '</div>'+
                   '<div class="form-group" id="attachmentFileInfo"> '+
                   '</div>'+
                   '<div id="form-info" class="alert alert-info" style="display:none;">'+
                     '<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>'+
                       '<strong>Info !</strong> Click upload button before sending mail'+
                     '</div>'+
                 '</div>'+
                 '</div>'+*/
                '</div><!-- /.box-body -->'+
                '<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
                '<div class="box-footer">'+
                ' <button type="submit" class="btn bg-orange">Send</button>'+
				' <button type="button" class="btn" id="resetMailForn">Reset</button>'+
                '</div>'+
                '</form>'+
             ' </div>';

	return tmpl;
};

$.aaacplApp.notificationPage.executeScript = function(){
		var _this = this;

		var notificationForm = $('#notificationForm');

		$("#resetMailForn").click(function() {
            notificationForm[0].reset();
        });

		$.aaacplApp.getParticipatorMasterList();

		$('#notificationForm .selectParticipator').select2({
            data: $.aaacplApp.dataStorage.participatorMasterList || [],
        });

        var selectedParticipator = [];
        var emailList = $.aaacplApp.dataStorage.participatorMasterList || [];
        $.each(emailList, function(key, item) {
          selectedParticipator.push(item.text);
        });

        $("#participatorList").select2().on("change",function(e){
          selectedParticipator = $(this).select2().val() || [];
        });

        /* $("#uploadAttachmentFile").on('click',function(e){
             var file = $('#attachmentInputFile').get(0).files[0];
             if(file){
             var formData = new FormData();
             formData.append('file', file);
             $.aaacplApp.ajaxCall("POST", "files/upload?fn=logo", function success(response){
                 $("#attachmentFilePath").val(response.filePath);
                  $('#form-info').hide();
             }, function error(msg){
             }, formData,true);
             }
         });

         $("#attachmentInputFile").on('change',function(){
           var fileInfo;
                if (this.files && this.files[0]) {
                  var file = this.files[0];
                      // Present file info and append it to the list of files
                      fileInfo = "<div><strong>Name:</strong> " + file.name + "</div>";
                      fileInfo += "<div><strong>Size:</strong> " + parseInt(file.size / 1024, 10) + " kb</div>";
                      fileInfo += "<div><strong>Type:</strong> " + file.type + "</div>";
                      $('#form-info').show();
                  }
                  document.getElementById("attachmentFileInfo").innerHTML = fileInfo;
          });*/

        // on submit function of form is called to perform client side validation
         notificationForm.submit(function(event) {
                var mailContent = {};
                event.preventDefault(); // Prevent the form from submitting via the browser
                var formData = notificationForm.serializeArray(); // JSON data of values entered in form
                        $.each(formData, function(key, item) {
                            mailContent[item.name] = item.value;
                        });
                mailContent["emailTo"] =  selectedParticipator;// getting selected values
                $(".overlay").show();
                $.aaacplApp.ajaxCall("POST", 'email/bulkEmail', function success(response) {
                        $(".overlay").hide();
                        if (response.successMessage) {
                            $('#notificationForm-success').show();
                        } else {
                            $('#notificationForm-failure').show();
                            $('#notificationForm-failure .message-text').html('Unable to send mail. Please try again later.');
                        }
                    }, function error(msg) {
                        $(".overlay").hide();
                        $('#notificationForm-failure').show();
                        $('#notificationForm-failure .message-text').html('Unable to send mail. Please try again later.');
                    },
                    //POST PAYLOAD
                    JSON.stringify(mailContent));
            });
};
