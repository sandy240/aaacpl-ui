$.aaacplApp.manageLot.getLayout = function (){

	/***
	** COMPLETE LOT PAGE LAYOUT
	**/
	var tmpl = '<div id="form-success">'+
               '<div class="alert alert-success">'+
               '<strong>Lot has been created/updated successfully! </strong>'+
               '</div>'+
               '</div>'+
			   '<div id="form-failure">'+
              '<div class="alert alert-danger">'+
              '<strong>Error !</strong> <span class="message-text"></span>'+
              '</div>'+
              '</div>'+
	'<div class="box box-solid manage">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Lots</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange" data-toggle="modal" data-target="#add-lot-form">Add New Lot</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body" id="lot-rows-cont">'+
			'</div><!-- /.box-body -->'+
			'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
         ' </div>'+

		 //Modal for adding new lots
		 '<div class="modal fade" tabindex="-1" role="dialog" id="add-lot-form" aria-labelledby="model-heading">'+
          '<div class="modal-dialog" role="document">'+
           ' <div class="modal-content box">'+
              '<div class="modal-header">'+
               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
               '   <span aria-hidden="true">×</span></button>'+
               ' <h4 class="modal-title" id="model-heading">Add New Lot</h4>'+
              '</div>'+
               '<div id="createLotsFormSection">'+
			  '<form id="createLotsForm" class="form" role="form">'+
              '<div class="modal-body">'+
			 '<div class="form-group">'+
			  ' <label for="lotInputName">Lot Name</label>'+
			   ' <input type="text" class="form-control" id="lotInputName" name="name" required>'+
			 '</div>'+
			 '<!-- startBid -->'+
                 '<div class="form-group">'+
                 '<label>Start Bid</label>'+
                 '<input type="text" class="form-control" id="lotStartBid" name="startBid" required>'+
                 '</div>'+
                 '<!-- Difference Factor-->'+
                  '<div class="form-group">'+
                  '<label>Difference Factor</label>'+
                  '<input type="text" class="form-control" id="lotdifferenceFactor" name="differenceFactor" required>'+
                  '</div>'+
			 '<!-- Date and time range -->'+
                  '<div class="form-group">'+
                   ' <label>Lot start and end date:</label>'+
                   ' <div class="input-group">'+
                    '  <div class="input-group-addon">'+
                    '    <i class="fa fa-clock-o"></i>'+
                    '  </div>'+
                    '  <input type="text" class="form-control pull-right" id="lotDateRange" required>'+
                    '</div><!-- /.input group -->'+
                  '</div><!-- /.form group -->'+
                  '<!-- Description -->'+
                                    '<div class="form-group">'+
                                    '<label>Description</label>'+
                                    '<textarea class="form-control" id="lotDescription" name="description" required></textarea>'+
                                    '</div>'+
                                      '</div>'+
                                     '<!-- /.modal-body -->'+
              '<div class="modal-footer">'+
              '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>'+
              '  <button type="submit" class="btn btn-primary">Save changes</button>'+
              '</div>'+
			  '</form>'+
               '</div>'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
            '</div>'+
            '<!-- /.modal-content -->'+
          '</div>'+
          '<!-- /.modal-dialog -->'+
        '</div>';

	return tmpl;
};

$.aaacplApp.manageLot.executeScript = function(){
	var _this = this;

	// be default hiding the success and error alert messages
		$('#form-success').hide();
		$('#form-failure').hide();


	var createLotsForm = $('#createLotsForm');

	$('#add-lot-form').on('shown.bs.modal', function () {
	  createLotsForm[0].reset();
	});
	// on submit function of form is called to perform client side validation
	createLotsForm.submit(function(event){
		event.preventDefault(); // Prevent the form from submitting via the browser
		var dateRangeValue = $('#lotDateRange').val(); // getting the entire dateRange value
		var formData = createLotsForm.serializeArray(); // JSON data of values entered in form
		var lotsPost = {};
			 $.each(formData, function (key, item) {
							 lotsPost[item.name] = item.value;
						 });
			 lotsPost["auctionId"] = $.aaacplApp.queryParams('auctionTypeId');
			 lotsPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "" ;
			 lotsPost["endDate"] =  typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "" ;
			 lotsPost["createdBy"] = $.aaacplApp.getLoggedInUserId();
		$(".overlay").show();
		$.aaacplApp.ajaxCall("POST", 'lots/create', function success(response){
			$(".overlay").hide();
			$("#add-lot-form").modal('hide');
			//if(response.successMessage && response.successMessage != ""){
				$('#form-success').show();
				_this.loadLotRows();
			/*} else {
				$('#form-failure').show();
				$('#form-failure .message-text').html('Unable to create lot. Please try again.');
				}*/
			}, function error(msg){
			$(".overlay").hide();
			$("#add-lot-form").modal('hide');
			$('#form-failure').show();
			$('#form-failure .message-text').html('Unable to create auction. Please try again later.');
		},
		//POST PAYLOAD
		JSON.stringify(lotsPost));
	});



	$('#lotDateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});

	_this.loadLotRows();


};


$.aaacplApp.manageLot.loadLotRows = function(){
	if($.aaacplApp.queryParams('auctionTypeId') != ""){
		$(".overlay").show();
		//$.aaacplApp.ajaxCall("GET","lots/list/"+$.aaacplApp.queryParams('auctionTypeId'),function success(response){
		$.aaacplApp.ajaxCall("GET","lots/list/3",function success(response){
			$(".overlay").hide();
			$("#lot-rows-cont").html('');
			var lotList = response.lotsResponseList || [];
			$.each(lotList, function(key , value){

				var lotRow = '<div class="box box-default box-solid collapsed-box lot-row" id="ar-'+value.id+'">'+
				' <div class="box-header with-border">'+
				'  <h3 class="box-title">'+value.name+'</h3>'+
				 ' <div class="box-tools pull-right">'+
				  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
				  '  <button type="button" class="btn btn-box-tool" data-toggle="modal" data-target="#manageParticipator-form"><i class="fa fa-hdd-o"></i> MANAGE PARTICIPATORS</button>'+
				  '</div>'+
				'</div>'+
				'<form id="editLotForm'+value.id+'" class="form" role="form">'+
				'<div class="box-body">'+
				'<div id="editLotFormSection">'+
                   '<div id="lotEdit-success">'+
                   '<div class="alert alert-success">'+
                   '<strong>Lot has been saved successfully! </strong>'+
                   '</div>'+
                   '</div>'+
                  '<div id="lotEdit-failure">'+
                  '<div class="alert alert-danger">'+
                  '<strong>Error !</strong> <span class="message-text"></span>'+
                  '</div>'+
                  '</div>'+
				 '<div class="form-group">'+
				  ' <label for="lot'+value.id+'InputName">Lot Name</label>'+
				   ' <input type="text" name="name" class="form-control" id="lot'+value.id+'InputName" value="'+value.name+'">'+
				 '</div>'+
				 '<!-- startBid -->'+
                  '<div class="form-group">'+
                  '<label>Start Bid</label>'+
                  '<input type="text" class="form-control" id="lotStartBid" value="'+value.startBid+'" name="startBid" required>'+
                  '</div>'+
                  '<!-- Difference Factor-->'+
                   '<div class="form-group">'+
                   '<label>Difference Factor</label>'+
                   '<input type="text" class="form-control" id="lotdifferenceFactor" value="'+value.differenceFactor+'" name="differenceFactor" required>'+
                   '</div>'+
				 '<!-- Date and time range -->'+
                   '<div class="form-group">'+
                    ' <label>Lot start and end date:</label>'+
                    ' <div class="input-group">'+
                     '  <div class="input-group-addon">'+
                     '    <i class="fa fa-clock-o"></i>'+
                     '  </div>'+
                     '  <input type="text" class="form-control pull-right" id="lot'+value.id+'DateRange" value="'+value.startDate+' - '+value.endDate+'">'+
                     '  </div><!-- /.input group -->'+
                   '</div><!-- /.form group -->'+
				 '<!-- Description -->'+
                     '<div class="form-group">'+
                     '<label>Description</label>'+
                     '<textarea class="form-control" name="description" id="lot'+value.id+'InputName" value="'+value.description+'"></textarea>'+
                     '</div>'+
				'</div>'+
				'</div>'+
				'<div class="box-footer">'+
					'  <button type="submit" class="btn bg-orange">UPDATE</button>'+
					'  <button type="button" class="btn">Reset</button>'+
				'</div>'+
				'</form>'+
				 //Modal for managing participator
                		 '<div class="modal fade" tabindex="-1" role="dialog" id="manageParticipator-form" aria-labelledby="model-heading">'+
                          '<div class="modal-dialog" role="document">'+
                           ' <div class="modal-content">'+
                              '<div class="modal-header">'+
                               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                               '   <span aria-hidden="true">×</span></button>'+
                               ' <h4 class="modal-title" id="model-heading">Add participator</h4>'+
                              '</div>'+
                			  '<form class="participatorForm" role="form">'+
                              '<div class="modal-body">'+
                			 '<div class="form-group">'+
                			  ' <label for="deptInputName">Select Participator</label>'+
                			  ' <select id="selectParticipator" multiple="multiple" required></select>'+
                			 '</div>'+
                              '</div>'+
                              '<div class="modal-footer">'+
                              '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>'+
                              '  <button type="submit" class="btn btn-primary">Assign</button>'+
                              '</div>'+
                			  '</form>'+
                            '</div>'+
                            '<!-- /.modal-content -->'+
                          '</div>'+
                          '<!-- /.modal-dialog -->'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
                        '</div>';
			'</div>';

			 $("#lot-rows-cont").append(lotRow);
			 $('#lot'+value.id+'DateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});

			 var dummydata = [{ id: 0, text: 'user1' }, { id: 1, text: 'user2' }, { id: 2, text: 'user3'}];
			 $("#selectParticipator").select2({
			    data: dummydata
			 });

			 // be default hiding the success and error alert messages
                $('#lotEdit-success').hide();
                $('#lotEdit-failure').hide();

				$('#editLotForm' + value.id).submit(function(event){
					var lotID = event.target.id.replace('editLotForm','');
					event.preventDefault(); // Prevent the form from submitting via the browser
					var dateRangeValue = $('#lot'+lotID+'DateRange').val(); // getting the entire dateRange value
					var formData = $('#editLotForm' + lotID).serializeArray(); // JSON data of values entered in form
					var lotsPost = {};
						 $.each(formData, function (key, item) {
										 lotsPost[item.name] = item.value;
									 });
						 lotsPost["id"] = lotID;
						 lotsPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "" ;
						 lotsPost["endDate"] =  typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "" ;
						 lotsPost["updatedBy"] = $.aaacplApp.getLoggedInUserId();
					$(".overlay").show();
					$.aaacplApp.ajaxCall("PUT", 'lots/update', function success(response){
						$(".overlay").hide();
						if(response.successMessage && response.successMessage != ""){
							$('#lotEdit-success').show();
						} else {
							$('#lotEdit-failure').show();
							$('#lotEdit-failure .message-text').html('Unable to update lot. Please try again.');
						}
					}, function error(msg){
						$(".overlay").hide();
						$('#lotEdit-failure').show();
						$('#lotEdit-failure .message-text').html('Unable to update lot. Please try again later.');
					},
					//POST PAYLOAD
					JSON.stringify(lotsPost));
				});


			});
		}, function error(msg){
			$(".overlay").hide();
		});
	}
};
     