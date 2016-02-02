$.aaacplApp.forgotPage.getLayout = function (){
	//This code will be dynamic - for now it is static
	var tmpl =  '<div class="login-logo">'+
      '  <img src="dist/img/logo.png">'+
      '</div><!-- /.login-logo -->'+
      '<div class="login-box-body">'+
	  '<!--forgot password section-->'+
	  '<div id="forgotPassword-success">'+
		'	<div class="alert alert-success">'+
		'	<strong>Password reset successfully !</strong>'+
		'	</div>'+
		'	<p>Your new password has been sent to your e-mail address. <a href="#/login">Login Now</a></p>'+
	  '</div>'+
	  '<div id="forgotPassword-details">'+
	   ' <p class="login-box-msg">FORGOT PASSOWORD?</p>'+
		'<div class="alert alert-danger" id="forgot-failure">'+
		'<a href="#" class="close" data-dismiss="alert" aria-label="close">&#215;</a>'+
		 ' <strong><span class="message-text">Invalid username</span></strong>'+
		'</div>'+
		 '  <form action="" method="post" id="forgotPassword">'+
		  ' <div class="form-group has-feedback">'+
			'	<input type="email" class="form-control" placeholder="Enter email address" required>'+
		   '</div>'+
			'	<div class="row">'+
			'		<div class="col-xs-6">'+
			'		 <button type="submit" class="btn btn-primary btn-block bg-orange btn-flat">Reset Password</button>'+
			'		 </div>'+
			'	 </div>'+
		   '</form>'+
	  '</div>'+
     ' </div><!-- /.login-box-body -->';
	return tmpl;
};


$.aaacplApp.forgotPage.executeScript = function(){
	// be default hiding the error alert messages
	  $('#forgot-failure').hide();
	  $('#forgotPassword-success').hide();
	  var forgotPasswordForm = $('#forgotPassword');
        $('input').iCheck({
          checkboxClass: 'icheckbox_square-orange',
          radioClass: 'iradio_square-orange',
          increaseArea: '20%' // optional
        });
		
		
		// ajax call only when client side validation is completed
		function forgotPasswordFormFormAjaxCall(){
			 $.ajax({
				 type: 'POST',
				 url: forgotPasswordForm.attr("action"), //OR JSP URL
				 data: forgotPasswordForm.serialize(),  
				 success: function(response) {
					 $('#forgotPassword-success').show();
					 $('#forgotPassword-details').hide();
				},
				 error: function() {
					 $('#forgot-failure').show();
					 $('#forgot-failure .message-text').html('Invalid username');
				}
			});	
		}

		// on submit function of forgot password form is called to perform client side validation
		
		forgotPasswordForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
			forgotPasswordFormFormAjaxCall(forgotPasswordForm);
		});
};