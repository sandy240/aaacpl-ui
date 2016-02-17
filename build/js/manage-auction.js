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
              '</div>'+
			  '<form class="form" role="form">'+
              '<div class="modal-body">'+
			 '<div class="form-group">'+
			  ' <label for="auctionInputName">Auction Name</label>'+
			   ' <input type="text" class="form-control" id="auctionInputName" name="name">'+
			 '</div>'+
			 '<!-- Date and time range -->'+
                  '<div class="form-group">'+
                   ' <label>Auction start and end date:</label>'+
                   ' <div class="input-group">'+
                    '  <div class="input-group-addon">'+
                    '    <i class="fa fa-clock-o"></i>'+
                    '  </div>'+
                    '  <input type="text" class="form-control pull-right" id="auctionDateRange">'+
                    '</div><!-- /.input group -->'+
                  '</div><!-- /.form group -->'+
             '<!-- Description -->'+
                  '<div class="form-group">'+
                  '<label>Description</label>'+
                  '<textarea class="form-control" id="auctionDescription"></textarea>'+
                  '</div>'+
  	 '<!-- auction Type -->'+
                  '<div class="form-group">'+
                  '<label>Auction Type</label>'+
                    '<select id="auctiontype" class="form-control">'+
                    '<option value="1">Forward Auction</option>'+
                    '<option value="2">Reverse Auction</option>'+
                    '</select>'+
                  '</div>'+
     '<!-- auction Catalog -->'+
                  '<div class="form-group">'+
                  '<label>Catalog</label>'+
                  '<input type="file" id="auctionCatalog">'+
                  '</div>'+
                  '</div>'+
                  '<!-- /.modal-body -->'+
              '<div class="modal-footer">'+
              '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>'+
              '  <button type="button" class="btn btn-primary">Save changes</button>'+
              '</div>'+
			  '</form>'+
          '</div>'+
          '<!-- /.modal-content -->'+
        '</div>'+
       '<!-- /.modal-dialog -->'+
        '</div>';
		
	return tmpl;
};

$.aaacplApp.manageAuction.executeScript = function(){
	
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
                    '  <input type="text" class="form-control pull-right" id="auction'+value.auctionId+'DateRange">'+
                    '</div><!-- /.input group -->'+
                  '</div><!-- /.form group -->'+
                        '<!-- Description -->'+
                                    '<div class="form-group">'+
                                    '<label>Description</label>'+
                                    '<textarea class="form-control" id="auction'+value.auctionId+'Description" value="auction1"></textarea>'+
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
                                    '<input type="file" id="auction'+value.auctionId+'Catalog">'+
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

     