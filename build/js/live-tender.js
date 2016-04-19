
	$.aaacplApp.livePageTender.tenderStartTime = "";
	$.aaacplApp.livePageTender.tenderEndTime = "";
	$.aaacplApp.livePageTender.ipAddress = '';
	$.aaacplApp.livePageTender.userStatusList = [];
	$.aaacplApp.livePageTender.timerinterval = undefined;
$.aaacplApp.livePageTender.getLayout = function (){
	
	/***
	** LIVE LOTS IN TENDERS - this page is view by both participator and observer 
	**/
	
	var tmpl = 
			 
			 	 '<div class="media" id="auc-info">'+
				  '<div class="media-body">'+
					  '<h3 class="media-heading" id="tender-name"></h3>'+
					  '<h4 id="dept-name"> <span></span></h4>'+
					  '<span class="text-aqua" id="timings"></span>'+
					  '<div class="pull-right"><button type="button" class="btn btn-flat bg-orange btnPrintHistory"><i class="fa fa-print"></i> Print</button></div>'+
				  '</div>'+
				  '<p class="lead" id="timecounter" style="display:none">TIME REMAINING: <span class="countdown">00:00:00</span></p>'+
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
	'<div class="" id="lots-cont">'+
		'<div id="live-tender-lots">Checking.. please wait..</div>'+
		'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
	'</div>';
	return tmpl;
};

$.aaacplApp.livePageTender.getLots = function(lotDetail){
	var  bidInputtmpl = '<div class="input-group" style="display:none">'+
              '  <input type="text" class="form-control bidinput"  id="bidinput'+lotDetail.id+'" placeholder="Place bid here!">'+
			  '<input type="hidden" class="hbid" value="0"/>'+
              '     <span class="input-group-btn">'+
              '      <button type="button" id="bidbtn'+lotDetail.id+'" class="btn bg-orange btn-flat bidbtn">Bid Now</button>'+
              '   </span>'+
              '</div>';
	
	var printButtons = ($.aaacplApp.dataStorage.userInfo.typeId != 3) ? '<button type="button" id="userLogged'+lotDetail.id+'" class="btn btn-flat bg-orange user-loggedin"><i class="fa fa-group"></i> Bidders</a>' : '';
	
	if($.aaacplApp.dataStorage.userInfo.typeId != 3){
			bidInputtmpl = printButtons;
	}
	
	var tmpl = '<div class="box box-default live-lot" id="lot'+lotDetail.id+'">'+
             '<div class="box-header with-border">'+
               '<h3 class="box-title '+ ($.aaacplApp.dataStorage.userInfo.typeId==3 ? 'col-xs-6 col-md-8' : '') + '"><strong>'+lotDetail.name+'</strong> <small>'+ lotDetail.description+'</small></h3>'+
			   '<div class="box-tools pull-right  '+ ($.aaacplApp.dataStorage.userInfo.typeId==3 ? 'col-xs-6 col-md-4' : '') +'">'+
			   bidInputtmpl +
			   '</div>'+
            '</div>'+
            //'<div class="box-body">'+
			//'</div><!-- /.box-body -->'+
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

$.aaacplApp.livePageTender.updateLot = function(){
	var _this = $.aaacplApp.livePageTender;
	for(var i=0;i<_this.lotsData.length;i++){
		_this.renderBidHistory(_this.lotsData[i].id);
	}
	if(window.location.href.indexOf($.aaacplApp.template["live-tender"]) >= 0 && $.aaacplApp.dataStorage.userInfo.typeId != 3 && typeof _this.timerinterval != "undefined")
	setTimeout(_this.updateLot,15000);
};


$.aaacplApp.livePageTender.renderBidHistory = function(forLotID){
	var _this = this;
	
	$.aaacplApp.ajaxCall("GET", 'lots/bidHistory/' + forLotID,function success(response){
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
			
		}	
			$("#bidinput" + forLotID).parent().show();
			$.each(bidarr, function(key,value){
				if($.aaacplApp.dataStorage.userInfo.typeId == 3 && value.userId == $.aaacplApp.dataStorage.userInfo.id){
					$("#bidinput" + forLotID).parent().html('<b>Your Bid</b> &nbsp;&nbsp; <span class="label label-success"><i class="fa fa-inr"></i> '+value.bidAmt+'</span>')
				}
				if($.aaacplApp.dataStorage.userInfo.typeId != 3){
					var isA = (typeof value.isAccepted != 'undefined' && value.isAccepted.toUpperCase()) == "ACCEPTED" ? true : false;
					var rowTmpl = '<tr>'+
							  '<td>'+(key+1)+'</td>'+
							 ' <td>'+value.companyName+'</td>'+
							 ' <td>'+value.logTime+'</td>'+
							 ' <td>'+value.bidAmt+'</td>'+
							 ' <td><span class="label label-'+ (isA ? "success" : "danger") +'">'+ (isA ? "Accepted" : "Rejected") + '</span></td>'+
							'</tr>';
					bidTable.append(rowTmpl);
				}
			});
			
		
	}, function error(msg){
	});
};
$.aaacplApp.livePageTender.getLotData = function(id){
	var _this = this;
	for(var i in _this.lotsData){
		if(_this.lotsData[i].id == id)
		return _this.lotsData[i];
	}
	
};
$.aaacplApp.livePageTender.executeScript = function(){
	var _this = this;
	$.ajax({
		url: 'https://api.ipify.org/?format=json',
		success: function(data) {
		  $.aaacplApp.livePageTender.ipAddress = data.ip;
		},
		type: 'GET'
		});
		
		
		
	if($.aaacplApp.queryParams('tenderid')!=""){
		$.aaacplApp.ajaxCall("GET","auction/auctionInfo/" + $.aaacplApp.queryParams('tenderid'), function success(response){
			$.aaacplApp.livePageTender.tenderStartTime = response.tenderStartDate;
			$.aaacplApp.livePageTender.tenderEndTime = response.tenderEndDate;
			$("#tender-name").html(response.name);
			var deptInfo = $.aaacplApp.getDeptInfoById(response.deptId);
			
			
			$("#dept-name").html(deptInfo.name);
			$("#timings").html(response.tenderStartDate + " - " + response.tenderEndDate)
			if(deptInfo.logoPath!=null && deptInfo.logoPath!="" && deptInfo.logoPath!="null"){
				var logoPath = $.aaacplApp.uploadPath + deptInfo.logoPath;
				var imgLogo = '<div class="media-left">'+
							' <a href="#">'+
							'  <img class="media-object" src="'+logoPath+'"  height="40" alt="Dept Logo">'+
							'</a>'+
							'</div>';
					$("#auc-info").prepend(imgLogo);
			}
			
			_this.loadLots();
		}, function error(msg){
			
		});
	}
	
	
};

$.aaacplApp.livePageTender.updateClock = function (srvnow) {
	var _this = this;	
	var localendtime = (_this.mysqlTimeStampToDate(_this.tenderEndTime).getTime() - _this.mysqlTimeStampToDate(srvnow).getTime()) + new Date().getTime();
	
	_this.timerinterval = setInterval(function() {
		var sTime = _this.mysqlTimeStampToDate(_this.tenderStartTime).getTime();
		var eTime = _this.mysqlTimeStampToDate(_this.tenderEndTime).getTime();

		var t = _this.getTimeRemaining(localendtime);
		var clock = $("#timecounter .countdown");
		if(t.hours >= 0){
			clock.html(_this.formatDigit(t.hours) + ':' + _this.formatDigit(t.minutes) + ':' + _this.formatDigit(t.seconds));
		}
		var time = t.total / 1000;		
		if (t.total <= 0) {
			clock.html("00:00:00");
			if($.aaacplApp.dataStorage.userInfo.typeId == 3){
				$("#live-tender-lots").html('Tender has ended');
			}
			clearInterval(_this.timerinterval);
			_this.timerinterval = undefined;
		} else if (t.total < (eTime - sTime)) {
			$("#timecounter").show();
			$("#live-tender-lots").show();
			$("#premessage").hide();
		} else if($("#premessage").length == 0){
			$("#lots-cont").prepend("<div id='premessage'>Tender not started yet.</div>");
		}
		
		if (time < 300) {
			clock.css('color', 'red');
		}

	}, 1000);	
}
$.aaacplApp.livePageTender.loadLots = function(){
	var _this = this;	
	//$('.overlay').show();
	$("#lots-cont > .overlay").show();
	$.aaacplApp.ajaxCall("GET","lots/byAccess/auction/"+$.aaacplApp.queryParams('tenderid')+"/user/"+$.aaacplApp.getLoggedInUserId()+"/1", function success(response){
			
			
			_this.lotsData = response.lotsResponseList;
						
			
			$("#lots-cont > .overlay").hide();
			if(_this.lotsData.length > 0){
				$("#live-tender-lots").hide();
				var request = JSON.stringify({lotid: _this.lotsData[0].id, currentBidMax : 0});
				$.aaacplApp.ajaxCall("POST","lots/status", function success(response){
					_this.updateClock(response.currentServerTime);					
				},function error(msg){	},request);
				
				$("#live-tender-lots").html('');
				//$("#lots-cont").addClass("box box-solid");
				$("#lots-cont").css("min-height","90px");
			} else {
				$("#live-tender-lots").html('No lot(s) available.');
			}
			for(var i=0;i<_this.lotsData.length;i++){
				var value = _this.lotsData[i];
				var key = i;
				
				$("#live-tender-lots").append(_this.getLots(value));
				
				$("#bidinput" + value.id).keydown(function(event){
					var lotid = event.target.id.replace("bidinput","");
					if ( event.which == 13 || event.keyCode == 13) {
						event.stopPropagation();
						event.preventDefault();
						$("#bidbtn" + lotid ).get(0).click();
					  }
				});
				
				$("#bidbtn" + value.id).click(function(event){
					var lotid = event.target.id.replace("bidbtn","");
					var _this = this;
					var lotElem = $("#lot" + lotid);
					var bidInput = parseInt(lotElem.find(".bidinput").val());
					lotElem.find(".overlay").show();
					$.aaacplApp.ajaxCall("POST", "tender/bid", function success(response){
						lotElem.find('.overlay').hide();
						//$(e.target).remove();
						$("#bidinput" + lotid).parent().html('<b>Your Bid</b> &nbsp;&nbsp; <span class="label label-success"><i class="fa fa-inr"></i> '+bidInput+'</span>');
						
						lotElem.find('.bidinput').val('');
					}, function error(msg){
						lotElem.find('.overlay').hide();
						lotElem.find('.bidinput').val('');
					},
					JSON.stringify({
					   "bidAmount": bidInput,
					   "lotId": lotid,
					   "userId": $.aaacplApp.getLoggedInUserId(),
					   "ipAddress": $.aaacplApp.livePageTender.ipAddress,
					   "localSystemTime":Date()
					}));
				});
				 
			}
			_this.updateLot();
			
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

$.aaacplApp.livePageTender.isUserOnline = function (userId){
	var _this = this;
	for(var i in _this.userStatusList){
		if(_this.userStatusList[i].userId == userId)
		return true;
	}
	return false;
};
$.aaacplApp.livePageTender.getUserDetail = function (userId){
	for(var i in $.aaacplApp.dataStorage.userList){
		if($.aaacplApp.dataStorage.userList[i].id == userId){
			return $.aaacplApp.dataStorage.userList[i];
		}
	}
	return {};
};

$.aaacplApp.livePageTender.printHistory = function(){	
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

$.aaacplApp.livePageTender.formatDigit = function(num) {
	return num < 10 ? '0' + num : num;
}
$.aaacplApp.livePageTender.formatDateTime = function(dateObject) {
	var _this = this;
	var dt = dateObject;
	return dt.getFullYear() + "-" + _this.formatDigit(dt.getMonth()+1) + "-" + _this.formatDigit(dt.getDate()) + " " + _this.formatDigit(dt.getHours()) + ":" + _this.formatDigit(dt.getMinutes()) + ":" + _this.formatDigit(dt.getSeconds());
}

$.aaacplApp.livePageTender.getTimeRemaining = function (localendtime) {
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

$.aaacplApp.livePageTender.mysqlTimeStampToDate = function (timestamp) {
	//function parses mysql datetime string and returns javascript Date object
	//input has to be in this format: 2007-06-05 15:26:02
	var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
	var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
	return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
  }


