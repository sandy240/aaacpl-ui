$.aaacplApp.loginPage.getLayout = function (){
	//This code will be dynamic - for now it is static
	var tmpl = '<div class="login-logo">'+
      '  <img src="dist/img/logo.png">'+
      '</div><!-- /.login-logo -->'+
      '<div class="login-box-body">'+
	  '<!--login section-->'+
	  '<div id="login-details">'+
       ' <p class="login-box-msg">LOGIN TO GET STARTED</p>'+
		'<div class="alert alert-danger" id="login-failure">'+
		'<a href="#" class="close" data-dismiss="alert" aria-label="close">&#215;</a>'+
		'  <strong><span class="message-text">Invalid username or password </span></strong>'+
		'</div>'+
        '<form action="" method="post" id="login">'+
        '  <div class="form-group has-feedback">'+
        '    <input type="email" class="form-control" placeholder="Email" required>'+
         '   <span class="glyphicon glyphicon-envelope form-control-feedback"></span>'+
         ' </div>'+
         ' <div class="form-group has-feedback">'+
          '  <input type="password" class="form-control" placeholder="Password" required>'+
           ' <span class="glyphicon glyphicon-lock form-control-feedback"></span>'+
         ' </div>'+
          '<div class="row">'+
           ' <div class="col-xs-8">'+
            '  <div class="checkbox icheck">'+
                '<label>'+
                 ' <input type="checkbox"> Remember Me'+
                '</label>'+
              '</div>'+
            '</div><!-- /.col -->'+
            '<div class="col-xs-4">'+
            '  <button type="submit" class="btn btn-primary btn-block bg-orange btn-flat">Sign In</button>'+
            '</div><!-- /.col -->'+
          '</div>'+
        '</form>'+
        '<a href="#/forgot">Forgot password</a><br>'+
		'<br>'+
		'New Member? <a href="#/register" class="text-center">Register with us</a>'+
		'</div>'+
     ' </div><!-- /.login-box-body -->';
	return tmpl;
};
$.aaacplApp.loginPage.executeScript = function(){
	// be default hiding the error alert messages
	  $('#login-failure').hide();
	  var loginForm = $('#login');
	  loginForm[0].reset();
	  
        $('input').iCheck({
          checkboxClass: 'icheckbox_square-orange',
          radioClass: 'iradio_square-orange',
          increaseArea: '20%' // optional
        });
		
		
		// ajax call only when client side validation is completed
		function loginFormAjaxCall(loginForm){
		     var formData = JSON.stringify(loginForm.serializeArray()); // JSON data of values entered in form
			 $.ajax({
				 type: "POST",
                 url: $.aaacplApp.apiSrvPath + 'user/login', //REST API call
                 data: formData,
                 dataType: "jsonp",
                 success: function(response) {
                 /**
                 * param1 - the auth key
                 * param2 - the success message from which is the authSessionId $.aaacplApp.userAuthKey
                 * param3 - cookie expire time in hours
                 */
                 $.aaacplApp.writeCookie($.aaacplApp.userAuthKey,response,3); //cookie creation

                 $.aaacplApp.redirectTo('home');  //REDIRECT TO DASHBORAD
				},
				 error: function(error) {
				 $('#login-failure').show();
				 $('#login-failure .message-text').html(error);
				}
			});
		}
		
		// on submit function of login form is called to perform client side validation
		
		loginForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
			loginFormAjaxCall(loginForm);
		});

		
		
};