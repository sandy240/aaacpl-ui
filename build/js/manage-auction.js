$.aaacplApp.manageAuction.getLayout = function (){
	
	/***
	** COMPLETE AUCTION PAGE LAYOUT 
	**/
	var tmpl = '<div class="box box-solid manage">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Auctions</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange" data-toggle="modal" data-target="#add-auction-form">New Auction</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body" id="auction-rows-cont">'+
			'</div><!-- /.box-body -->'+
         ' </div>'+
		 
		 //Modal for adding new auctions
		 '<div class="modal fade" tabindex="-1" role="dialog" id="add-auction-form" aria-labelledby="model-heading">'+
          '<div class="modal-dialog" role="document">'+
           ' <div class="modal-content">'+
              '<div class="modal-header">'+
               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
               '   <span aria-hidden="true">×</span></button>'+
               ' <h4 class="modal-title" id="model-heading">New Auction</h4>'+
               '<div id="auctionCreate-success">'+
               '<div class="alert alert-success">'+
               '<strong>Auction has been created successfully! </strong>'+
               '</div>'+
               '</div>'+
              '<div id="auctionCreate-failure">'+
              '<div class="alert alert-danger">'+
              '<strong>Error !</strong> <span class="message-text"></span>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '<div id="createAuctionFormSection">'+
			  '<form id="createAuctionForm" class="form" role="form">'+
              '<div class="modal-body">'+
			 '<div class="form-group">'+
			  ' <label for="auctionInputName">Auction Name</label>'+
			   ' <input type="text" class="form-control" id="auctionInputName" name="name" required>'+
			 '</div>'+
			 '<!-- Date and time range -->'+
                  '<div class="form-group">'+
                   ' <label>Auction start and end date:</label>'+
                   ' <div class="input-group">'+
                    '  <div class="input-group-addon">'+
                    '    <i class="fa fa-clock-o"></i>'+
                    '  </div>'+
                    '  <input type="text" class="form-control pull-right" id="auctionDateRange" required>'+
                    '</div><!-- /.input group -->'+
                  '</div><!-- /.form group -->'+
             '<!-- Description -->'+
                  '<div class="form-group">'+
                  '<label>Description</label>'+
                  '<textarea class="form-control" id="auctionDescription" name="description" required></textarea>'+
                  '</div>'+
  	 '<!-- auction Type -->'+
                  '<div class="form-group">'+
                  '<label>Auction Type</label>'+
                    '<select id="auctiontype" class="form-control" name="auctionTypeId">'+
                    '<option value="1">Forward Auction</option>'+
                    '<option value="2">Reverse Auction</option>'+
                    '</select>'+
                  '</div>'+
     '<!-- auction Catalog -->'+
                  '<div class="form-group">'+
                  '<label>Catalog</label>'+
                  '<input type="file" id="auctionCatalog" name="catalog">'+
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

$.aaacplApp.manageAuction.executeScript = function(){

// be default hiding the success and error alert messages
		$('#auctionCreate-success').hide();
		$('#auctionCreate-failure').hide();

var createAuctionForm = $('#createAuctionForm');
        // on submit function of form is called to perform client side validation
		createAuctionForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
			createAuctionFormAjaxCall(createAuctionForm);
		});

		// ajax call only when client side validation is completed
        function createAuctionFormAjaxCall(createAuctionForm){
            var dateRangeValue = $('#auctionDateRange').val(); // getting the entire dateRange value
            var formData = createAuctionForm.serializeArray(); // JSON data of values entered in form
            var auctionPost = {};
                 $.each(formData, function (key, item) {
                                 auctionPost[item.name] = item.value;
                             });
                 auctionPost["deptId"] = $.aaacplApp.queryParams('deptid');
                 auctionPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "" ;
                 auctionPost["endDate"] =  typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "" ;
                 auctionPost["createdBy"] = $.aaacplApp.getLoggedInUserId();
            $.aaacplApp.ajaxCall("POST", 'auction/create', function success(response){
                $('#auctionCreate-success').show();
                $('#createAuctionFormSection').hide();
            }, function error(msg){
                $('#auctionCreate-failure').show();
                $('#auctionCreate-failure .message-text').html('Unable to create auction. Please provide correct details.');
            },
            //POST PAYLOAD
            JSON.stringify(auctionPost));
        }
	
	$('#auctionDateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});

	if($.aaacplApp.queryParams('deptid')){
		$.aaacplApp.ajaxCall("GET","auction/list/" + $.aaacplApp.queryParams('deptid'),function success(response){
			var auctionList = response.auctionResponseList;
			$.each(auctionList, function(key , value){
				
				var auctionRow = '<div class="box box-warning collapsed-box auction-row" id="ar-'+value.auctionId+'">'+
				' <div class="box-header with-border">'+
				'  <h3 class="box-title"><i class="fa fa-bank"></i>'+value.name+'</h3>'+
				 ' <div class="box-tools pull-right">'+
				  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
				  '  <a href="#/manage/lots?auctionid='+value.auctionId+'" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE LOTS</a>'+
				  '</div>'+
				'</div>'+
				'<div class="box-body">'+
				'<div class="form" role="form">'+
				 '<div class="form-group">'+
				  ' <label for="auction'+value.auctionId+'InputName">Auction Name</label>'+
				   ' <input type="text" class="form-control" id="auction'+value.auctionId+'InputName" value="'+value.name+'">'+
				 '</div>'+
				 '<!-- Date and time range -->'+
                  '<div class="form-group">'+
                   ' <label>Auction start and end date:</label>'+
                   ' <div class="input-group">'+
                    '  <div class="input-group-addon">'+
                    '    <i class="fa fa-clock-o"></i>'+
                    '  </div>'+
                    '  <input type="text" class="form-control pull-right" id="auction'+value.auctionId+'DateRange" value="'+value.startDate+' - '+value.endDate+'" >'+
                    '</div><!-- /.input group -->'+
                  '</div><!-- /.form group -->'+
                        '<!-- Description -->'+
                                    '<div class="form-group">'+
                                    '<label>Description</label>'+
                                    '<textarea class="form-control" id="auction'+value.auctionId+'Description" value="'+value.description+'"></textarea>'+
                                    '</div>'+
                    	 '<!-- auction Type -->'+
                                    '<div class="form-group">'+
                                    '<label>Auction Type</label>'+
                                      '<select id="auction'+value.auctionId+'Type" class="form-control">'+
                                      '<option value="1">Forward Auction</option>'+
                                      '<option value="2">Reverse Auction</option>'+
                                      '</select>'+
                                    '</div>'+
                       '<!-- auction Catalog -->'+
                                    '<div class="form-group">'+
                                    '<label>Catalog</label>'+
                                    '<input type="text" id="auction'+value.auctionId+'Catalog"  class="form-control" value="'+value.catalog+'">'+
                                    '</div>'+
				'</div>'+
				'</div>'+
				'<div class="box-footer">'+
					'  <button type="button" class="btn bg-orange">UPDATE</button>'+
				'</div>'+
			'</div>';
			 
			 $("#auction-rows-cont").append(auctionRow);
			 $('#auction'+value.auctionId+'DateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});	
			});
		}, function error(msg){
			
		});
	}
	
};

     