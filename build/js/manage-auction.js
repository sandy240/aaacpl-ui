$.aaacplApp.manageAuction.getLayout = function (){
	
	/***
	** COMPLETE AUCTION PAGE LAYOUT 
	**/
	var tmpl = '<div id="form-success">'+
               '<div class="alert alert-success">'+
               '<strong>Auction has been created successfully! </strong>'+
               '</div>'+
               '</div>'+
			   '<div id="form-failure">'+
              '<div class="alert alert-danger">'+
              '<strong>Error !</strong> <span class="message-text"></span>'+
              '</div>'+
              '</div>'+
	'<div class="box box-solid manage">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Auctions</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange" data-toggle="modal" data-target="#add-auction-form">New Auction</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body" id="auction-rows-cont">'+
			'</div><!-- /.box-body -->'+
			'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
         ' </div>'+
		 
		 //Modal for adding new auctions
		 '<div class="modal fade" tabindex="-1" role="dialog" id="add-auction-form" aria-labelledby="model-heading">'+
          '<div class="modal-dialog" role="document">'+
           ' <div class="modal-content box">'+
              '<div class="modal-header">'+
               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
               '   <span aria-hidden="true">×</span></button>'+
               ' <h4 class="modal-title" id="model-heading">New Auction</h4>'+
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
          '</div>'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
          '</div>'+
          '<!-- /.modal-content -->'+
        '</div>'+
       '<!-- /.modal-dialog -->'+
        '</div>';
		
	return tmpl;
};

$.aaacplApp.manageAuction.executeScript = function(){

		var _this = this;
		
		// be default hiding the success and error alert messages
		$('#form-success').hide();
		$('#form-failure').hide();

		var createAuctionForm = $('#createAuctionForm');
		
		$('#add-auction-form').on('shown.bs.modal', function () {
		  createAuctionForm[0].reset();
		});
        // on submit function of form is called to perform client side validation
		createAuctionForm.submit(function(event){
			event.preventDefault(); // Prevent the form from submitting via the browser
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
				 $(".overlay").show();
            $.aaacplApp.ajaxCall("POST", 'auction/create', function success(response){
				$(".overlay").hide();
				$("#add-auction-form").modal('hide');
				if(response.successMessage && response.successMessage != ""){
					$('#form-success').show();
					_this.loadAuctionRows();
				} else {
					$('#form-failure').show();
					$('#form-failure .message-text').html('Unable to create auction. Please try again.');
				}
            }, function error(msg){
				$(".overlay").hide();
				$("#add-auction-form").modal('hide');
                $('#form-failure').show();
				$('#form-failure .message-text').html('Unable to create auction. Please try again later.');
            },
            //POST PAYLOAD
            JSON.stringify(auctionPost));
		});

	
	$('#auctionDateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});

	_this.loadAuctionRows();
	
};



$.aaacplApp.manageAuction.loadAuctionRows = function(){
	if($.aaacplApp.queryParams('deptid') != ""){
		$(".overlay").show();
		$.aaacplApp.ajaxCall("GET","auction/list/" + $.aaacplApp.queryParams('deptid'),function success(response){
			$(".overlay").hide();
			$("#auction-rows-cont").html('');
			var auctionList = response.auctionResponseList || [];
			$.each(auctionList, function(key , value){
				
				var auctionRow = '<div class="box box-default box-solid collapsed-box auction-row" id="ar-'+value.auctionId+'">'+
                                 				' <div class="box-header with-border">'+
                                 				'  <h3 class="box-title">'+value.name+'</h3>'+
                                 				 ' <div class="box-tools pull-right">'+
                                 				  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
                                 				  '  <a href="#/manage/lots?auctionid='+value.auctionId+'" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE LOTS</a>'+
                                 				  '</div>'+
                                 				'</div>'+
                                                     '<form id="editAuctionForm'+value.auctionId+'" class="form" role="form">'+
                                                     '<div class="box-body">'+
                                                    '<div id="auctionEdit-success">'+
                                                    '<div class="alert alert-success">'+
                                                    '<strong>Auction has been created successfully! </strong>'+
                                                    '</div>'+
                                                    '</div>'+
                                                   '<div id="auctionEdit-failure">'+
                                                   '<div class="alert alert-danger">'+
                                                   '<strong>Error !</strong> <span class="message-text"></span>'+
                                                   '</div>'+
                                                   '</div>'+
                                 				 '<div class="form-group">'+
                                 				  ' <label for="auction'+value.auctionId+'InputName">Auction Name</label>'+
                                 				   ' <input type="text" class="form-control" name="name" id="auction'+value.auctionId+'InputName" value="'+value.name+'">'+
                                 				 '</div>'+
                                 				 '<!-- Date and time range -->'+
                                                   '<div class="form-group">'+
                                                    ' <label>Auction start and end date:</label>'+
                                                    ' <div class="input-group">'+
                                                     '  <div class="input-group-addon">'+
                                                     '    <i class="fa fa-clock-o"></i>'+
                                                     '  </div>'+
                                                     '  <input type="text" class="form-control pull-right" id="auction'+value.auctionId+'DateRange" value="'+value.startDate.substr(0, 19)+' - '+value.endDate.substr(0, 19)+'" >'+
                                                     '</div><!-- /.input group -->'+
                                                   '</div><!-- /.form group -->'+
                                                         '<!-- Description -->'+
                                                                     '<div class="form-group">'+
                                                                     '<label>Description</label>'+
                                                                     '<textarea class="form-control" name="description" id="auction'+value.auctionId+'Description" value="'+value.description+'"></textarea>'+
                                                                     '</div>'+
                                                     	 '<!-- auction Type -->'+
                                                                     '<div class="form-group">'+
                                                                     '<label>Auction Type</label>'+
                                                                       '<select id="auction'+value.auctionId+'Type" name="auctionTypeId" class="form-control">'+
                                                                       '<option value="1">Forward Auction</option>'+
                                                                       '<option value="2">Reverse Auction</option>'+
                                                                       '</select>'+
                                                                     '</div>'+
                                                        '<!-- auction Catalog -->'+
                                                                     '<div class="form-group">'+
                                                                     '<label>Catalog</label>'+
                                                                     '<input type="text" id="auction'+value.auctionId+'Catalog"  name="catalog" class="form-control" value="'+value.catalog+'">'+
                                                                     '</div>'+
                                                                     '</div>'+
                                 				'<div class="box-footer">'+
                                 					'  <button type="submit" class="btn bg-orange">UPDATE</button>'+
                                 					 ' <button type="button" class="btn" data-dismiss="modal">Reset</button>'+
                                 				'</div>'+
                                 				 '</form>'+
                                 			'</div>';
			 
			 $("#auction-rows-cont").append(auctionRow);
			 $('#auction'+value.auctionId+'DateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});

			  $('#auctionEdit-success').hide();
              $('#auctionEdit-failure').hide();

             $('#editAuctionForm' + value.auctionId).submit(function(event){
             					var auctionId = event.target.id.replace('editAuctionForm','');
             					event.preventDefault(); // Prevent the form from submitting via the browser
             					var dateRangeValue = $('#auction'+auctionId+'DateRange').val(); // getting the entire dateRange value
             					var formData = $('#editAuctionForm' + auctionId).serializeArray(); // JSON data of values entered in form
             					var auctionPost = {};
             						 $.each(formData, function (key, item) {
             										 auctionPost[item.name] = item.value;
             									 });
             						 auctionPost["auctionTypeId"] = auctionId;
             						 auctionPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "" ;
             						 auctionPost["endDate"] =  typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "" ;
             						 auctionPost["updatedBy"] = $.aaacplApp.getLoggedInUserId();
             					$(".overlay").show();
             					$.aaacplApp.ajaxCall("PUT", 'auction/update', function success(response){
             						$(".overlay").hide();
             						if(response.successMessage && response.successMessage != ""){
             							$('#auctionEdit-success').show();
             						} else {
             							$('#auctionEdit-failure').show();
             							$('#auctionEdit-failure .message-text').html('Unable to update auction. Please try again.');
             						}
             					}, function error(msg){
             						$(".overlay").hide();
             						$('#auctionEdit-failure').show();
             						$('#auctionEdit-failure .message-text').html('Unable to update auction. Please try again later.');
             					},
             					//POST PAYLOAD
             					JSON.stringify(auctionPost));
             				});

			});
		}, function error(msg){
			$(".overlay").hide();
		});
	}
};