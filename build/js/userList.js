$.aaacplApp.usersListPage.getLayout = function() {

    /***
     ** LIST of active users. Can add/edit users
     **/

    var tmpl = '<div id="form-success" style="display:none;">' +
        '<div class="alert alert-success">' +
        '<strong>User has been added/updated successfully! </strong>' +
        '<span class="close" data-dismiss="alert" aria-label="close">&times;</span>' +
        '</div>' +
        '</div>' +
        '<div id="form-failure" style="display:none;">' +
        '<div class="alert alert-danger">' +
        '<span class="close" data-dismiss="alert" aria-label="close">&times;</span>' +
        '<strong>Error !</strong> <span class="message-text"></span>' +
        '</div>' +
        '</div>' +
        '<div class="box box-solid manage">' +
        '<div class="box-header">' +
        '<ul class="nav nav-pills">'+
            '<li><button class="btn bg-orange" id="activeUsers">Active Users</button></li>'+
            '<li><button class="btn" id="inactiveUsers">Inactive Users</button></li>'+
          '</ul>'+
        '</div>' +
        '<div class="box-body" >'+
        '<div id="activeUserList-rows-cont">'+
        '</div>'+
        '<div id="inactiveUserList-rows-cont" style="display:none;">'+
        '</div>'+
        '</div><!-- /.box-body -->' +
        '<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>' +
        ' </div>';
    return tmpl;
};

$.aaacplApp.usersListPage.executeScript = function() {
    var _this = this;
    var userInfoList = $.aaacplApp.dataStorage.userList;
    $(".overlay").show();
    // loading all active/inactive users
    _this.loadActiveUsersRows(userInfoList);
    _this.loadInactiveUsersRows(userInfoList);

    $("#activeUsers").click(function(){
        $("#inactiveUsers").removeClass("bg-orange");
        $(this).addClass("bg-orange");
        $("#inactiveUserList-rows-cont").hide();
        $("#activeUserList-rows-cont").show();
    });

    $("#inactiveUsers").click(function(){
        $("#activeUsers").removeClass("bg-orange");
        $(this).addClass("bg-orange");
        $("#activeUserList-rows-cont").hide();
        $("#inactiveUserList-rows-cont").show();
    });


};

$.aaacplApp.usersListPage.loadActiveUsersRows = function(userInfoList) {
    $("#activeUserList-rows-cont").html('');
    $.each(userInfoList, function(key, value) {
    if(value.status && value.status =="A"){
    $(".overlay").hide();
        var userRow = '<div class="box box-default box-solid collapsed-box auction-row" id="ar-' + value.id + '">' +
            ' <div class="box-header with-border">' +
            '  <h3 class="box-title">' + value.companyName + ' <small>- ' + (value.typeId == 4 ? "Observer" : (value.typeId != 1 ?  "Participator" : "Administrator")) + '</small></h3>' +
            ' <div class="box-tools pull-right">' +
            '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> Show User Details </button>' +
            '</div>' +
            '</div>' +
            '<form id="userListForm' + value.id + '" class="form" role="form">' +
            '<div class="box-body">' +
            '<div class="form-group">' +
            ' <label>Name</label>' +
            ' <input type="text" class="form-control" name="name" id="userList' + value.id + 'Name" value="' + value.name + '" required>' +
            '</div>' +
            '<!-- status -->' +
            '<div class="form-group">' +
            '<label>Status</label>' +
            '<select class="form-control" name="status" required>' +
            '<option value="A">Active</option>' +
            '<option value="I">Inactive</option>' +
            '</select>' +
            '</div>' +
            '<!-- email -->' +
            '<div class="form-group">' +
            '<label>Email</label>' +
            '<input type="email" class="form-control" name="email" id="userList' + value.id + 'email" value="' + value.email + '" required>' +
            '</div>' +
             '<!-- company -->' +
            '<div class="form-group">' +
            '<label>Company</label>' +
            '<input type="text" class="form-control" name="companyName" id="userList' + value.id + 'companyName" value="' + value.companyName + '" required>' +
            '</div>' +
            '<!-- Type -->' +
            '<!-- div class="form-group">' +
            '<label>User Type</label>' +
            ' <input type="text" class="form-control" name="typeId" id="userList' + value.id + 'Type" value="'+value.typeId+'" required>' +
            '</div -->' +
            '<!-- material -->'+
             '<div class="form-group">'+
             '<label>Material Description</label>' +
              ' <textarea class="form-control" name="material">'+value.material+'</textarea>'+
              '</div>'+
            '<!-- Mobile number -->' +
            '<div class="form-group">' +
            ' <label>Mobile Number</label>' +
            '  <input type="text" class="form-control" name="mobile" id="userList' + value.id + 'Mobile" value="' + value.mobile + '" required>' +
            '</div><!-- /.form group -->' +
            '<!-- city -->' +
            '<div class="form-group">' +
            '<label>City</label>' +
            '<input type="text" id="userList' + value.id + 'city"  name="city" class="form-control" value="' + value.city + '" required>' +
            '</div>' +
            '<!-- State -->' +
            '<div class="form-group">' +
            '<label>State</label>' +
            '<input type="text" id="userList' + value.id + 'state"  name="state" class="form-control" value="' + value.state + '" required>' +
            '</div>' +
            '<!-- country -->' +
            '<div class="form-group">' +
            '<label>Country</label>' +
            '<input type="text" id="userList' + value.id + 'country"  name="country" class="form-control" value="' + value.country + '" required>' +
            '</div>' +
            '<!-- pin code -->' +
            '<div class="form-group">' +
            '<label>pin code</label>' +
            '<input type="text" id="userList' + value.id + 'pin"  name="pin" class="form-control" value="' + value.pin + '" required>' +
            '</div>' +
            '<!-- PAN  -->' +
            '<div class="form-group">' +
            '<label>Pan Number</label>' +
            '<input type="text" id="userList' + value.id + 'pan"  name="panNumber" class="form-control" value="' + value.panNumber + '" required>' +
            '</div>' +
            '<!-- VAT -->' +
            '<div class="form-group">' +
            '<label>Vat Number</label>' +
            '<input type="text" id="userList' + value.id + 'vat"  name="vatNumber" class="form-control" value="' + value.vatNumber + '" required>' +
            '</div>' +
            '</div>' +
            '<div class="box-footer">' +
            '  <button type="submit" class="btn bg-orange">UPDATE</button>' +
            ' <button type="button" id="resetUserList' + value.id + '" class="btn">Reset</button>' +
            '</div>' +
            '</form>' +
            '</div>';

        $("#activeUserList-rows-cont").append(userRow);

        $("#resetUserList" + value.id).click(function() {
            $("#userListForm" + value.id)[0].reset();
        });

        $("#userList" + value.id + "pan").on('invalid', function (e) {
            var regExPanNumber = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
            e.target.setCustomValidity("");
            if (!regExPanNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid PAN Number');
            }
        });

         $("#userList" + value.id + "vat").on('invalid', function (e) {
            var regExVatNumber = /^[0-9]{9}$/;
            e.target.setCustomValidity("");
            if (!regExVatNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid VAT Number');
            }
         });


         $("#userList" + value.id + "Mobile").on('invalid', function (e) {
            var regExMobileNumber = /^\d{10}$/;
            e.target.setCustomValidity("");
            if (!regExMobileNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid Mobile Number');
            }
        });


        $('#userListForm' + value.id).submit(function(event) {
            var id = event.target.id.replace('userListForm', '');
            event.preventDefault(); // Prevent the form from submitting via the browser
            var formData = $('#userListForm' + id).serializeArray(); // JSON data of values entered in form
            var editUserPost = {};
            	 $.each(formData, function (key, item) {
            					 editUserPost[item.name] = item.value;
            				 });
            	 editUserPost["id"] = id;
            $(".overlay").show();
            $.aaacplApp.ajaxCall("POST", 'user/update', function success(response){
            	$(".overlay").hide();
            	if(response.successMessage && response.successMessage !=""){
            		$('#form-success').show();
            	} else {
            		$('#form-failure').show();
            		$('#form-failure .message-text').html('Unable to update user. Please try again.');
            	}
            }, function error(msg){
            	$(".overlay").hide();
            	$('#form-failure').show();
            	$('#form-failure .message-text').html('Unable to update user. Please try again later.');
            },
            //POST PAYLOAD
            JSON.stringify(editUserPost));
        });
       }
    });
};

$.aaacplApp.usersListPage.loadInactiveUsersRows = function(userInfoList) {
   $("#inactiveUserList-rows-cont").html('');
    $.each(userInfoList, function(key, value) {
    if(value.status && value.status =="I"){
    $(".overlay").hide();
        var userRow = '<div class="box box-default box-solid collapsed-box auction-row" id="ar-' + value.id + '">' +
            ' <div class="box-header with-border">' +
            '  <h3 class="box-title">' + value.companyName + ' <small>- ' + (value.typeId == 4 ? "Observer" : (value.typeId != 1 ?  "Participator" : "Administrator")) + '</small></h3>' +
            ' <div class="box-tools pull-right">' +
            '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> Show User Details </button>' +
            '</div>' +
            '</div>' +
            '<form id="userListForm' + value.id + '" class="form" role="form">' +
            '<div class="box-body">' +
            '<div class="form-group">' +
            ' <label>Name</label>' +
            ' <input type="text" class="form-control" name="name" id="userList' + value.id + 'Name" value="' + value.name + '">' +
            '</div>' +
            '<!-- status -->' +
            '<div class="form-group">' +
            '<label>Status</label>' +
            '<select class="form-control" name="status">' +
            '<option value="I">Inactive</option>' +
            '<option value="A">Active</option>' +
            '</select>' +
            '</div>' +
            '<!-- email -->' +
            '<div class="form-group">' +
            '<label>Email</label>' +
            '<input type="text" class="form-control" name="email" id="userList' + value.id + 'email" value="' + value.email + '">' +
            '</div>' +
             '<!-- company -->' +
            '<div class="form-group">' +
            '<label>Company</label>' +
            '<input type="text" class="form-control" name="companyName" id="userList' + value.id + 'companyName" value="' + value.companyName + '">' +
            '</div>' +
            '<!-- Type -->' +
            '<!-- div class="form-group">' +
            '<label>User Type</label>' +
 ' <input type="text" class="form-control" name="typeId" id="userList' + value.id + 'Type" value="'+value.typeId+'">' +
            '</div -->' +
            '<!-- material -->'+
             '<div class="form-group">'+
             '<label>Material Description</label>' +
              ' <textarea class="form-control" name="material">'+value.material+'</textarea>'+
              '</div>'+
            '<!-- Mobile number -->' +
            '<div class="form-group">' +
            ' <label>Mobile Number</label>' +
            '  <input type="text" class="form-control" name="mobile" id="userList' + value.id + 'Mobile" value="' + value.mobile + '">' +
            '</div><!-- /.form group -->' +
            '<!-- city -->' +
            '<div class="form-group">' +
            '<label>City</label>' +
            '<input type="text" id="userList' + value.id + 'city"  name="city" class="form-control" value="' + value.city + '">' +
            '</div>' +
            '<!-- State -->' +
            '<div class="form-group">' +
            '<label>State</label>' +
            '<input type="text" id="userList' + value.id + 'state"  name="state" class="form-control" value="' + value.state + '">' +
            '</div>' +
            '<!-- country -->' +
            '<div class="form-group">' +
            '<label>Country</label>' +
            '<input type="text" id="userList' + value.id + 'country"  name="country" class="form-control" value="' + value.country + '">' +
            '</div>' +
            '<!-- pin code -->' +
            '<div class="form-group">' +
            '<label>pin code</label>' +
            '<input type="text" id="userList' + value.id + 'pin"  name="pin" class="form-control" value="' + value.pin + '">' +
            '</div>' +
            '<!-- PAN  -->' +
            '<div class="form-group">' +
            '<label>Pan Number</label>' +
            '<input type="text" id="userList' + value.id + 'pan"  name="panNumber" class="form-control" value="' + value.panNumber + '">' +
            '</div>' +
            '<!-- VAT -->' +
            '<div class="form-group">' +
            '<label>Vat Number</label>' +
            '<input type="text" id="userList' + value.id + 'vat"  name="vatNumber" class="form-control" value="' + value.vatNumber + '">' +
            '</div>' +
            '</div>' +
            '<div class="box-footer">' +
            '  <button type="submit" class="btn bg-orange">UPDATE</button>' +
            ' <button type="button" id="resetUserList' + value.id + '" class="btn">Reset</button>' +
            '</div>' +
            '</form>' +
            '</div>';

        $("#inactiveUserList-rows-cont").append(userRow);

        $("#resetUserList" + value.id).click(function() {
            $("#userListForm" + value.id)[0].reset();
        });

        $("#userList" + value.id + "pan").on('invalid', function (e) {
            var regExPanNumber = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
            e.target.setCustomValidity("");
            if (!regExPanNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid PAN Number');
            }
        });

         $("#userList" + value.id + "vat").on('invalid', function (e) {
            var regExVatNumber = /^[0-9]{9}$/;
            e.target.setCustomValidity("");
            if (!regExVatNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid VAT Number');
            }
         });


         $("#userList" + value.id + "Mobile").on('invalid', function (e) {
            var regExMobileNumber = /^\d{10}$/;
            e.target.setCustomValidity("");
            if (!regExMobileNumber.test(e.target.value)) {
                 e.target.setCustomValidity('Please provide a valid Mobile Number');
            }
        });

        $('#userListForm' + value.id).submit(function(event) {
            var id = event.target.id.replace('userListForm', '');
            event.preventDefault(); // Prevent the form from submitting via the browser
            var formData = $('#userListForm' + id).serializeArray(); // JSON data of values entered in form
            var editUserPost = {};
            	 $.each(formData, function (key, item) {
            					 editUserPost[item.name] = item.value;
            				 });
            	 editUserPost["id"] = id;
            $(".overlay").show();
            $.aaacplApp.ajaxCall("POST ", 'user/update', function success(response){
            	$(".overlay").hide();
            	if(response.successMessage && response.successMessage != ""){
            		$('#form-success').show();
            	} else {
            		$('#form-failure').show();
            		$('#form-failure .message-text').html('Unable to update user. Please try again.');
            	}
            }, function error(msg){
            	$(".overlay").hide();
            	$('#form-failure').show();
            	$('#form-failure .message-text').html('Unable to update user. Please try again later.');
            },
            //POST PAYLOAD
            JSON.stringify(editUserPost));
        });
       }
    });
};