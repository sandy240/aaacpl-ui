
$.aaacplApp.livePage.tickCntr = 0;
	$.aaacplApp.livePage.timeintervalArr = [];
	$.aaacplApp.livePage.auctionStartTime = "";
	$.aaacplApp.livePage.auctionType = 1;
	$.aaacplApp.livePage.auctionAutoBidLimit = 0;
	$.aaacplApp.livePage.ipAddress = '';
	$.aaacplApp.livePage.currentLotId = 0;
	$.aaacplApp.livePage.timeEndedLotId = -1;
	$.aaacplApp.livePage.currentLotIndex = 0;
	$.aaacplApp.livePage.userStatusList = [];
$.aaacplApp.livePage.getLayout = function (){
	
	/***
	** LIVE LOTS IN AUCTIONS - this page is view by both participator and observer 
	**/
	
	var tmpl = 
				'<div class="modal fade" tabindex="-1" role="dialog" id="message-dialog" aria-labelledby="model-heading">'+
                   '<div class="modal-dialog">'+
                    ' <div class="modal-content">'+
                       '<div class="modal-header">'+
                        ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '   <span aria-hidden="true">×</span></button>'+
                        ' <h4 class="modal-title" id="model-heading">Message</h4>'+
                       '</div>'+
                       '<div class="modal-body">'+
                       '</div>'+
                       '<div class="modal-footer">'+
                       '  <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>'+
                       '</div>'+
                     '</div>'+
                     '<!-- /.modal-content -->'+
                   '</div>'+
                   '<!-- /.modal-dialog -->'+
                 '</div>'+
			 '<div class="media" id="auc-info">'+
				  '<div class="media-body">'+
					  '<h3 class="media-heading" id="auction-name"></h3>'+
					  '<h4 id="dept-name"> <span></span></h4>'+
				  '</div>'+
			'</div>'+
	
				 
			//Lots consolidated list 
		 ' <div class="box" id="lots-toc" style="display:none">'+
                '<div class="box-header">'+
                  '<h3 class="box-title">Lots available to participate</h3>'+
                  '<div class="box-tools">'+
                    
                 ' </div>'+
                '</div><!-- /.box-header -->'+
                '<div class="box-body no-padding">'+
               ' </div><!-- /.box-body -->'+
              '</div><!-- /.box -->'+
			  
			  
			  //Modal for excessive bidding
				'<div class="modal fade" tabindex="-1" role="dialog" id="excess-bid-dialog" aria-labelledby="model-heading">' +
				'<div class="modal-dialog" role="document">' +
				' <div class="modal-content box">' +
				'<div class="modal-header">' +
				' <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
				'   <span aria-hidden="true">×</span></button>' +
				' <h4 class="modal-title" id="model-heading">Caution! Too high bid</h4>' +
				'</div>' +
				'<div class="modal-body">' +
				'Your bid amount is too high or unrealistic! Are you sure you want to bid this amount?'+
				'</div>' +
				'<!-- /.modal-body -->' +
				'<div class="modal-footer">' +
				'  <button type="button" class="btn bg-orange" id="btnExcessBid">Yes</button>' +
				'  <button type="button" class="btn" data-dismiss="modal">Cancel</button>' +
				'</div>' +
				'</div>' +
				'<!-- /.modal-content -->' +
				'</div>' +
				'<!-- /.modal-dialog -->' +
				'</div>'+		  
			  
			  
			  
			  
			  '<div class="modal fade" tabindex="-1" role="dialog" id="online-users-dialog" aria-labelledby="model-heading">'+
                   '<div class="modal-dialog">'+
                    ' <div class="modal-content">'+
                       '<div class="modal-header">'+
                        ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '   <span aria-hidden="true">×</span></button>'+
                        ' <h4 class="modal-title" id="model-heading">Logged In Participators</h4>'+
                       '</div>'+
                       '<div class="modal-body">'+
					   '<div class="box box-solid">'+
					    '<ul class="list-group">'+'</ul>'+
						'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
						'</div>'+
                       '</div>'+
                     '</div>'+
                     '<!-- /.modal-content -->'+
                   '</div>'+
                   '<!-- /.modal-dialog -->'+
                 '</div>'+
				 '<div id="premessage"></div>'+
	'<div class="" id="lots-cont">'+
		'<div id="live-auction-lots">Checking.. please wait..</div>'+
		'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
	'</div>';
	return tmpl;
};

$.aaacplApp.livePage.getLots = function(lotDetail){
	var  bidInputtmpl = '<div class="input-group">'+
              '  <input type="text" class="form-control bidinput"  placeholder="Place bid here!">'+
              '     <span class="input-group-btn">'+
              '      <button type="button" class="btn bg-orange btn-flat bidbtn">Bid Now</button>'+
              '   </span>'+
              '</div>';
	var autoBidCtrl = '<span class="badge">Auto Bid <input type="checkbox" class="autoBidMode"/></span><span class="autoBidLimitCnt">'+$.aaacplApp.livePage.auctionAutoBidLimit+'</span> left';
	if($.aaacplApp.dataStorage.userInfo.typeId != 3){
			bidInputtmpl = "";
	}
	if($.aaacplApp.livePage.auctionAutoBidLimit==0 || $.aaacplApp.dataStorage.userInfo.typeId != 3){
		autoBidCtrl = "";
	}
	var printButtons = ($.aaacplApp.dataStorage.userInfo.typeId != 3) ? '<button type="button" class="btn btn-flat bg-orange btnPrintHistory"><i class="fa fa-print"></i> Print</button> <button type="button" id="userLogged'+lotDetail.id+'" class="btn btn-flat bg-orange user-loggedin"><i class="fa fa-group"></i> Bidders</a>' : '';
	var tmpl = '<div class="box box-default live-lot" id="lot'+lotDetail.id+'" style="display:none">'+
             '<div class="box-header with-border">'+
			 '<p class="lead nextInfo">COMING UP NEXT</p>'+
               '<h3 class="box-title"><strong>'+lotDetail.name+'</strong> <small>'+ lotDetail.description+'</small></h3>'+
			   '<div class="box-tools pull-right" style="display:none">'+
			   printButtons +
			   '</div>'+
            '</div>'+
            '<div class="box-body">'+
			' <div class="row">'+
        '<div class="col-lg-5 col-md-6 col-xs-12">'+
         ' <div class="info-box bg-aqua">'+
          '  <span class="info-box-icon"><i class="fa fa-info-circle"></i></span>'+
           ' <div class="info-box-content">'+
		    '<div class="col-xs-12">'+
		    '<div class="col-xs-6">'+
            '  <span class="info-box-text">Start bid</span>'+
             ' <span class="info-box-number"><i class="fa fa-inr"></i><span class="sbid">'+lotDetail.startBid+'</span></span>'+
			 '</div>'+
			 '<div class="col-xs-6">'+
            '  <span class="info-box-text">Increment</span>'+
             ' <span class="info-box-number"><i class="fa fa-inr"></i><span class="incr">'+lotDetail.differenceFactor+'</span></span>'+
			 '</div>'+
			 '</div>'+
			 
			 '<div class="col-xs-12">'+
			 '<div class="col-xs-12 timing"><i class="fa fa-clock-o"></i> '+lotDetail.startDate.split(' ')[1]+' - '+lotDetail.endDate.split(' ')[1]+'</div>'+
			 '</div>'+
            '</div>'+
            '<!-- /.info-box-content -->'+
          '</div>'+
          '<!-- /.info-box -->'+
        '</div>'+
        '<!-- /.col -->'+
		
		
		 '<div class="col-lg-3 col-md-6 col-xs-12 timerarea" style="display:none">'+
         ' <div class="info-box bg-yellow">'+
          '  <span class="info-box-icon"><i class="fa fa-hourglass-half"></i></span>'+
           ' <div class="info-box-content">'+
			'<div class="clocktimer"><div>TIME REMAINNING</div><div class="countdown">00:00:00</div></div>'+
            '</div>'+
           ' <!-- /.info-box-content -->'+
          '</div>'+
          '<!-- /.info-box -->'+
        '</div>'+
        '<!-- /.col -->'+
		
        '<div class="col-lg-4 col-xs-12 bidarea" style="display:none">'+
         ' <div class="info-box bg-red box box-solid">'+
          '  <span class="info-box-icon"><i class="fa fa-thumbs-o-down"></i></span>'+
           ' <div class="info-box-content">'+
		   
		   '  <span class="info-box-text">Top Bid '+ autoBidCtrl +'</span>'+
		   
            '  <span class="info-box-number"><i class="fa fa-inr"></i><span class="hbid">0</span></span>'+
            bidInputtmpl +
			  
            '</div>'+
            '<!-- /.info-box-content -->'+
			'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
          '</div>'+
          '<!-- /.info-box -->'+
        '</div>'+
        '<!-- /.col -->'+
      '</div>'+
			'</div><!-- /.box-body -->'+
			'<div class="box-footer" style="display:none" >' +
			
			//Bid history 
		 ' <div class="box bid-history" >'+
                '<div class="box-header">'+
                  '<h3 class="box-title">Bid History</h3>'+
                  '<div class="box-tools pull-right">'+
              '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
               ' </button>'+
                 ' </div>'+
                '</div><!-- /.box-header -->'+
                '<div class="box-body no-padding">'+
                 
               ' </div><!-- /.box-body -->'+
              '</div><!-- /.box -->'+
			  
			'</div><!-- /.box-footer -->'+
         ' </div>';
		 
	return tmpl;
};

$.aaacplApp.livePage.updateLot = function(){
	var _this = $.aaacplApp.livePage;
	var lotElem = $("#lot" + _this.currentLotId);
	if(_this.currentLotId!=-1){
		var request = JSON.stringify({lotid: _this.currentLotId, currentBidMax : lotElem.find(".hbid").html()});
		$.aaacplApp.ajaxCall("POST", 'lots/status',function success(response){
			$("#lots-cont > .overlay").hide();
			var lotElem = $("#lot" + _this.currentLotId);
			var lotData = _this.getLotData(_this.currentLotId);
			
			_this.updateColorSignal(response, _this.currentLotId, lotElem);
			
			//Fix if current server time is not available
			if(response.currentServerTime == ""){
				response.currentServerTime = _this.formatDateTime(new Date())
			}
			
			//Update higgest bid
			$("#lot" + _this.currentLotId + " .hbid").html(response.highestBid);
			
			//Table of content of lots at the START OF AUCTION
			if(_this.lotsData.length > 0){
				var aStartTime = _this.mysqlTimeStampToDate(_this.auctionStartTime).getTime();
				var aEndTime = aStartTime + (30 * 60 * 1000);
				var curTime = _this.mysqlTimeStampToDate(response.currentServerTime).getTime();
				var fLotStartTime = _this.mysqlTimeStampToDate(_this.lotsData[0].startDate).getTime();
				if(aEndTime >= fLotStartTime){
					aEndTime = fLotStartTime;
				}
				
				if(curTime >= aStartTime) {
					$("#premessage").html("");
					$("#premessage").hide();
					if(curTime < aEndTime){
						$("#lots-toc").show();
						$("#lots-cont").hide();
					} else {
						$("#lots-toc").hide();
						$("#lots-cont").show();
					}
				} else if($("#premessage").html() == ""){
					$("#lots-toc").hide();
					$("#lots-cont").hide();
					$("#premessage").show();
					$("#premessage").html("Auction not started yet.");
				}
			}
			
			if(typeof _this.timeintervalArr[_this.currentLotId] == 'undefined'){
				_this.updateClock(_this.currentLotId, response.currentServerTime, lotData.startDate, lotData.endDate);
			}
			_this.autoBidProcess(response, lotElem, lotData);
			//AFTER TIMEOUT OF CURRENT LOTS
			if(_this.timeEndedLotId==_this.currentLotId){
				
				_this.updateFinalState(response, _this.currentLotId, lotElem);
				_this.reupdateLotContent(_this.currentLotId, lotElem);
				
				_this.currentLotIndex++;
				if(_this.currentLotIndex < _this.lotsData.length){
					_this.currentLotId = _this.lotsData[_this.currentLotIndex].id;
				} else {
					_this.currentLotId = -1;
				}
				_this.timeEndedLotId = -1;
			}
			
			if(window.location.href.indexOf($.aaacplApp.template["live"]) >= 0)
			setTimeout(_this.updateLot,800);
		}, function error(msg){
		},request);
	}
};
$.aaacplApp.livePage.autoBidProcess = function(response, lotElem, lotData){
	
	var _this = $.aaacplApp.livePage;
	var autoBidCnt = parseInt(response.autoBidCount.toString());
	var autoBidLimit = parseInt($.aaacplApp.livePage.auctionAutoBidLimit.toString());
	var autoBidBal = autoBidLimit - autoBidCnt;
	if(lotElem.find(".autoBidMode").is(":checked") ){
		if(response.highestBid > 0 && response.higestBidUser != $.aaacplApp.getLoggedInUserId() && autoBidBal>0){
			lotElem.find(".bidinput").val( response.highestBid + lotData.differenceFactor );
			_this.processBidding();
		}
		
	}
	
	if(autoBidBal.toString() != lotElem.find('.autoBidLimitCnt').html()){
		lotElem.find('.autoBidLimitCnt').html(autoBidBal);
	}
}
$.aaacplApp.livePage.updateColorSignal = function(response, _lotID, lotElem){
	var _this = this;
	if($.aaacplApp.dataStorage.userInfo.typeId != 3){
		if(parseInt(response.highestBid) > 0){
			lotElem.find('.bidarea .info-box').removeClass('bg-red').addClass('bg-green');
			lotElem.find('.bidarea .info-box-icon .fa').removeClass('fa-thumbs-o-down').addClass('fa-thumbs-o-up');
		}
		if(response.highestBid != lotElem.find(".hbid").html()){
			_this.renderBidHistory(_lotID);
		}
	} else {
		if(response.higestBidUser == $.aaacplApp.getLoggedInUserId()){
			lotElem.find('.bidarea .info-box').removeClass('bg-red').addClass('bg-green');
			lotElem.find('.bidarea .info-box-icon .fa').removeClass('fa-thumbs-o-down').addClass('fa-thumbs-o-up');
		} else {
			lotElem.find('.bidarea .info-box').removeClass('bg-green').addClass('bg-red');
			lotElem.find('.bidarea .info-box-icon .fa').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-o-down');
		}
	}
}

$.aaacplApp.livePage.updateFinalState = function(response, _lotId, lotElem){
	
	var _this = this;
	var statusbidMsg = '';
	var lotData = _this.getLotData(_this.currentLotId);
	if(parseInt(response.highestBid) > 0){
		if (lotElem.find('.bidarea .info-box').hasClass('bg-green')) {
			statusbidMsg = "You are top bidder! <small>(Subject To Confirmation)</small>";
		}
		if($.aaacplApp.dataStorage.userInfo.typeId != 3){
			_this.renderBidHistory(_lotId);
		}
	} else {
		statusbidMsg = 'No Bidder(s)';
	}
	
	lotElem.find('.bidarea .input-group').html(statusbidMsg);
	
	if($.aaacplApp.dataStorage.userInfo.typeId != 3){
		_this.renderBidHistory(_lotId);
	}
	
	
};

$.aaacplApp.livePage.reupdateLotContent = function(_lotId, lotElem){
	var _this = this;
	lotElem.find(".overlay").show();
	setTimeout(function(){
		var request = JSON.stringify({lotid: _lotId, currentBidMax : lotElem.find(".hbid").html()});
		$.aaacplApp.ajaxCall("POST", 'lots/status',function success(response){
			lotElem.find(".overlay").hide();
			var lotData = _this.getLotData(_lotId);
			_this.updateColorSignal(response, _lotId, lotElem);
			_this.updateFinalState(response, _lotId, lotElem);
			_this.autoBidProcess(response, lotElem, lotData);
		}, function error(msg){
		},request);
	},2000);
};

$.aaacplApp.livePage.renderBidHistory = function(forLotID){
	var _this = this;
	
	$.aaacplApp.ajaxCall("GET", 'lots/bidHistory/' + forLotID + '/0',function success(response){
		var bidarr = response;	
		if(bidarr.length > 0 && $.aaacplApp.dataStorage.userInfo.typeId != 3){
			var bidHistorySec = $("#lot" + forLotID + " .box-footer");
			var bidHistoryBody = bidHistorySec.find('.box-body')
			bidHistorySec.show();
			bidHistoryBody.html('');
			var bidTable = $('<table class="table"></table>');
			bidHistoryBody.append(bidTable);
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
		}
		
	}, function error(msg){
	});
};
$.aaacplApp.livePage.getLotData = function(id){
	var _this = this;
	for(var i in _this.lotsData){
		if(_this.lotsData[i].id == id)
		return _this.lotsData[i];
	}
	
};
$.aaacplApp.livePage.executeScript = function(){
	var _this = this;
	$.ajax({
		url: 'https://api.ipify.org/?format=json',
		success: function(data) {
		  $.aaacplApp.livePage.ipAddress = data.ip;
		},
		type: 'GET'
		});
		
		if($.aaacplApp.dataStorage.userInfo.typeId != 3){
			$(".bidarea .input-group").hide();
		}
		
	if($.aaacplApp.queryParams('auctionid')!=""){
		$.aaacplApp.ajaxCall("GET","auction/auctionInfo/" + $.aaacplApp.queryParams('auctionid'), function success(response){
			$.aaacplApp.livePage.auctionStartTime = response.startDate;
			$.aaacplApp.livePage.auctionType = response.auctionTypeId;
			$.aaacplApp.livePage.auctionAutoBidLimit = response.autoBidLimit;
			$("#auction-name").html(response.name);
			var deptInfo = $.aaacplApp.getDeptInfoById(response.deptId);
			
			_this.loadLots();
			$("#dept-name").html(deptInfo.name);
			if(deptInfo.logoPath!=null && deptInfo.logoPath!="" && deptInfo.logoPath!="null"){
				var logoPath = $.aaacplApp.uploadPath + deptInfo.logoPath;
				var imgLogo = '<div class="media-left">'+
							' <a href="#">'+
							'  <img class="media-object" src="'+logoPath+'"  height="40" alt="Dept Logo">'+
							'</a>'+
							'</div>';
					$("#auc-info").prepend(imgLogo);
			}
		}, function error(msg){
			
		});
	}
	
	$("#excess-bid-dialog").on("show.bs.modal", function() {    // wire up the OK button to dismiss the modal when shown
		$("#excess-bid-dialog #btnExcessBid").on("click", function(e) {
			$.aaacplApp.livePage.processBidding();
			$("#excess-bid-dialog").modal('hide');     // dismiss the dialog
		});
	});
	$("#excess-bid-dialog").on("hide.bs.modal", function() {    // remove the event listeners when the dialog is dismissed
		$("#excess-bid-dialog #btnExcessBid").off("click");
	});
	
	
};
$.aaacplApp.livePage.loadLots = function(){
	var _this = this;
	//$('.overlay').show();
	$("#lots-cont > .overlay").show();
	$.aaacplApp.ajaxCall("GET","lots/byAccess/auction/"+$.aaacplApp.queryParams('auctionid')+"/user/"+$.aaacplApp.getLoggedInUserId()+"/0", function success(response){
			
			_this.lotsData = response.lotsResponseList;
			
			var tocTable = '<table class="table">'+
				  '<tr>'+
					 ' <th style="width: 10px">#</th>'+
					 ' <th>Name</th>'+
					 ' <th>Description</th>'+
					 ' <th>Timing</th>'+
					 ' <th>Start Bid</th>'+
					 ' <th>Increment</th>'+
					'</tr>';
			
			if(_this.lotsData.length > 0){
				$("#live-auction-lots").html('');
				$("#lots-cont").addClass("box box-solid");
				$("#lots-cont").css("min-height","90px");
			} else {
				$("#lots-cont > .overlay").hide();
				$("#live-auction-lots").html('No lot(s) available.');
			}
			
			$.each(_this.lotsData, function(key,value){
				tocTable += "<tr><td>"+(key+1)+"</td><td>"+value.name+"</td><td>"+value.description+"</td><td>"+value.startDate.split(' ')[1] +" - " + value.endDate.split(' ')[1]+"</td><td>"+value.startBid+"</td><td>"+value.differenceFactor+"</td></tr>";
				$("#live-auction-lots").append(_this.getLots(value));
				
				$("#lot" + value.id + " .bidinput").keydown(function(event){
					if ( event.which == 13 || event.keyCode == 13) {
						event.stopPropagation();
						event.preventDefault();
						$("#lot" + _this.currentLotId + " .bidbtn").get(0).click();
					  }
				});
				$("#lot" + value.id + " .autoBidMode").change(function(event){
					if($(this).is(":checked")){
						$("#lot" + _this.currentLotId + " .bidinput").prop('disabled', true);
						$("#lot" + _this.currentLotId + " .bidbtn").prop('disabled', true);
					} else {
						$("#lot" + _this.currentLotId + " .bidinput").prop('disabled', false);
						$("#lot" + _this.currentLotId + " .bidbtn").prop('disabled', false);
					}
				});
				
				$("#lot" + value.id + " .bidbtn").click(function(){
					
					var lotElem = $("#lot" + _this.currentLotId);
					var incr = value.differenceFactor;
					var bidInput = parseInt(lotElem.find(".bidinput").val());
					var crbid = parseInt(lotElem.find(".hbid").html());
					var x;
					var dateTS = new Date();
					if(_this.auctionType == "1"){ //FORWARD
						x = (bidInput - parseFloat(value.startBid)) % incr;
						if(value.startBid <=  bidInput &&  x==0 && crbid < bidInput) {
							if(bidInput < (crbid + (incr*15))){
								_this.processBidding();
							} else {
								$('#excess-bid-dialog').modal('show')
								$("#excess-bid-dialog .modal-body").html("Your bid amount "+ bidInput +" is too high or unrealistic! <br>Are you confirmed you want to bid this amount?");
							}
						} else {
							$('#message-dialog').modal('show')
							$("#message-dialog .modal-body").html("Bidding Amount Should Be A Greater Than Startbid Amount And Multiplication Table Of Your Next Bid Amount");
						}
					} else if(_this.auctionType == "2"){ //REVERSE
						x = (parseFloat(value.startBid) - bidInput) % incr;
						var minbid = crbid == 0 ? value.startBid : crbid;
						if(bidInput>=0 && (minbid >  bidInput || bidInput == value.startBid)&&  x==0) {
							if(bidInput > (crbid - (incr*15))){
								_this.processBidding();
							} else {
								$('#excess-bid-dialog').modal('show')
								$("#excess-bid-dialog .modal-body").html("Your bid amount "+ bidInput +" is too low or unrealistic! <br>Are you confirmed you want to bid this amount?");
							}
						} else {
							$('#message-dialog').modal('show')
							$("#message-dialog .modal-body").html("Bidding Amount Should Be A Lesser Than Startbid Amount And Multiplication Table Of Your Next Bid Amount");
						}
					}
						
				});
				 

				
				$("#lots-toc .box-body").html(tocTable);
				if(key == 0 ){
					_this.currentLotId = value.id;
					_this.currentLotIndex = key;
					_this.updateLot();
				}
			});
			tocTable += '</table>';
			
			
			
			$(".btnPrintHistory").on('click', function(){
				_this.printHistory();
			});
			$('.user-loggedin').on('click',function(e){
				$("#online-users-dialog").modal("show");
				$("#online-users-dialog .overlay").show();
				var lot_id = e.target.id.replace('userLogged', '');
				$.aaacplApp.ajaxCall("GET", "user/loggedIn" , function success(response){
						_this.userStatusList = response;
						
						$.aaacplApp.ajaxCall("GET", "lots/lotInfo/" + lot_id , function success(lotresponse){
							var allowedUsers = lotresponse.linkedUserIds;
							if(allowedUsers.length > 0){
								$("#online-users-dialog ul.list-group").html('');
							}
							$.each(allowedUsers, function(key, value){
								var userinfo = _this.getUserDetail(value);
								if( typeof userinfo.companyName != 'undefined'){
									var userStatusTmpl =   '<li class="list-group-item">'+
									  (_this.isUserOnline(value) ? '<span class="badge">&nbsp;</span>' : '' )+
									  userinfo.companyName+
									 ' </li>';
									 $("#online-users-dialog ul.list-group").append(userStatusTmpl);
								}
							});
							$("#online-users-dialog .overlay").hide();
						}, function error(msg){
						});
				}, function error(msg){
				});
			});
			
		},function error(msg){
			
		});
		
}
$.aaacplApp.livePage.processBidding = function(){
	var _this = this;
	var lotElem = $("#lot" + _this.currentLotId);
	var bidInput = parseInt(lotElem.find(".bidinput").val());
	lotElem.find(".overlay").show();
	$.aaacplApp.ajaxCall("POST", "lots/bid/0", function success(response){
		if(response.failureMessage != ""){
			$.notify("Error: " + response.failureMessage, "error");
		}
		lotElem.find('.overlay').hide();
		lotElem.find('.bidinput').val('');
	}, function error(msg){
		lotElem.find('.overlay').hide();
		lotElem.find('.bidinput').val('');
	},
	JSON.stringify({
	   "bidAmount": bidInput,
	   "lotId": _this.currentLotId,
	   "userId": $.aaacplApp.getLoggedInUserId(),
	   "ipAddress": $.aaacplApp.livePage.ipAddress,
	   "bidType" : lotElem.find(".autoBidMode").is(":checked") ? "auto" : "manual",
	   "localSystemTime":Date()
	}));
};
$.aaacplApp.livePage.isUserOnline = function (userId){
	var _this = this;
	for(var i in _this.userStatusList){
		if(_this.userStatusList[i].userId == userId)
		return true;
	}
	return false;
};
$.aaacplApp.livePage.getUserDetail = function (userId){
	for(var i in $.aaacplApp.dataStorage.userList){
		if($.aaacplApp.dataStorage.userList[i].id == userId){
			return $.aaacplApp.dataStorage.userList[i];
		}
	}
	return {};
};
$.aaacplApp.livePage.updateClock = function (id, srvnow, starttime, endtime) {
	var _this = this;
	var lotElem = $("#lot" + id );
	var clock = $("#lot" + id + ' .clocktimer .countdown');
	var lotid = id;
	var localendtime = (_this.mysqlTimeStampToDate(endtime).getTime() - _this.mysqlTimeStampToDate(srvnow).getTime()) + new Date().getTime();
	if(typeof _this.timeintervalArr[lotid] != 'undefined'){
		clearInterval(_this.timeintervalArr[lotid]);
		_this.timeintervalArr[lotid] = undefined;
	}
	var timeinterval = setInterval(function() {
		var sTime = _this.mysqlTimeStampToDate(starttime).getTime();
		var eTime = _this.mysqlTimeStampToDate(endtime).getTime();

		var t = _this.getTimeRemaining(localendtime);
		var clock = $("#lot" + _this.currentLotId + ' .clocktimer .countdown');
		if(t.hours >= 0){
			clock.html(_this.formatDigit(t.hours) + ':' + _this.formatDigit(t.minutes) + ':' + _this.formatDigit(t.seconds));
		}
		var time = t.total / 1000;
		_this.timeEndedLotId = -1;
		if (t.total <= 0) {
			_this.timeEndedLotId = _this.currentLotId;
			//STOPPED
			lotElem.find('.bidarea .input-group').html("");
			lotElem.addClass('ended');
			clock.html('Timeout');
			clearInterval(_this.timeintervalArr[lotid]);
		} else if (t.total < (eTime - sTime)) {
			if(_this.currentLotIndex > 0)
			$("#lot" + _this.lotsData[_this.currentLotIndex-1].id).hide();
			$("#lot" + _this.currentLotId + " .nextInfo").hide();
			$("#lot" + _this.currentLotId + " .timerarea").show();
			$("#lot" + _this.currentLotId + " .bidarea").show();
			$("#lot" + _this.currentLotId + " .box-tools").show();
		   $("#lot" + _this.currentLotId).show();
		}
		if(!$("#lot" + _this.currentLotId).is(":visible")){
			$("#lot" + _this.currentLotId).show();
		}
		if($("#lots-toc").is(":visible")){
			$("#lot" + _this.currentLotId).hide();
		}
		
		
		if (time < 300) {
			clock.css('color', 'red');
		}

		
	}, 1000);
	_this.timeintervalArr[lotid] = timeinterval;
}

$.aaacplApp.livePage.printHistory = function(){	
	var contents = $(".content-wrapper .content").html();
	var frame1 = document.createElement('iframe');
	frame1.name = "frame1";
	frame1.style.position = "absolute";
	frame1.style.top = "-1000000px";
	document.body.appendChild(frame1);
	var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
	frameDoc.document.open();
	frameDoc.document.write('<html><head><title>Lot Bid History</title>');
	frameDoc.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"><link rel="stylesheet" href="http://eauction.aaacpl.com/app/bootstrap/css/bootstrap.min.css"><link rel="stylesheet" href="http://eauction.aaacpl.com/app/dist/css/AdminLTE.min.css"></head><body>');
	frameDoc.document.write(contents);
	frameDoc.document.write('</body></html>');
	frameDoc.document.close();
	setTimeout(function () {
		window.frames["frame1"].focus();
		window.frames["frame1"].print();
		document.body.removeChild(frame1);
	}, 500);
	return true;
}

$.aaacplApp.livePage.formatDigit = function(num) {
	return num < 10 ? '0' + num : num;
}
$.aaacplApp.livePage.formatDateTime = function(dateObject) {
	var _this = this;
	var dt = dateObject;
	return dt.getFullYear() + "-" + _this.formatDigit(dt.getMonth()+1) + "-" + _this.formatDigit(dt.getDate()) + " " + _this.formatDigit(dt.getHours()) + ":" + _this.formatDigit(dt.getMinutes()) + ":" + _this.formatDigit(dt.getSeconds());
}

$.aaacplApp.livePage.getTimeRemaining = function (localendtime) {
	var t = localendtime - new Date().getTime();
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	return {
		'total': t,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

$.aaacplApp.livePage.mysqlTimeStampToDate = function (timestamp) {
	//function parses mysql datetime string and returns javascript Date object
	//input has to be in this format: 2007-06-05 15:26:02
	var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
	var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
	return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
  }


