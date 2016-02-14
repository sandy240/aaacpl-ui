$.aaacplApp.profilePage.getLayout = function (){
	/**
     * COMPLETE Profile Page
    **/
	var tmpl =  '<div class="container">'+
                 '<h3 class="page-header">Edit Profile</h3>'+
                 '<div class="row">'+
                 '<!-- edit form column -->'+
                 '<div class="col-md-8 col-sm-6 col-xs-12 personal-info">'+
                 '<div class="alert alert-success">'+
                 '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                 '<strong>Success !</strong> Profile has been updated.'+
                 '</div>'+
                 '<div class="alert alert-danger">'+
                 '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                 '<strong>Sorry !</strong> Something went wrong. Try again '+
                 '</div>'+
                 '<form id="editProfile" method="post" action="">'+
                 '<div class="form-group has-feedback">'+
                  '<label class="col-lg-3 control-label">Type</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text" disabled>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Name</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text" required>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Company Name</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text">'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Material</label>'+
                 '<div class="col-lg-8">'+
                 '<textarea class="form-control"></textarea>'+
                 '</div>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Email</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="email" required>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">City</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text" required>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Pin Number</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text" required>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">State</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text">'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Country</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text" required>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Pan Number</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text">'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Vat Number</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text" required>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Mobile Number</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text" required>'+
                 '</div>'+
                 '</div>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-lg-3 control-label">Phone Number</label>'+
                 '<div class="col-lg-8">'+
                 '<input class="form-control" value="" type="text">'+
                 '</div>'+
                 '</div>'+
                 '<h4>Reset Password</h4>'+
                 '<div class="form-group has-feedback">'+
                 '<label class="col-md-3 control-label">Password:</label>'+
                '<div class="col-md-8">'+
                '<input class="form-control" value="" type="password">'+
                '</div>'+
                '</div>'+
                '<div class="form-group has-feedback">'+
                '<label class="col-md-3 control-label">Confirm password:</label>'+
                '<div class="col-md-8">'+
                '<input class="form-control" value="" type="password">'+
                '</div>'+
                '</div>'+
                '<div class="form-group has-feedback">'+
                '<label class="col-md-3 control-label"></label>'+
                '<div class="col-md-8">'+
                '<input class="btn btn-primary" value="Save" type="button">'+
                '<span></span>'+
                '<input class="btn btn-default" value="Reset" type="reset">'+
                '</div>'+
                '</div>'+
                '</form>'+
                '</div>'+
                '</div>'+
                '</div>';
	return tmpl;
};

$.aaacplApp.profilePage.executeScript = function(){
};