$.aaacplApp.manageAuction.getLayout = function (){
	
	/***
	** COMPLETE DEPARTMENT PAGE LAYOUT 
	**/
	var tmpl = '<div class="box box-solid manage">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Manage Auctions</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange" data-toggle="modal" data-target="#add-auction-form">New Department</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body" id="auction-rows-cont">'+
			'</div><!-- /.box-body -->'+
         ' </div>'+
		 
		 //Modal for adding new department
		 '<div class="modal fade" tabindex="-1" role="dialog" id="add-auction-form" aria-labelledby="model-heading">'+
          '<div class="modal-dialog" role="document">'+
           ' <div class="modal-content">'+
              '<div class="modal-header">'+
               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
               '   <span aria-hidden="true">×</span></button>'+
               ' <h4 class="modal-title" id="model-heading">New Department</h4>'+
              '</div>'+
              '<div class="modal-body">'+
              '<div class="form" role="form">'+
			 '<div class="form-group">'+
			  ' <label for="auctionInputName">Department Name</label>'+
			   ' <input type="text" class="form-control" id="auctionInputName">'+
			 '</div>'+
			 '<div class="form-group">'+
			 ' <label for="auctionInputLogoFile">Department Logo</label>'+
			   ' <input type="file" class="form-control" id="auctionInputLogoFile">'+
			 '</div>'+
			'</div>'+
              '</div>'+
              '<div class="modal-footer">'+
              '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>'+
              '  <button type="button" class="btn btn-primary">Save changes</button>'+
              '</div>'+
            '</div>'+
            '<!-- /.modal-content -->'+
          '</div>'+
          '<!-- /.modal-dialog -->'+
        '</div>';
		
	return tmpl;
};

$.aaacplApp.manageAuction.executeScript = function(){
	if($.aaacplApp.queryParams['deptid']){
		$.aaacplApp.ajaxCall("GET","auction/list/" + $.aaacplApp.queryParams['deptid'],function success(response){
			var auctionList = response.auctionResponseList;
			$.each(auctionList, function(key , value){
				
				var auctionRow = '<div class="box box-warning collapsed-box auction-row" id="ar-'+value.auctionId+'">'+
				' <div class="box-header with-border">'+
				'  <h3 class="box-title"><i class="fa fa-bank"></i>'+value.name+'</h3>'+
				 ' <div class="box-tools pull-right">'+
				  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
				  '  <button type="button" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE AUCTIONS</button>'+
				  '</div>'+
				'</div>'+
				'<div class="box-body">'+
				'<div class="form" role="form">'+
				 '<div class="form-group">'+
				  ' <label for="auctionInputName">Department Name</label>'+
				   ' <input type="text" class="form-control" id="auctionInputName" value="'+value.name+'">'+
				 '</div>'+
				 '<div class="form-group">'+
				 ' <label for="auctionInputLogoFile">Department Logo</label>'+
				   ' <input type="file" class="form-control" id="auctionInputLogoFile">'+
				 '</div>'+
				'</div>'+
				'</div>'+
				'<div class="box-footer">'+
					'  <button type="button" class="btn bg-orange">UPDATE</button>'+
				'</div>'+
			'</div>';
			 
			 $("#auction-rows-cont").append(auctionRow);
				
			});
		}, function error(msg){
			
		});
	}
	
};

     