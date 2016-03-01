$.aaacplApp.reportPage = {}
$.aaacplApp.reportPage.getLayout = function (){
	
	/***
	** REPORT PAGE LAYOUT 
	**/
	var tmpl =
                '<div class="box box-solid">'+
                '<div class="box-header">'+
                '<div id="lotWiseReportForm-success" style="display:none;">'+
                '<div class="alert alert-success">'+
                '<strong>Report generated successfully! </strong>'+
                '<span class="close" data-dismiss="alert" aria-label="close">&times;</span>'+
                '</div>'+
                '</div>'+
                '<h4>NORMAL AUCTION DEPARTMENT WISE REPORT</h4>'+
                '</div>'+
                '<form id="lotWiseReportForm" class="form" role="form">'+
                '<div class="box-body" id="reports-cont">'+
                '<div class="form-group">'+
                '<label>SELECT DEPARTMENT</label>'+
                '<select id="deptIdLotReport" class="form-control" name="dept" required>'+
                '<option value="">Select</option>'+
                '</select>'+
                '</div>'+
                '<div class="form-group">'+
                '<label>SELECT AUCTION</label>'+
                '<select id="auctionIdLotReport" class="form-control" name="auction" required>'+
                '<option value="">Select</option>'+
                '</select>'+
                '</div>'+
                '</div><!-- /.box-body -->'+
                '<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
                '<div class="box-footer">'+
                ' <button type="button" class="btn bg-orange" id="btnSheet">Bid Sheet</button>'+
				' <button type="button" class="btn bg-orange"  id="btnHistory">Bid History</button>'+
                '</div>'+
                '</form>'+
             ' </div>';
		
	return tmpl;
};

$.aaacplApp.reportPage.downloadHistory = function(){
	var auctionId = $("#auctionIdLotReport").val();
	$('#lotWiseReportForm-success').show();
	window.open($.aaacplApp.apiSrvPath+'reports/bidSheet/'+auctionId);
}
$.aaacplApp.reportPage.downloadSheet = function(){
	var auctionId = $("#auctionIdLotReport").val();
	$('#lotWiseReportForm-success').show();
	window.open($.aaacplApp.apiSrvPath+'reports/bidHistory/'+auctionId);
}
$.aaacplApp.reportPage.executeScript = function(){
		var _this = this;
		var deptList = $.aaacplApp.dataStorage.deptList;

        // on submit function of form is called to perform client side validation
        /*$('#lotWiseReportForm').submit(function(event){
            event.preventDefault(); // Prevent the form from submitting via the browser
            var auctionId = $("#auctionIdLotReport").val();
            $('#lotWiseReportForm-success').show();
            window.open($.aaacplApp.apiSrvPath+'reports/bidSheet/'+auctionId);
        });*/
		
		$("#btnSheet").on('click',$.aaacplApp.reportPage.downloadSheet);
		$("#btnHistory").on('click',$.aaacplApp.reportPage.downloadHistory);

        $.each(deptList, function (key, item) {
            $('#deptIdLotReport').append($('<option>', {
                value: item.id,
                text : item.name
            }));
        });

        $('#deptIdLotReport').change(function(){
          $.aaacplApp.getAuctionList($(this).val());
          $('#auctionIdLotReport').empty();
          var auctionList = $.aaacplApp.dataStorage.auctionList;
                  		$.each(auctionList, function (key, item) {
                  			$('#auctionIdLotReport').append($('<option>', {
                  				value: item.auctionId,
                  				text : item.name
                  			}));
                  		});
        });
};
