$.aaacplApp.manageLot.getLayout = function (){
	
	/***
	** COMPLETE LOT PAGE LAYOUT 
	**/
	var tmpl = '<div class="box box-solid manage">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Lots</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange" data-toggle="modal" data-target="#add-lot-form">Add New Lot</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body" id="lot-rows-cont">'+
			'</div><!-- /.box-body -->'+
         ' </div>'+
		 
		 //Modal for adding new lots
		 '<div class="modal fade" tabindex="-1" role="dialog" id="add-lot-form" aria-labelledby="model-heading">'+
          '<div class="modal-dialog" role="document">'+
           ' <div class="modal-content">'+
              '<div class="modal-header">'+
               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
               '   <span aria-hidden="true">×</span></button>'+
               ' <h4 class="modal-title" id="model-heading">Add New Lot</h4>'+
                  '<div id="lotsCreate-success">'+
                  '<div class="alert alert-success">'+
                  '<strong>Lots has been created successfully! </strong>'+
                  '</div>'+
                  '</div>'+
                 '<div id="lotsCreate-failure">'+
                 '<div class="alert alert-danger">'+
                 '<strong>Error !</strong> <span class="message-text"></span>'+
                 '</div>'+
                 '</div>'+
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
               '</div>'+
            '</div>'+
            '<!-- /.modal-content -->'+
          '</div>'+
          '<!-- /.modal-dialog -->'+
        '</div>';
		
	return tmpl;
};

$.aaacplApp.manageLot.executeScript = function(){


// be default hiding the success and error alert messages
		$('#lotsCreate-success').hide();
		$('#lotsCreate-failure').hide();

var createLotsForm = $('#createLotsForm');
        // on submit function of form is called to perform client side validation
		createLotsForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
			createLotsFormAjaxCall(createLotsForm);
		});

		// ajax call only when client side validation is completed
        function createLotsFormAjaxCall(createAuctionForm){
            var dateRangeValue = $('#lotDateRange').val(); // getting the entire dateRange value
            var formData = createLotsForm.serializeArray(); // JSON data of values entered in form
            var lotsPost = {};
                 $.each(formData, function (key, item) {
                                 lotsPost[item.name] = item.value;
                             });
                 lotsPost["auctionId"] = $.aaacplApp.queryParams('auctionid');
                 lotsPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "" ;
                 lotsPost["endDate"] =  typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "" ;
                 lotsPost["createdBy"] = $.aaacplApp.getLoggedInUserId();
            $.aaacplApp.ajaxCall("POST", 'lots/create', function success(response){
                $('#lotsCreate-success').show();
                $('#createLotsFormSection').hide();
            }, function error(msg){
                $('#lotsCreate-failure').show();
                $('#lotsCreate-failure .message-text').html('Unable to create lots. Please provide correct details.');
            },
            //POST PAYLOAD
            JSON.stringify(lotsPost));
        }
	
	$('#lotDateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});	
	if($.aaacplApp.queryParams('auctionid')){
		$.aaacplApp.ajaxCall("GET","lots/list/"+$.aaacplApp.queryParams('auctionid'),function success(response){
			var lotList = response.lotsResponseList || [];
			$.each(lotList, function(key , value){
				
				var lotRow = '<div class="box box-warning collapsed-box lot-row" id="ar-'+value.id+'">'+
				' <div class="box-header with-border">'+
				'  <h3 class="box-title"><i class="fa fa-bank"></i>'+value.name+'</h3>'+
				 ' <div class="box-tools pull-right">'+
				  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
				  '  <button type="button" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE PARTICIPATORS</a>'+
				  '</div>'+
				'</div>'+
				'<div class="box-body">'+
				'<div id="editLotFormSection">'+
                   '<form id="editLotForm" class="form" role="form">'+
                   '<div id="lotEdit-success" style="display:none;">'+
                   '<div class="alert alert-success">'+
                   '<strong>Auction has been created successfully! </strong>'+
                   '</div>'+
                   '</div>'+
                  '<div id="LotEdit-failure" style="display:none;">'+
                  '<div class="alert alert-danger">'+
                  '<strong>Error !</strong> <span class="message-text"></span>'+
                  '</div>'+
                  '</div>'+
				 '<div class="form-group">'+
				  ' <label for="lot'+value.id+'InputName">Lot Name</label>'+
				   ' <input type="text" class="form-control" id="lot'+value.id+'InputName" value="'+value.name+'">'+
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
                  '</form>'+
				'</div>'+
				'</div>'+
				'<div class="box-footer">'+
					'  <button type="button" class="btn bg-orange">UPDATE</button>'+
				'</div>'+
			'</div>';
			 
			 $("#lot-rows-cont").append(lotRow);
			 $('#lot'+value.id+'DateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});	
			});
		}, function error(msg){

		});
	}
	
};

     