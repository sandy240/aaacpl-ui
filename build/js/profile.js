$.aaacplApp.profilePage.getLayout = function (){
	/**
     * COMPLETE Profile Page
    **/
	var tmpl =   '<div class="register-box-body">'+
'<!-- alert message for profile page-->'+

'<div id="editProfile-success" class="alert alert-success">'+
'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
'<strong>Success !</strong> Profile has been updated.'+
'</div>'+
'<div id="editProfile-failure" class="alert alert-danger">'+
'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
'<strong>Sorry !</strong> Something went wrong. Try again '+
'</div>'+

'<div class="row" id="editProfile-form">'+
'<div class="col-lg-4">'+
'<p class="login-box-msg">Edit Profile</p>'+
'<form method="post" action="" id="editProfileForm">'+

'Account Type <div id="account-type" class="form-group">'+
'<select id="editProfileType" class="form-control" required readonly name="type">'+
'</select>'+
'</div>'+
'<div class="form-group">'+
'Username <input id="editProfileName" type="text" name="name" class="form-control" required readonly>'+
'</div>'+


'<div class="form-group">'+
'Company name <input id="editProfileCompanyName" name="CompanyName" type="text" class="form-control" readonly>'+
'</div>'+
'<div class="form-group">'+
'Material Description <textarea id="editProfileMaterial" name="Material" class="form-control" readonly></textarea>'+
'</div>'+


'<div class="form-group">'+
'PAN no <input id="editProfilePan" name="pan" type="text" class="form-control" required readonly>'+
'</div>'+
'<div class="form-group">'+
'VAT no <input id="editProfileVat" name="vat" type="text" class="form-control" required readonly>'+
'</div>'+


'<div class="form-group">'+
'Address <textarea id="editProfileAddress" name="Address" class="form-control" required></textarea>'+
'</div>'+
'<div class="form-group">'+
'City <input id="editProfileCity" name="City" type="text" class="form-control" required>'+
' </div>'+
'<div class="form-group">'+
'Pin Code <input id="editProfilePinCode" name="PinCode" type="text" class="form-control" required>'+
'</div>'+
'<div class="form-group">'+
'Country <input id="editProfileCountry" name="Country" type="text" class="form-control" required>'+
' </div>'+
'<div class="form-group">'+
'State <input id="editProfileState" name="State" type="text" class="form-control" required>'+
'</div>'+


'<div class="form-group">'+
'Email <input id="editProfileEmail" name="Email" type="email" class="form-control" required readonly>'+
'</div>'+
'<div class="form-group">'+
'Phone <input id="editProfilePhone" name="Phone" type="text" class="form-control" required>'+
'</div>'+
'<div class="form-group">'+
'Mobile <input id="editProfileMobile" name="Mobile" type="text" class="form-control">'+
'</div>'+

'<!-- reset password will be added later '+
'<h4>Reset Password</h4>'+
'<div class="form-group">'+
'Password <input class="form-control" value="" type="password">'+
'</div>'+
'<div class="form-group">'+
'Confirm password <input class="form-control" value="" type="password">'+
'</div>'+
'-->'+



'<div class="col-xs-4">'+
'<button type="submit" class="btn btn-primary btn-block bg-orange btn-flat">Save</button>'+
'</div><!-- /.col -->'+
'<div class="col-xs-4">'+
'<input id="resetForm" type="button" value="Reset" class="btn btn-primary btn-block btn-flat">'+
'</div><!-- /.col -->'+

'</form>'+
'</div>'+
'</div>'+
'</div>'
	return tmpl;
};

$.aaacplApp.profilePage.executeScript = function(userInfo){

    // calling the userInfo function to load all the input fields with values
       loadUserInfo();

	// be default hiding the success and error alert messages
		$('#editProfile-success').hide();
		$('#editProfile-failure').hide();

    // reset the form back to default values
        $('#resetForm').click(function(){
            loadUserInfo();
        });

// setting values in input/select/textarea fields
    function loadUserInfo(){
	$('#editProfileType').append($('<option>', {
        				value: userInfo.type,
        				text : userInfo.userTypeLabel
        			}));
    $("#editProfileName").val(userInfo.name);
    $("#editProfileCompanyName").val(userInfo.companyName);
    $("#editProfileMaterial").val(userInfo.material);
    $("#editProfileVat").val(userInfo.vatNumber);
    $("#editProfilePan").val(userInfo.panNumber);
    $("#editProfileAddress").val(userInfo.address);
    $("#editProfilePinCode").val(userInfo.pin);
    $("#editProfileCity").val(userInfo.city);
    $("#editProfileState").val(userInfo.state);
    $("#editProfileCountry").val(userInfo.country);
    $("#editProfileEmail").val(userInfo.email);
    $("#editProfilePhone").val(userInfo.phone);
    $("#editProfileMobile").val(userInfo.mobile);
    }



};