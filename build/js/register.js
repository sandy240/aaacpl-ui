$.aaacplApp.registerPage.getLayout = function (){
	//This code will be dynamic - for now it is static
	var tmpl =  '<div class="register-logo">'+
        '<img src="dist/img/logo.png"/>'+
      '</div>'+
      '<div class="register-box-body box">'+
	   ' <div id="register-success">'+
		'	<div class="alert alert-success">'+
		'	<strong>You have Registered successfully ! </strong>'+
		'<span class="close" data-dismiss="alert" aria-label="close">&times;</span>'+
		'	</div>'+
		'	<p>A verification link has been sent to your email address. Please check you mail.<br><br> Please note: You will be able to login once admin verify the other details and activate your account. You will receive a notification for the same.</p>'+
		'</div>'+
		'<div id="register-form">'+
        '<p class="login-box-msg">GET REGISTERED FOR THE MEMBERSHIP</p>'+
		'<div class="alert alert-danger" id="register-failure">'+
		'<span class="close" data-dismiss="alert" aria-label="close">&#215;</span>'+
		'  <strong>Error !</strong> <span class="message-text"></span>'+
		'</div>'+
        '<form method="post" action="" id="registerForm">'+
        '  <div id="account-type" class="form-group has-feedback">'+
		'	  <select id="select" class="form-control" name="typeId" required>'+
		'       <option value="">Select Account Type</option>'+
		'	  </select>'+
        '  </div>'+
		 ' <div class="form-group has-feedback">'+
          '  <input type="text" class="form-control" name="name" placeholder="Full name">'+
           ' <span class="glyphicon glyphicon-user form-control-feedback"></span>'+
          '</div>'+
          '<div class="form-group has-feedback">'+
           ' <input type="email" class="form-control" name="email" placeholder="Email" required>'+
           ' <span class="glyphicon glyphicon-envelope form-control-feedback"></span>'+
          '</div>'+
          '<div class="form-group has-feedback">'+
          '  <input type="password" class="form-control" name="password" placeholder="Password" required>'+
          '  <span class="glyphicon glyphicon-lock form-control-feedback"></span>'+
          '</div>'+
		  '<div class="form-group">'+
          '  <input type="text" class="form-control" name="companyName" placeholder="Company name" required>'+
          '</div>'+
		  '<div class="row">'+
		'	  <div class="form-group col-sm-6">'+
		'		<input type="text" class="form-control" name="panNumber" placeholder="PAN no." required>'+
		'	  </div>'+
		'	  <div class="form-group col-sm-6">'+
		'		<input type="text" name="vatNumber" class="form-control" placeholder="VAT no." required>'+
		'	  </div>'+
		 ' </div>'+
          '<div class="form-group">'+
           ' <textarea class="form-control" name="material" placeholder="Material Description"></textarea>'+
          '</div>'+
		  '<div class="form-group">'+
          '  <textarea class="form-control" name="address" placeholder="Address" required></textarea>'+
          '</div>'+
		  '<div class="row">'+
			'  <div class="form-group col-sm-6">'+
			'	<input type="text" class="form-control" name="city" placeholder="City" required>'+
			 ' </div>'+
			  '<div class="form-group col-sm-6">'+
				'<input type="text" class="form-control" name="pin" placeholder="Pin Code" required>'+
			  '</div>'+
		  '</div>'+
		  '<div class="row">'+
			'  <div class="form-group col-sm-6">'+
			'	<input type="text" class="form-control" name="country" placeholder="Country" required>'+
			 ' </div>'+
			  '<div class="form-group col-sm-6">'+
				'<input type="text" class="form-control" name="state" placeholder="State" required>'+
			  '</div>'+
		  '</div>'+
		 ' <div class="form-group">'+
         '   <input type="text" class="form-control" name="phone" placeholder="Phone (Optional)">'+
         ' </div>'+
		 ' <div class="form-group">'+
         '   <input type="text" class="form-control" name="mobile" placeholder="Mobile no" required>'+
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
      '</div><!-- /.form-box -->'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
	 ' </div>';
	return tmpl;
};


$.aaacplApp.registerPage.executeScript = function(){

    // ajax call on page load which will return the user types which will be shown in the drop down list.
	 $.aaacplApp.ajaxCall("GET", 'user/userTypes', function success(data){
		data = data.getTypesResponseList;
		$.each(data, function (key, item) {
			$('#select').append($('<option>', {
				value: item.typeId,
				text : item.label
			}));
		});
	 }, function error(msg){
	 });

	// be default hiding the success and error alert messages
		$('#register-success').hide();
		$('#register-failure').hide();
		var registerForm = $('#registerForm');

		registerForm[0].reset();
		
        $('input').iCheck({
          checkboxClass: 'icheckbox_square-orange',
          radioClass: 'iradio_square-orange',
          increaseArea: '20%' // optional
        });

		// ajax call only when client side validation is completed
		function registerFormAjaxCall(registerForm){
			var formData = registerForm.serializeArray(); // JSON data of values entered in form
			var registerPost = {};
			     $.each(formData, function (key, item) {
                				 registerPost[item.name] = item.value;
                			 });
							 $(".overlay").show();
			$.aaacplApp.ajaxCall("POST", 'user/register', function success(response){
				$(".overlay").hide();
				$('#register-success').show();
				$('#register-form').hide();
			}, function error(msg){
				$('#register-failure').show();
				$('#register-failure .message-text').html('Unable to register. Kindly provide correct details');
			},
			//POST PAYLOAD
            JSON.stringify(registerPost));
		}


        $('[name="panNumber"]').on('invalid', function (e) {
            var regExPanNumber = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
            e.target.setCustomValidity("");
            if (regExPanNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid PAN Number');
            }
        });

         $('[name="vatNumber"]').on('invalid', function (e) {
            var regExVatNumber = /^[0-9]{9}$/;
            e.target.setCustomValidity("");
            if (regExVatNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid VAT Number');
            }
         });


         $('[name="mobile"]').on('invalid', function (e) {
            var regExMobileNumber = /^\d{10}$/;
            e.target.setCustomValidity("");
            if (regExMobileNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid Mobile Number');
            }
        });

		// on submit function of form is called to perform client side validation
		
		registerForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
            registerFormAjaxCall(registerForm);
		});
};