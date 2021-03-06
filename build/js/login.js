$.aaacplApp.loginPage.getLayout = function (){
	//This code will be dynamic - for now it is static
	var tmpl = 
	'<div class="login-logo">'+
      '  <img src="dist/img/logo.png">'+
      '</div><!-- /.login-logo -->'+
	  '<div class="lead text-center"><i class="icon fa fa-info-circle"></i> This site is best viewed in IE9+, Chrome and FF</div>'+
      '<div class="login-box-body box">'+
	  '<!--login section-->'+
	  '<div id="login-details">'+
       ' <p class="login-box-msg">LOGIN TO GET  STARTED</p>'+
        '<form action="" method="post" id="login">'+
        '  <div class="form-group has-feedback">'+
        '    <input name="email" type="email" class="form-control" placeholder="Email" required>'+
         '   <span class="glyphicon glyphicon-envelope form-control-feedback"></span>'+
         ' </div>'+
         ' <div class="form-group has-feedback">'+
          '  <input name="password" type="password" class="form-control" placeholder="Password" required>'+
           ' <span class="glyphicon glyphicon-lock form-control-feedback"></span>'+
         ' </div>'+
          '<div class="row">'+
           ' <div class="col-xs-8">'+
            '  <!-- div class="checkbox icheck">'+
                '<label>'+
                 ' <input type="checkbox"> Remember Me'+
                '</label>'+
              '</div -->'+
            '</div><!-- /.col -->'+
            '<div class="col-xs-4">'+
            '  <button type="submit" class="btn btn-primary btn-block bg-orange btn-flat">Sign In</button>'+
            '</div><!-- /.col -->'+
          '</div>'+
        '</form>'+
        '<a href="#/forgot">Forgot password</a><br>'+
		'<br>'+
		'New Member? <a href="#/register" class="text-center">Register with us</a>'+
		'</div>'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
    ' </div><!-- /.login-box-body -->'+
	'<div class="text-muted text-center">Copyright &copy; 2016 <a href="#">A.A. Auctioneers & Contractors Pvt. Ltd.</a> All rights reserved.</div>';
	return tmpl;
};
$.aaacplApp.loginPage.executeScript = function(){
	
	var param1 = $.aaacplApp.queryParams("invalidSession");
	//console.info(param1);
	if(param1 == "1"){
		$.notify("Invalid session! Please login again.", "error");
	} 
	
	// be default hiding the error alert messages
	  
	  var loginForm = $('#login');
	  loginForm[0].reset();
	  
		
		
		// ajax call only when client side validation is completed
		function loginFormAjaxCall(loginForm){
		     var formData = loginForm.serializeArray(); // JSON data of values entered in form
			 var loginPost = {};
			 $.each(formData, function (key, item) {
				 loginPost[item.name] = item.value;
			 });
			$(".overlay").show();
			 $.aaacplApp.ajaxCall("POST", 'user/login', function success(response){
			$(".overlay").hide();
				if(response.userId > 0){
					 /**
					 * param1 - the auth key
					 * param2 - the success message from which is the authSessionId $.aaacplApp.userAuthKey
					 * param3 - cookie expire time in hours
					 */
					 $.aaacplApp.writeCookie($.aaacplApp.userAuthKey,response.successMessage,24); //cookie creation
					 $.aaacplApp.redirectTo('home');  //REDIRECT TO DASHBORAD
				 } else {
					 if(response.failureMessage && response.failureMessage != "") {
						 $.notify(response.failureMessage, "error");
						
					 } else {
						 $.notify("Invalid Login Details!", "error");
					 }
				 }
			 }, 
			 function error(msg){
$(".overlay").hide();
			 }, 
			 //POST PAYLOAD
			 JSON.stringify(loginPost));
		}
		
		// on submit function of login form is called to perform client side validation
		
		loginForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
			loginFormAjaxCall(loginForm);
		});

		
		
};