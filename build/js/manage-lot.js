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
              '</div>'+
			  '<form class="form" role="form">'+
              '<div class="modal-body">'+
			 '<div class="form-group">'+
			  ' <label for="lotInputName">Lot Name</label>'+
			   ' <input type="text" class="form-control" id="lotInputName" name="name">'+
			 '</div>'+
			 '<!-- Date and time range -->'+
                  '<div class="form-group">'+
                   ' <label>Lot start and end date:</label>'+
                   ' <div class="input-group">'+
                    '  <div class="input-group-addon">'+
                    '    <i class="fa fa-clock-o"></i>'+
                    '  </div>'+
                    '  <input type="text" class="form-control pull-right" id="lotDateRange">'+
                    '</div><!-- /.input group -->'+
                  '</div><!-- /.form group -->'+			 
              '</div>'+
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

$.aaacplApp.manageLot.executeScript = function(){
	
	$('#lotDateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});	
	if($.aaacplApp.queryParams('auctionid')){
		$.aaacplApp.ajaxCall("GET","lot/list/" + $.aaacplApp.queryParams('auctionid'),function success(response){
			var lotList = response.lotResponseList;
			$.each(lotList, function(key , value){
				
				var lotRow = '<div class="box box-warning collapsed-box lot-row" id="ar-'+value.lotId+'">'+
				' <div class="box-header with-border">'+
				'  <h3 class="box-title"><i class="fa fa-bank"></i>'+value.name+'</h3>'+
				 ' <div class="box-tools pull-right">'+
				  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
				  '  <a href="#/manage/lots?lotid='+value.lotId+'" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE PARTICIPATORS</a>'+
				  '</div>'+
				'</div>'+
				'<div class="box-body">'+
				'<div class="form" role="form">'+
				 '<div class="form-group">'+
				  ' <label for="lot'+value.lotId+'InputName">Lot Name</label>'+
				   ' <input type="text" class="form-control" id="lot'+value.lotId+'InputName" value="'+value.name+'">'+
				 '</div>'+
				 '<!-- Date and time range -->'+
                  '<div class="form-group">'+
                   ' <label>Lot start and end date:</label>'+
                   ' <div class="input-group">'+
                    '  <div class="input-group-addon">'+
                    '    <i class="fa fa-clock-o"></i>'+
                    '  </div>'+
                    '  <input type="text" class="form-control pull-right" id="lot'+value.lotId+'DateRange">'+
                    '</div><!-- /.input group -->'+
                  '</div><!-- /.form group -->'+
				'</div>'+
				'</div>'+
				'<div class="box-footer">'+
					'  <button type="button" class="btn bg-orange">UPDATE</button>'+
				'</div>'+
			'</div>';
			 
			 $("#lot-rows-cont").append(lotRow);
			 $('#lot'+value.lotId+'DateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD hh:mm:ss'});	
			});
		}, function error(msg){
			
		});
	}
	
};

     