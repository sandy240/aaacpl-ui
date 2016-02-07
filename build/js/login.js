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
		function loginFormAjaxCall(){
			 $.ajax({
				 type: 'POST',
				 url: loginForm.attr("action"), //OR JSP URL
				 data: loginForm.serialize(),  
				 success: function(response) {
				 //REDIRECT TO DASHBORAD
				 //cookie creation
				 var userName = 'Neville Dsouza';  // value will be retrieved from REST API i.e response.userName
				 var expireTime = 3; // value will be retrieved from REST API i.e response.expireTime
                 writeCookie(userName,expireTime);
				},
				 error: function() {
				 $('#login-failure').show();
				 $('#login-failure .message-text').html('Invalid username or password');
				}
			});
		}
		
		// on submit function of login form is called to perform client side validation
		
		loginForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
			loginFormAjaxCall(loginForm);
		});

		function writeCookie(name,expire) {
            var expires = "";
            if (expire && !isNaN(expire)) {
                var today  = new Date();
                today.setHours(today.getHours()+ expire);
                expires =  today.toUTCString();
                    }
            document.cookie = "userName="+name+";expires=+"+expires+";path=/";
        }
		
};