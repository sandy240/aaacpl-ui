$.aaacplApp.forgotPage.getLayout = function (){
	//This code will be dynamic - for now it is static
	var tmpl =  '<div class="login-logo">'+
      '  <img src="dist/img/logo.png">'+
      '</div><!-- /.login-logo -->'+
      '<div class="login-box-body box">'+
	  '<!--forgot password section-->'+
	  '<div id="forgotPassword-success" style="display:none;">'+
		'	<div class="alert alert-success">'+
		'	<strong>Success ! Password is sent</strong>'+
		'	</div>'+
		'	<p>Your new password has been sent to your e-mail address. <a href="#/login">Login Now</a></p>'+
	  '</div>'+
	  '<div id="forgotPassword-details">'+
	   ' <p class="login-box-msg">FORGOT PASSOWORD?</p>'+
		'<div class="alert alert-danger" id="forgot-failure" style="display:none;">'+
		'<a href="#" class="close" data-dismiss="alert" aria-label="close">&#215;</a>'+
		 ' <strong><span class="message-text">Invalid username</span></strong>'+
		'</div>'+
		 '  <form action="" method="post" id="forgotPassword">'+
		  ' <div class="form-group has-feedback">'+
			'	<input type="email" class="form-control" id="forgotPasswordField" placeholder="Enter email address" required>'+
		   '</div>'+
			'	<div class="row">'+
			'		<div class="col-xs-6">'+
			'		 <button type="submit" class="btn btn-primary btn-block bg-orange btn-flat">Reset Password</button>'+
			'		 </div>'+
			'<a href="#/login">back to login page</a>'+
			'	 </div>'+
		   '</form>'+
	  '</div>'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
     ' </div><!-- /.login-box-body -->';
	return tmpl;
};


$.aaacplApp.forgotPage.executeScript = function(){

	  var forgotPasswordForm = $('#forgotPassword');

	  forgotPasswordForm[0].reset();

        $('input').iCheck({
          checkboxClass: 'icheckbox_square-orange',
          radioClass: 'iradio_square-orange',
          increaseArea: '20%' // optional
       });

		function forgotPasswordFormFormAjaxCall(){
		    var forgotPasswordField = $("#forgotPasswordField")[0].value;
		// ajax call only when client side validation is completed
        		$(".overlay").show();
			// ajax call on page load which will return the user types which will be shown in the drop down list.
                    	 $.aaacplApp.ajaxCall("GET", 'user/forgot/'+forgotPasswordField, function success(data){
                    	 if(data.successMessage && data.successMessage != ""){
                    	  $(".overlay").hide();
                          $('#forgotPassword-success').show();
                          $('#forgotPassword-details').hide();
                    	 }else{
                    	  $(".overlay").hide();
                          $('#forgot-failure').show();
                    	 }
                    	 }, function error(msg){
                    	 $(".overlay").hide();
                         $('#forgot-failure').show();
                    	 });

		}

		// on submit function of forgot password form is called to perform client side validation
		
		forgotPasswordForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
			forgotPasswordFormFormAjaxCall();
		});
};