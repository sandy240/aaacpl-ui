$.aaacplApp.registerPage.getLayout = function (){
	//This code will be dynamic - for now it is static
	var tmpl =  '<div class="register-logo">'+
        '<img src="dist/img/logo.png"/>'+
      '</div>'+
      '<div class="register-box-body">'+
	   ' <div id="register-success">'+
		'	<div class="alert alert-success">'+
		'	<strong>You have Registered successfully ! </strong>'+
		'	</div>'+
		'	<p>A verification link has been sent to your email address. Please check you mail.<br><br> Please note: You will be able to login once admin verify the other details and activate your account. You will receive a notification for the same.</p>'+
		'</div>'+
		'<div id="register-form">'+
        '<p class="login-box-msg">GET REGISTERED FOR THE MEMBERSHIP</p>'+
		'<div class="alert alert-danger" id="register-failure">'+
		'<a href="#" class="close" data-dismiss="alert" aria-label="close">&#215;</a>'+
		'  <strong>Error !</strong> <span class="message-text"></span>'+
		'</div>'+
        '<form method="post" action="" id="submit">'+
        '  <div id="account-type" class="form-group has-feedback">'+
		'	  <select id="select" class="form-control" required>'+
		'       <option value="">Select Account Type</option>'+
		'	  </select>'+
        '  </div>'+
		 ' <div class="form-group has-feedback">'+
          '  <input type="text" class="form-control" placeholder="Full name" required>'+
           ' <span class="glyphicon glyphicon-user form-control-feedback"></span>'+
          '</div>'+
          '<div class="form-group has-feedback">'+
           ' <input type="email" class="form-control" placeholder="Email" required>'+
           ' <span class="glyphicon glyphicon-envelope form-control-feedback"></span>'+
          '</div>'+
          '<div class="form-group has-feedback">'+
          '  <input type="password" class="form-control" placeholder="Password" required>'+
          '  <span class="glyphicon glyphicon-lock form-control-feedback"></span>'+
          '</div>'+
		  '<div class="form-group">'+
          '  <input type="text" class="form-control" placeholder="Company name (Optional)">'+
          '</div>'+
		  '<div class="row">'+
		'	  <div class="form-group col-sm-6">'+
		'		<input type="text" class="form-control" placeholder="PAN no." required>'+
		'	  </div>'+
		'	  <div class="form-group col-sm-6">'+
		'		<input type="text" class="form-control" placeholder="VAT no." required>'+
		'	  </div>'+
		 ' </div>'+
          '<div class="form-group">'+
           ' <textarea class="form-control" placeholder="Material Description"></textarea>'+
          '</div>'+
		  '<div class="form-group">'+
          '  <textarea class="form-control" placeholder="Address" required></textarea>'+
          '</div>'+
		  '<div class="row">'+
			'  <div class="form-group col-sm-6">'+
			'	<input type="text" class="form-control" placeholder="City" required>'+
			 ' </div>'+
			  '<div class="form-group col-sm-6">'+
				'<input type="text" class="form-control" placeholder="Pin Code" required>'+
			  '</div>'+
		  '</div>'+
		  '<div class="row">'+
			'  <div class="form-group col-sm-6">'+
			'	<input type="text" class="form-control" placeholder="Country" required>'+
			 ' </div>'+
			  '<div class="form-group col-sm-6">'+
				'<input type="text" class="form-control" placeholder="State" required>'+
			  '</div>'+
		  '</div>'+
		 ' <div class="form-group">'+
         '   <input type="text" class="form-control" placeholder="Phone" required>'+
         ' </div>'+
		 ' <div class="form-group">'+
         '   <input type="text" class="form-control" placeholder="Mobile no. (Optional)">'+
         ' </div>'+
         ' <div class="row">'+
         '   <div class="col-xs-8">'+
         '     <div class="checkbox icheck">'+
         '       <label>'+
         '         <input type="checkbox" required> I agree to the <a href="#">terms</a>'+
         '       </label>'+
         '     </div>'+
         '   </div><!-- /.col -->'+
         '   <div class="col-xs-4">'+
         '     <button type="submit" class="btn btn-primary btn-block bg-orange btn-flat">Register</button>'+
         '   </div><!-- /.col -->'+
         ' </div>'+
        '</form>'+
       ' <a href="#/login" class="text-center">Already a memeber with us?</a>'+
      '</div><!-- /.form-box -->'+
	 ' </div>';
	return tmpl;
};


$.aaacplApp.registerPage.executeScript = function(){

    // ajax call on page load which will return the user types which will be shown in the drop down list.
         $(function(){
             $.ajax({
               type: "GET",
               dataType: "json",
			   crossDomain : true,
               url: $.aaacplApp.apiSrvPath + 'user/userTypes',
               success: function(data){
               // appending option to select element
			   data = data.getTypesResponseList;
                $.each(data, function (key, item) {
                    $('#select').append($('<option>', {
                        value: item.type,
                        text : item.label
                    }));
                });
               },
                error: function() {
                $('#register-failure').show();
                $('#register-failure .message-text').html('Something went wrong. Kindly try later');
               }
            });
         });

	// be default hiding the success and error alert messages
		$('#register-success').hide();
		$('#register-failure').hide();
		var registerForm = $('#submit');
		registerForm[0].reset();
		
        $('input').iCheck({
          checkboxClass: 'icheckbox_square-orange',
          radioClass: 'iradio_square-orange',
          increaseArea: '20%' // optional
        });

		// ajax call only when client side validation is completed
		function registerFormAjaxCall(registerForm){
		var formData = JSON.stringify(registerForm.serializeArray()); // JSON data of values entered in form
			 $.ajax({
			 type: "POST",
			 url: $.aaacplApp.apiSrvPath + 'user/register', //REST API call
			 data: formData,
			 dataType: "jsonp",
			 success: function(response) {
				$('#register-success').show();
				$('#register-form').hide();
			 },
			 error: function() {
				$('#register-failure').show();
				$('#register-failure .message-text').html('Unable to register. Kindly provide correct details');
			 }
		});
		}
		
		// on submit function of form is called to perform client side validation
		
		registerForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
			registerFormAjaxCall(registerForm);
		});
};