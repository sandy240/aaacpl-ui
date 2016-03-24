$.aaacplApp.profilePage.getLayout = function (userInfo){
	/**
     * COMPLETE Profile Page
    **/
	var tmpl = '<div id="editProfile-success" class="alert alert-success" style="display:none;">'+
'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
'<strong>Success !</strong> Profile has been updated.'+
'</div>'+
'<div id="editProfile-failure" class="alert alert-danger" style="display:none;">'+
'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
'<strong>Sorry !</strong> Unable to update. Please try again later. '+
'</div>'+
'<div class="box box-solid manage">'+
'<div class="box-header">'+
'<ul class="nav nav-pills">'+
'<li><button class="btn bg-orange" id="updateProfile">Update Profile</button></li>'+
'<li><button class="btn" id="changePassword">Change Password</button></li>'+
'</ul>'+
'</div>'+
'<div id="updateProfileSection">'+
'<form id="editProfileForm" class="form" role="form">'+
'<div class="box-body">'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="accountInfoSection">'+
'<h3>Account Info</h3>'+
'<div id="account-type" class="form-group">'+
'Account Type <select id="editProfileType" class="form-control" required  name="typeId">'+
'<option value="'+userInfo.typeId+'">'+userInfo.userTypeLabel+'</option>'+
'</select>'+
'</div>'+
'<div class="form-group">'+
'<input name="id" value="'+userInfo.id+'" type="hidden" class="form-control">'+
'</div>'+
'<div class="form-group">'+
'Company name<input id="editProfileCompanyName" name="companyName" value="'+userInfo.companyName+'" type="text" class="form-control">'+
'</div>'+
'<div class="form-group">'+
'Material Description <textarea id="editProfileMaterial" name="material" class="form-control">'+userInfo.material+'</textarea>'+
'</div>'+
'<div class="form-group">'+
'PAN no <input id="editProfilePan" name="panNumber" type="text" value="'+userInfo.panNumber+'" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'VAT no <input id="editProfileVat" name="vatNumber" type="text" value="'+userInfo.vatNumber+'" class="form-control" required >'+
'</div>'+
'</div>'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="ContactInfoSection">'+
'<h3>Contact Info</h3>'+
'<div class="form-group">'+
'Username <input id="editProfileName" type="text" name="name" value="'+userInfo.name+'" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Email <input id="editProfileEmail" name="email" value="'+userInfo.email+'" type="email" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Phone <input id="editProfilePhone" name="phone" type="text" value="'+userInfo.phone+'" class="form-control">'+
'</div>'+
'<div class="form-group">'+
'Mobile <input id="editProfileMobile" name="mobile" type="text" value="'+userInfo.mobile+'" class="form-control">'+
'</div>'+
'</div>'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="addressInfoSection">'+
'<h3>Address</h3>'+
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
'<div id="changePasswordSection"style="display:none;">'+
'<form id="changePasswordForm" class="form" role="form">'+
'<div class="box-body">'+
'<div class="form-group">'+
'Old Password<input id="oldPassword" name="oldPassword" type="password" class="form-control" required>'+
'</div>'+
'<div class="form-group">'+
'New Password <input id="newPassword" name="newPassword" type="password" class="form-control" required>'+
'</div>'+
'<div class="form-group">'+
'Confirm New Password <input id="newConfirmPassword" type="password" value="" class="form-control" required >'+
'</div>'+
'</div>'+
'<div class="box-footer">'+
'<button type="submit" class="btn btn-primary">Change</button>'+
'<button type="button" id="ChangePasswordForm" class="btn" style="margin-left:4px;">Cancel</button>'+
'</div>'+
'</form>'+
'</div>'+
'</div>';
	return tmpl;
};

$.aaacplApp.profilePage.executeScript = function(){

    $("#updateProfile").click(function(){
        $("#changePassword").removeClass("bg-orange");
        $(this).addClass("bg-orange");
        $("#changePasswordSection").hide();
        $("#updateProfileSection").show();
    });

    $("#changePassword").click(function(){
        $("#updateProfile").removeClass("bg-orange");
        $(this).addClass("bg-orange");
        $("#updateProfileSection").hide();
        $("#changePasswordSection").show();
    });

    $("#resetEditprofileForm").click(function() {
        $("#editProfileForm")[0].reset();
    });

    $("#resetEditprofileForm").click(function() {
        $("#changePasswordForm")[0].reset();
    });

     $("#editProfilePan").on('invalid', function (e) {
        var regExPanNumber = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
        e.target.setCustomValidity("");
        if (!regExPanNumber.test(e.target.value)) {
             e.target.setCustomValidity('Please provide a valid PAN Number');
        }
     });

     $("#editProfileVat").on('invalid', function (e) {
        var regExVatNumber = /^[0-9]{9}$/;
        e.target.setCustomValidity("");
        if (!regExVatNumber.test(e.target.value)) {
             e.target.setCustomValidity('Please provide a valid VAT Number');
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
        $(".overlay").show();
        $.aaacplApp.ajaxCall("POST", 'user/update', function success(response){
            $(".overlay").hide();
            if(response.successMessage && response.successMessage !=""){
                $('#editProfile-success').show();
            } else {
                $('#editProfile-failure').show();
            }
        }, function error(msg){
            $(".overlay").hide();
            $('#editProfile-failure').show();
        },
        //POST PAYLOAD
        JSON.stringify(editUserPost));
    });
};