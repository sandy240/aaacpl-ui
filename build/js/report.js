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
                ' <button type="button" class="btn bg-orange" id="btnSheet"><i class="fa fa-download"></i> Bid Sheet</button>'+
				' <button type="button" class="btn bg-orange"  id="btnHistory"><i class="fa fa-download"></i> Bid History</button>'+
					'&nbsp;&nbsp;<span id="lotwise-control" style="display:none">'+
						'<select></select>'+
						'<button type="button" class="btn bg-orange" id="btnLotwise"><i class="fa fa-list-ol"></i> Lotwise Bid</button>'+
					'</span>'+
                '</div>'+
                '</form>'+
             ' </div>'+
			 
              '<div class="modal fade" tabindex="-1" role="dialog" id="lotwise-reports-dialog" aria-labelledby="model-heading">'+
                   '<div class="modal-dialog">'+
                    ' <div class="modal-content">'+
                       '<div class="modal-header">'+
                        ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '   <span aria-hidden="true">×</span></button>'+
                        ' <h4 class="modal-title" id="model-heading"></h4>'+
                       '</div>'+
                       '<div class="modal-body">'+
					   '<div class="box box-solid">'+
					    '<table class="table"></table>'+
						'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
						'</div>'+
                       '</div>'+
                     '</div>'+
                     '<!-- /.modal-content -->'+
                   '</div>'+
                   '<!-- /.modal-dialog -->'+
                 '</div>';
		
	return tmpl;
};

$.aaacplApp.reportPage.downloadHistory = function(){
	var auctionId = $("#auctionIdLotReport").val();
	$('#lotWiseReportForm-success').show();
	window.open($.aaacplApp.apiSrvPath+'reports/bidHistory/'+auctionId + '/' + $.aaacplApp.getLoggedInUserId() + '/' + $.aaacplApp.getLoggedInSessionId());
}
$.aaacplApp.reportPage.downloadSheet = function(){
	var auctionId = $("#auctionIdLotReport").val();
	$('#lotWiseReportForm-success').show();
	window.open($.aaacplApp.apiSrvPath+'reports/bidSheet/'+auctionId + '/' + $.aaacplApp.getLoggedInUserId() + '/' + $.aaacplApp.getLoggedInSessionId());
}
$.aaacplApp.reportPage.renderBidHistory = function(lotId, lotName){
	var _this = this;
	$("#lotwise-reports-dialog .overlay").show();
	$("#lotwise-reports-dialog #model-heading").html("Bidhistory for lot : " + lotName);
	
	$.aaacplApp.ajaxCall("GET", 'lots/bidHistory/' + lotId,function success(response){
		var bidarr = response;	
		$("#lotwise-reports-dialog .overlay").hide();
		var bidTable = $('#lotwise-reports-dialog table');
		bidTable.html('');
		if(bidarr.length > 0){
			
			var headerTmpl = '<tr>'+
					 ' <th style="width: 10px">#</th>'+
					 ' <th>Company</th>'+
					 ' <th>Bid Time</th>'+
					 ' <th>Bid Amount</th>'+
					 ' <th>Status</th>'+
					'</tr>';
			bidTable.append(headerTmpl);

			$.each(bidarr, function(key,value){
				var isA = (typeof value.isAccepted != 'undefined' && value.isAccepted.toUpperCase()) == "ACCEPTED" ? true : false;
				var rowTmpl = '<tr>'+
						  '<td>'+(key+1)+'</td>'+
						 ' <td>'+value.companyName+'</td>'+
						 ' <td>'+value.logTime+'</td>'+
						 ' <td>'+value.bidAmt+'</td>'+
						 ' <td><span class="label label-'+ (isA ? "success" : "danger") +'">'+ (isA ? "Accepted" : "Rejected") + '</span></td>'+
						'</tr>';
				bidTable.append(rowTmpl);
			});
		} else {
			bidTable.parent().html("<h3 class='lead'>No bidder(s)</h3>");
		}
		
	}, function error(msg){
	});
};
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
		$("#btnLotwise").on('click',function(){
			var lotID = $('#lotwise-control select').val();
			var lotName = $('#lotwise-control select option:selected').text();
			$("#lotwise-reports-dialog").modal("show");
			$.aaacplApp.reportPage.renderBidHistory(lotID,lotName);
			
		});
		

        $.each(deptList, function (key, item) {
            $('#deptIdLotReport').append($('<option>', {
                value: item.id,
                text : item.name
            }));
        });

        $('#deptIdLotReport').change(function(){
			$('#lotwise-control').hide();
          $.aaacplApp.getAuctionList($(this).val());
          $('#auctionIdLotReport').empty();
          var auctionList = $.aaacplApp.dataStorage.auctionList;
                  		$.each(auctionList, function (key, item) {
                  			$('#auctionIdLotReport').append($('<option>', {
                  				value: item.auctionId,
                  				text : item.name
                  			}));
                  		});
			$.aaacplApp.reportPage.auctionSelected();
        });
		$('#auctionIdLotReport').change(function(){
			$.aaacplApp.reportPage.auctionSelected();
          
        });
};
$.aaacplApp.reportPage.auctionSelected = function(){
	$.aaacplApp.getLotList($('#auctionIdLotReport').val());
	  $('#lotwise-control select').empty();
	  var lotList = $.aaacplApp.dataStorage.lotList;
		$.each(lotList, function (key, item) {
			$('#lotwise-control select').append($('<option>', {
				value: item.id,
				text : item.name
			}));
		});
	$('#lotwise-control').show();	
};
