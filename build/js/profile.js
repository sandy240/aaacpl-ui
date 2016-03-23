$.aaacplApp.profilePage.getLayout = function (userInfo){
	/**
     * COMPLETE Profile Page
    **/
	var tmpl = '<div id="editProfile-success" class="alert alert-success">'+
'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
'<strong>Success !</strong> Profile has been updated.'+
'</div>'+
'<div id="editProfile-failure" class="alert alert-danger">'+
'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
'<strong>Sorry !</strong> Something went wrong. Try again '+
'</div>'+
'<div class="box box-solid manage">'+
'<div class="box-header">'+
'<ul class="nav nav-pills">'+
'<li><button class="btn bg-orange" id="updateProfile">Update Profile</button></li>'+
'<li><button class="btn" id="changePassword">Change Password</button></li>'+
'</ul>'+
'</div>'+
'<form id="editProfileForm" class="form" role="form">'+
'<div class="box-body">'+
'<div id="updateProfileSection">'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="accountInfoSection">'+
'<h3>Account Info</h3>'+
'<div id="account-type" class="form-group">'+
'Account Type <select id="editProfileType" class="form-control" required  name="typeId">'+
'</select>'+
'</div>'+
'<div class="form-group">'+
'Company name<input id="editProfileCompanyName" name="companyName" value="" type="text" class="form-control" >'+
'</div>'+
'<div class="form-group">'+
'Material Description <textarea id="editProfileMaterial" name="material" class="form-control"></textarea>'+
'</div>'+
'<div class="form-group">'+
'PAN no <input id="editProfilePan" name="panNumber" type="text" value="" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'VAT no <input id="editProfileVat" name="vatNumber" type="text" value="" class="form-control" required >'+
'</div>'+
'</div>'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="ContactInfoSection">'+
'<h3>Contact Info</h3>'+
'<div class="form-group">'+
'Username <input id="editProfileName" type="text" name="name" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Email <input id="editProfileEmail" name="email" type="email" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Phone <input id="editProfilePhone" name="phone" type="text" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Mobile <input id="editProfileMobile" name="mobile" type="text" class="form-control">'+
'</div>'+
'</div>'+
'<div class="col-sm-3 col-md-6 col-lg-4" id="addressInfoSection">'+
'<h3>Address</h3>'+
'<div class="form-group">'+
'Address <textarea id="editProfileAddress" name="address" class="form-control" required ></textarea>'+
'</div>'+
'<div class="form-group">'+
'City <input id="editProfileCity" name="city" type="text" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Pin Code <input id="editProfilePinCode" name="pin" type="text" class="form-control" required >'+
'</div>'+
'<div class="form-group">'+
'Country <input id="editProfileCountry" name="country" type="text" class="form-control" required >'+
' </div>'+
'<div class="form-group">'+
'State <input id="editProfileState" name="state" type="text" class="form-control" required >'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'<div class="box-footer">'+
'<button type="submit" class="btn btn-primary">UPDATE</button>'+
'<button type="button" id="resetEditprofileForm" class="btn">Reset</button>'+
'</div>'+
'</form>'+
'</div>';
	return tmpl;
};

$.aaacplApp.profilePage.executeScript = function(){

    $("#updateProfile").click(function(){
        $("#changePassword").removeClass("btn-primary");
        $(this).addClass("btn-primary");
        $("#changePasswordSection").hide();
        $("#updateProfileSection").show();
    });

    $("#changePassword").click(function(){
        $("#updateProfile").removeClass("btn-primary");
        $(this).addClass("btn-primary");
        $("#updateProfileSection").hide();
        $("#changePasswordSection").show();
    });

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