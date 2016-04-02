$.aaacplApp.profilePage.getLayout = function (userInfo){
	/**
     * COMPLETE Profile Page
    **/
	var tmpl = '<div id="form-success" style="display:none;">'+
                              '<div class="alert alert-success">'+
                              '<span class="close" data-dismiss="alert" aria-label="close">&times;</span>'+
                              '<strong>Success !</strong> <span class="message-text"></span>'+
                              '</div>'+
                              '</div>'+
               			   '<div id="form-failure" style="display:none;">'+
                             '<div class="alert alert-danger">'+
                             '<span class="close" data-dismiss="alert" aria-label="close">&times;</span>'+
                             '<strong>Error !</strong> <span class="message-text"></span>'+
                             '</div>'+
                             '</div>'+
'<div class="box box-solid manage">'+
'<div class="box-header">'+
'<div class="nav-tabs-custom">'+
            '<ul class="nav nav-tabs">'+
              '<li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Update Profile</a></li>'+
              '<li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Change Password</a></li>'+
'</ul>'+
'</div>'+
'</div>'+
'<div class="tab-content">'+
'<div class="tab-pane active" id="tab_1">'+
'<form id="editProfileForm" class="form" role="form">'+
'<div class="box-body">'+
'<h6>Note: Fields in grey are non editable</h6>'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="accountInfoSection">'+
'<h4>Account Info</h4>'+
'<div class="form-group">'+
'Account Type <input value="'+userInfo.userTypeLabel+'" class="form-control" readonly>'+
'</div>'+
'<div class="form-group">'+
'<input name="typeId" value="'+userInfo.typeId+'" type="hidden" class="form-control">'+
'<input name="id" value="'+userInfo.id+'" type="hidden" class="form-control">'+
'</div>'+
'<div class="form-group">'+
'Company name<input id="editProfileCompanyName" name="companyName" value="'+userInfo.companyName+'" type="text" class="form-control">'+
'</div>'+
'<div class="form-group">'+
'Material Description <textarea id="editProfileMaterial" name="material" class="form-control">'+userInfo.material+'</textarea>'+
'</div>'+
'<div class="form-group">'+
'PAN no <input id="editProfilePan" name="panNumber" type="text" value="'+userInfo.panNumber+'" class="form-control" readonly>'+
'</div>'+
'<div class="form-group">'+
'VAT no <input id="editProfileVat" name="vatNumber" type="text" value="'+userInfo.vatNumber+'" class="form-control" readonly>'+
'</div>'+
'</div>'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="ContactInfoSection">'+
'<h4>Contact Info</h4>'+
'<div class="form-group">'+
'Username <input id="editProfileName" type="text" name="name" value="'+userInfo.name+'" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Email <input id="editProfileEmail" name="email" value="'+userInfo.email+'" type="email" class="form-control" readonly>'+
'</div>'+
'<div class="form-group">'+
'Phone <input id="editProfilePhone" name="phone" type="text" value="'+userInfo.phone+'" class="form-control">'+
'</div>'+
'<div class="form-group">'+
'Mobile <input id="editProfileMobile" name="mobile" type="text" value="'+userInfo.mobile+'" class="form-control">'+
'</div>'+
'</div>'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="addressInfoSection">'+
'<h4>Address</h4>'+
'<div class="form-group">'+
'Address <textarea id="editProfileAddress" name="address" class="form-control" required>'+userInfo.address+'</textarea>'+
'</div>'+
'<div class="form-group">'+
'City <input id="editProfileCity" name="city" type="text" value="'+userInfo.city+'" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Pin Code <input id="editProfilePinCode" name="pin" type="text" value="'+userInfo.pin+'" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'State <input id="editProfileState" name="state" type="text" value="'+userInfo.state+'" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Country <input id="editProfileCountry" name="country" type="text" value="'+userInfo.country+'" class="form-control" required >'+
' </div>'+
'</div>'+
'</div>'+
'<div class="box-footer">'+
'<button type="submit" class="btn btn-primary">UPDATE</button>'+
'<button type="button" id="resetEditprofileForm" class="btn" style="margin-left:4px;">Reset</button>'+
'</div>'+
'</form>'+
'</div>'+
'<div class="tab-pane" id="tab_2">'+
'<form id="changePasswordForm" class="form" role="form">'+
'<div class="box-body">'+
'<div class="form-group">'+
'<input name="userId" value="'+userInfo.id+'" type="hidden" class="form-control">'+
'</div>'+
'<div class="form-group">'+
'Old Password<input id="oldPassword" name="oldPassword" type="password" class="form-control" required>'+
'</div>'+
'<div class="form-group">'+
'New Password <input id="newPassword" name="newPassword" type="password" class="form-control" required>'+
'</div>'+
'<div class="form-group">'+
'Confirm New Password <input id="newConfirmPassword" type="password" class="form-control" required>'+
'</div>'+
'</div>'+
'<div class="box-footer">'+
'<button type="submit" class="btn btn-primary">Change</button>'+
'<button type="button" id="ChangePasswordFormReset" class="btn" style="margin-left:4px;">Cancel</button>'+
'</div>'+
'</form>'+
'</div>'+
'</div>'+
'</div>';
	return tmpl;
};

$.aaacplApp.profilePage.executeScript = function(){

        $("#resetEditprofileForm").click(function() {
            $("#editProfileForm")[0].reset();
        });

        $("#ChangePasswordFormReset").click(function() {
            $("#changePasswordForm")[0].reset();
        });


      $("#editProfilePinCode").on('invalid', function (e) {
         var regExPanNumber = /^\d{6}$/;
         e.target.setCustomValidity("");
         if (!regExPanNumber.test(e.target.value)) {
              e.target.setCustomValidity('Please provide a valid Pin code ');
         }
      });


     $("#newConfirmPassword").on('invalid', function (e) {
        var newPassword = $("#newPassword").val();
        var confirmPassword = $("#newConfirmPassword").val();
        e.target.setCustomValidity("");
        if (newPassword !== confirmPassword ) {
             e.target.setCustomValidity('New and Confirm Password does not match');
        }
    });

    $("#editProfileMobile").on('invalid', function (e) {
        var regExMobileNumber = /^\d{10}$/;
        e.target.setCustomValidity("");
        if (!regExMobileNumber.test(e.target.value)) {
             e.target.setCustomValidity('Please provide a valid Mobile Number');
        }
    });

    $('#editProfileForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser
        var formData = $('#editProfileForm').serializeArray(); // JSON data of values entered in form
        var editUserPost = {};
             $.each(formData, function (key, item) {
                             editUserPost[item.name] = item.value;
                         });
                         editUserPost["status"] = 'A';
        $(".overlay").show();
        $.aaacplApp.ajaxCall("POST", 'user/update', function success(response){
            $(".overlay").hide();
            if(response.successMessage && response.successMessage !=""){
                 $('#form-success').show();
                 $('#form-success .message-text').html('Profile has been updated.');
            } else {
                 $('#form-failure').show();
                 $('#form-failure .message-text').html('Unable to update profile. Try again later');
            }
        }, function error(msg){
            $(".overlay").hide();
            $('#form-failure').show();
            $('#form-failure .message-text').html('Unable to update profile. Try again later');
        },
        //POST PAYLOAD
        JSON.stringify(editUserPost));
    });

    $('#changePasswordForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser
        var formData = $('#changePasswordForm').serializeArray(); // JSON data of values entered in form
        var changePasswordObj = {};
             $.each(formData, function (key, item) {
                                changePasswordObj[item.name] = item.value;
             });
        $(".overlay").show();
        $.aaacplApp.ajaxCall("POST", 'user/changePassword', function success(response){
            $(".overlay").hide();
           if(response.successMessage && response.successMessage !=""){
                  $('#form-success').show();
                  $('#form-success .message-text').html('Password has been changed');
             } else {
                  $('#form-failure').show();
                  $('#form-failure .message-text').html('Unable to change password. Try again later');
             }
         }, function error(msg){
             $(".overlay").hide();
             $('#form-failure').show();
             $('#form-failure .message-text').html('Unable to change password. Try again later');
         },
        //POST PAYLOAD
        JSON.stringify(changePasswordObj));
    });

};