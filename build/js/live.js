
$.aaacplApp.livePage.tickCntr = 0;
	$.aaacplApp.livePage.timeintervalArr = [];
	$.aaacplApp.livePage.auctionStartTime = "";
	$.aaacplApp.livePage.ipAddress = '';
	$.aaacplApp.livePage.currentLotId = 0;
	$.aaacplApp.livePage.currentLotIndex = 0;
	$.aaacplApp.livePage.currentBidHistory = [];
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
				 '<h3 id="dept-name"><img src="" height="40"> <span>MIAL Department</span></h3>'+
				 '<h4 id="auction-name"></h4>'+
			
			//Lots consolidated list 
		 ' <div class="box" id="lots-toc" style="display:none">'+
                '<div class="box-header">'+
                  '<h3 class="box-title">Lots list</h3>'+
                  '<div class="box-tools">'+
                    
                 ' </div>'+
                '</div><!-- /.box-header -->'+
                '<div class="box-body no-padding">'+
               ' </div><!-- /.box-body -->'+
              '</div><!-- /.box -->'+
			  
			  '<div class="modal fade" tabindex="-1" role="dialog" id="online-users-dialog" aria-labelledby="model-heading">'+
                   '<div class="modal-dialog">'+
                    ' <div class="modal-content">'+
                       '<div class="modal-header">'+
                        ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '   <span aria-hidden="true">×</span></button>'+
                        ' <h4 class="modal-title" id="model-heading">Logged In Participators</h4>'+
                       '</div>'+
                       '<div class="modal-body">'+
					    '<ul class="list-group">'+
						'</ul>'+
                       '</div>'+
                     '</div>'+
                     '<!-- /.modal-content -->'+
                   '</div>'+
                   '<!-- /.modal-dialog -->'+
                 '</div>'+
				 
	'<div id="live-auction-lots">No lot(s) available</div>'+
	'<div></div>';
	return tmpl;
};

$.aaacplApp.livePage.getLots = function(lotDetail){
	var  bidInputtmpl = '<div class="input-group">'+
              '  <input type="text" class="form-control bidinput"  placeholder="Place bid here!">'+
              '     <span class="input-group-btn">'+
              '      <button type="button" class="btn bg-orange btn-flat bidbtn">Bid Now</button>'+
              '   </span>'+
              '</div>';
	if($.aaacplApp.dataStorage.userInfo.typeId == "4"){
			bidInputtmpl = "";
	}
	var printButtons = ($.aaacplApp.dataStorage.userInfo.typeId == 4) ? '<button type="button" class="btn btn-flat bg-orange btnPrintHistory"><i class="fa fa-print"></i> Print</button> <button type="button" id="userLogged'+lotDetail.id+'" target="_blank" class="btn btn-flat bg-orange user-loggedin"><i class="fa fa-group"></i> Bidders</a>' : '';
	var tmpl = '<div class="box box-solid live-lot" id="lot'+lotDetail.id+'" style="display:none">'+
             '<div class="box-header">'+
               '<h3 class="box-title">'+lotDetail.name+' - '+lotDetail.description+'</h3>'+
			   '<div class="box-tools pull-right">'+
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
		
		
		 '<div class="col-lg-3 col-md-6 col-xs-12">'+
         ' <div class="info-box bg-yellow" style="display:none">'+
          '  <span class="info-box-icon"><i class="fa fa-hourglass-half"></i></span>'+
           ' <div class="info-box-content">'+
			'<div class="clocktimer"><div>TIME REMAINNING</div><div class="countdown">00:00:00</div></div>'+
            '</div>'+
           ' <!-- /.info-box-content -->'+
          '</div>'+
          '<!-- /.info-box -->'+
        '</div>'+
        '<!-- /.col -->'+
		
        '<div class="col-lg-4 col-xs-12 bidarea">'+
         ' <div class="info-box bg-red box box-solid"  style="display:none">'+
          '  <span class="info-box-icon"><i class="fa fa-thumbs-o-down"></i></span>'+
           ' <div class="info-box-content">'+
		   
		   '  <span class="info-box-text">Highest Bid</span>'+
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
                  '<div class="box-tools">'+
                    
                 ' </div>'+
                '</div><!-- /.box-header -->'+
                '<div class="box-body no-padding">'+
                  '<table class="table">'+
				  '<tr>'+
					 ' <th style="width: 10px">#</th>'+
					 ' <th>Company</th>'+
					 ' <th>Bid Time</th>'+
					 ' <th>Bid Amount</th>'+
					'</tr>'+
                   '<tr>No bid(s)</tr>'
                '  </table>'+
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
			
			var lotElem = $("#lot" + _this.currentLotId);
			$("#lot" + _this.currentLotId + " .hbid").html(response.highestBid);
			var lotData = _this.getLotData(_this.currentLotId);
			if(response.currentServerTime == ""){
				response.currentServerTime = _this.formatDateTime(new Date())
			}
			if(typeof _this.timeintervalArr[_this.currentLotId] == 'undefined'){
				_this.updateClock(_this.currentLotId, response.currentServerTime, lotData.startDate, lotData.endDate);
			}
			if(response.higestBidUser == $.aaacplApp.getLoggedInUserId()){
				lotElem.find('.bidarea .info-box').removeClass('bg-red').addClass('bg-green');
				lotElem.find('.bidarea .info-box-icon .fa').removeClass('fa-thumbs-o-down').addClass('fa-thumbs-o-up');
			} else {
				lotElem.find('.bidarea .info-box').removeClass('bg-green').addClass('bg-red');
				lotElem.find('.bidarea .info-box-icon .fa').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-o-down');
			}
			
			if(response.hasHigestBidChanged){
				_this.renderBidHistory();
			}
			if(_this.lotsData.length > 0){
				var aStartTime = _this.mysqlTimeStampToDate(_this.auctionStartTime).getTime();
				var aEndTime = aStartTime + (30 * 60 * 1000);
				var curTime = _this.mysqlTimeStampToDate(response.currentServerTime).getTime();
				var fLotStartTime = _this.mysqlTimeStampToDate(_this.lotsData[0].startDate).getTime();
				if((curTime > aStartTime && curTime < aEndTime) || (curTime > aStartTime && curTime < fLotStartTime) ){
					$("#lots-toc").show();
				} else {
					$("#lots-toc").hide();
				}
			}
			
			if(window.location.href.indexOf($.aaacplApp.template["live"]) >= 0)
			setTimeout(_this.updateLot,800);
		}, function error(msg){
		},request);
	}
};
$.aaacplApp.livePage.renderBidHistory = function(){
	var _this = this;
	
	$.aaacplApp.ajaxCall("GET", 'lots/bidHistory/' + _this.currentLotId,function success(response){
		_this.currentBidHistory = response;
		var bidarr = response;	
		if(bidarr.length > 0 && $.aaacplApp.dataStorage.userInfo.typeId == "4"){
			var bidHistorySec = $("#lot" + _this.currentLotId + " .box-footer");
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
					'</tr>';
			bidTable.append(headerTmpl);

			$.each(bidarr, function(key,value){
				var rowTmpl = '<tr>'+
						  '<td>'+(key+1)+'</td>'+
						 ' <td>'+value.companyName+'</td>'+
						 ' <td>'+value.logTime+'</td>'+
						 ' <td>'+value.bidAmt+'</td>'+
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
		
		if($.aaacplApp.dataStorage.userInfo.typeId == "4"){
			$(".bidarea .input-group").hide();
		}
		
	if($.aaacplApp.queryParams('auctionid')!=""){
		$.aaacplApp.ajaxCall("GET","auction/auctionInfo/" + $.aaacplApp.queryParams('auctionid'), function success(response){
			$.aaacplApp.livePage.auctionStartTime = response.startDate;
			$("#auction-name").html(response.name);
			var deptInfo = {};
			$.aaacplApp.dataStorage.deptList.forEach(function (item){
				if(item.id == response.deptId){
					deptInfo = item;
				}
			} );
			_this.loadLots();
			$("#dept-name span").html(deptInfo.name);
			$("#dept-name img").attr('src',$.aaacplApp.uploadPath + deptInfo.logoPath);
		}, function error(msg){
			
		});
	}
	
};
$.aaacplApp.livePage.loadLots = function(){
	var _this = this;
	$.aaacplApp.ajaxCall("GET","lots/byAccess/auction/"+$.aaacplApp.queryParams('auctionid')+"/user/"+$.aaacplApp.getLoggedInUserId(), function success(response){
			
			/*_this.lotsData = [{
				"differenceFactor":1000,
				"startDate":"2016-02-25 12:30:00", 
				"endDate":"2016-02-25 16:30:00", 
				"createdBy":1,
				"auctionId":7,
				"startBid":"10000",
				"updatedBy":1,
				"name":"Test Lot",
				"id":37,
				"description":"test lot description"}
				]; */
			
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
			}
			
			$.each(_this.lotsData, function(key,value){
				tocTable += "<tr><td>"+(key+1)+"</td><td>"+value.name+"</td><td>"+value.description+"</td><td>"+value.startDate.split(' ')[1] +" - " + value.endDate.split(' ')[1]+"</td><td>"+value.startBid+"</td><td>"+value.differenceFactor+"</td></tr>";
				$("#live-auction-lots").append(_this.getLots(value));
				$("#lot" + value.id + " .bidbtn").click(function(){
					
					var lotElem = $("#lot" + _this.currentLotId);
					var incr = value.differenceFactor;
					var bidInput = parseInt(lotElem.find(".bidinput").val());
					var crbid = parseInt(lotElem.find(".hbid").html());
					var x = (bidInput - parseFloat(value.startBid)) % incr;
						var dateTS = new Date();
						if(value.startBid <=  bidInput &&  x==0 && crbid < bidInput) {
							lotElem.find(".overlay").show();
							$.aaacplApp.ajaxCall("POST", "lots/bid", function success(response){
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
							   "localSystemTime":Date()
							}));
						} else {
							$('#message-dialog').modal('show')
							$("#message-dialog .modal-body").html("Bidding Amount Should Be A Greater Than Startbid Amount And Multiplication Table Of Your Next Bid Amount");
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
			
		},function error(msg){
			
		});
		$(".btnPrintHistory").on('click', function(){
			_this.printHistory();
		});
		$('.user-loggedin').on('click',function(e){
			var lot_id = e.target.id.replace('userLogged', '');
			$.aaacplApp.ajaxCall("GET", "user/loggedIn" , function success(response){
					_this.userStatusList = response;
					
					$.aaacplApp.ajaxCall("GET", "lots/lotInfo/" + lot_id , function success(lotresponse){
						var allowedUsers = lotresponse.linkedUserIds;
						if(allowedUsers.length > 0){
							$("#online-users-dialog ul.list-group").html('');
						}
						$.each(allowedUsers, function(key, value){
							var userStatusTmpl =   '<li class="list-group-item">'+
						  (_this.isUserOnline(value.id) ? ' <span class="badge">&nbsp;</span>' : '' )+
						  value.companyName+
						 ' </li>';
						 $("#online-users-dialog ul.list-group").append(userStatusTmpl);
						});
					}, function error(msg){
					});
			}, function error(msg){
			});
		});
}
$.aaacplApp.livePage.isUserOnline = function (userId){
	var _this = this;
	for(var i in _this.userStatusList){
		if(_this.userStatusList[i].id == userId)
		return true;
	}
	return false;
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
		clock.html(_this.formatDigit(t.hours) + ':' + _this.formatDigit(t.minutes) + ':' + _this.formatDigit(t.seconds));
		var time = t.total / 1000;
		
		if (t.total <= 0) {
			//STOPPED
			var statusbidMsg = '';
			if (_this.currentBidHistory.length > 0) {
				if (lotElem.find('.bidarea .info-box').hasClass('bg-green')) {
					statusbidMsg = "You are highest bidder! <small>(Subject To Confirmation)</small>";
				}
			} else {
				statusbidMsg = 'No Bidder(s)';
			}
			
			lotElem.find('.bidarea .input-group').html(statusbidMsg);
			lotElem.addClass('ended');
			
			_this.currentLotIndex++;
			if(_this.currentLotIndex < _this.lotsData.length){
				_this.currentLotId = _this.lotsData[_this.currentLotIndex].id;
			} else {
				_this.currentLotId = -1;
			}
			clock.html('Timeout');
			_this.currentBidHistory = [];
			clearInterval(_this.timeintervalArr[lotid]);
		} else if (t.total < (eTime - sTime)) {
			if(_this.currentLotIndex > 0)
			$("#lot" + _this.lotsData[_this.currentLotIndex-1].id).hide();
			$("#lot" + _this.currentLotId + " .bg-yellow").show();
			$("#lot" + _this.currentLotId + " .bg-red").show();
		   $("#lot" + _this.currentLotId).show();
		}
		if(!$(".ended").is(":visible") || !$("#lots-toc").is(":visible")){
			$("#lot" + _this.currentLotId).show();
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
	return false;
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


