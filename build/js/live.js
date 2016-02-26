
$.aaacplApp.livePage.tickCntr = 0;
	$.aaacplApp.livePage.timeintervalArr = [];
$.aaacplApp.livePage.getLayout = function (){
	
	/***
	** LIVE LOTS IN AUCTIONS - this page is view by both participator and observer 
	**/
	var tmpl = '<div id="live-auction-lots">No lots available</div>'+
	'<div></div>';
	return tmpl;
};

$.aaacplApp.livePage.getLots = function(lotDetail){
	var printButtons = ($.aaacplApp.dataStorage.userInfo.typeId == 4) ? '<button type="button" class="btn btn-flat">Print History</button>' : '';
	var tmpl = '<div class="box box-solid live-lot" id="lot'+lotDetail.id+'">'+
             '<div class="box-header">'+
               '<h3 class="box-title"><span class="label label-info">TIMINGS : '+lotDetail.startDate.split(' ')[1]+' - '+lotDetail.endDate.split(' ')[1]+'</span> &nbsp; '+lotDetail.name+' - '+lotDetail.description+'</h3>'+
			   '<div class="box-tools pull-right">'+
			   printButtons +
			   '</div>'+
            '</div>'+
            '<div class="box-body">'+
			' <div class="row">'+
        '<div class="col-md-4 col-sm-6 col-xs-12">'+
         ' <div class="info-box bg-aqua">'+
          '  <span class="info-box-icon"><i class="fa fa-info-circle"></i></span>'+
           ' <div class="info-box-content">'+
		    '<div class="col-lg-6 col-xs-12">'+
            '  <span class="info-box-text">Start bid</span>'+
             ' <span class="info-box-number"><i class="fa fa-inr"></i><span class="sbid">'+lotDetail.startBid+'</span></span>'+
			 '</div>'+
			 '<div class="col-lg-6 col-xs-12">'+
            '  <span class="info-box-text">Increment</span>'+
             ' <span class="info-box-number"><i class="fa fa-inr"></i><span class="incr">'+lotDetail.differenceFactor+'</span></span>'+
			 '</div>'+
            '</div>'+
            '<!-- /.info-box-content -->'+
          '</div>'+
          '<!-- /.info-box -->'+
        '</div>'+
        '<!-- /.col -->'+
		
		
		 '<div class="col-md-4 col-sm-6 col-xs-12">'+
         ' <div class="info-box bg-yellow">'+
          '  <span class="info-box-icon"><i class="fa fa-hourglass-half"></i></span>'+
           ' <div class="info-box-content">'+
			'<div class="clocktimer"><h1>00:00:00</h1></div>'+
            '</div>'+
           ' <!-- /.info-box-content -->'+
          '</div>'+
          '<!-- /.info-box -->'+
        '</div>'+
        '<!-- /.col -->'+
		
        '<div class="col-md-4 col-sm-6 col-xs-12">'+
         ' <div class="info-box bg-green">'+
          '  <span class="info-box-icon"><i class="fa fa-thumbs-o-up"></i></span>'+
           ' <div class="info-box-content">'+
		   
		   '  <span class="info-box-text">Highest Bid</span>'+
            '  <span class="info-box-number"><i class="fa fa-inr"></i><span class="hbid">0</span></span>'+
             '<div class="input-group input-group">'+
              '  <input type="text" class="form-control bidinput"  placeholder="Place bid here!">'+
              '     <span class="input-group-btn">'+
              '      <button type="button" class="btn bg-orange btn-flat bidbtn">Bid Now</button>'+
              '   </span>'+
              '</div>'+
			  
            '</div>'+
            '<!-- /.info-box-content -->'+
          '</div>'+
          '<!-- /.info-box -->'+
        '</div>'+
        '<!-- /.col -->'+      
      '</div>'+
			'</div><!-- /.box-body -->'+
         ' </div>';
		
	return tmpl;
};
$.aaacplApp.livePage.currentLotId = 0;
$.aaacplApp.livePage.updateLot = function(){
	var _this = this;
	var lotElem = $("#lot" + _this.currentLotId);
	if(_this.currentLotId!=-1){
		var request = JSON.stringify({lotid: _this.currentLotId, currentBidMax : lotElem.find(".hbid").html()});
		$.aaacplApp.ajaxCall("POST", 'lots/status',function success(response){
			$("#lot" + _this.currentLotId + " .hbid").html(response.highestBid);
			var lotData = _this.getLotData(_this.currentLotId);
			_this.initializeClock(_this.currentLotId, response.currentServerTime, lotData.startDate, lotData.endDate);
			setTimeout(_this.updateLot,600);
		}, function error(msg){
		},request);
	}
};
$.aaacplApp.livePage.getLotData = function(id){
	var _this = this;
	$.each(_this.lotsData, function(key,value){
		if(value.id == id)
		return value;
	});
};
$.aaacplApp.livePage.executeScript = function(){
	var _this = this;
	if($.aaacplApp.queryParams('auctionid')!=""){
		
		$.aaacplApp.ajaxCall("GET","lots/byAccess/auction/"+$.aaacplApp.queryParams('auctionid')+"/user/"+$.aaacplApp.getLoggedInUserId(), function success(response){
			$("#live-auction-lots").html('');
			_this.lotsData = response.lotsResponseList;
			
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
			
			$.each(_this.lotsData, function(key,value){
				
				$("#live-auction-lots").append(_this.getLots(value));
				$("#lot" + value.id + " .bidbtn").click(function(){
					var lotElem = $("#lot" + _this.currentLotId);
					var incr = value.differenceFactor;
					var bidInput = parseInt(lotElem.find(".bidinput").val());
					var crbid = parseInt(lotElem.find(".hbid").html());
					var x = (bidInput - parseFloat(value.startBid)) % incr;
						var dateTS = new Date();
						if(value.startBid <=  bidInput &&  x==0 && crbid < bidInput) {
							$.aaacplApp.ajaxCall("POST", "lots/bid", function success(response){
								
							}, function error(msg){
								
							},
							JSON.stringify({
							   "bidAmount": bidInput,
							   "lotId": _this.currentLotId,
							   "userId": $.aaacplApp.getLoggedInUserId(),
							   "ipAddress": "127.0.0.1",
							   "localSystemTime":Date()
							}));
						} else {
							//$("#msgarea").html("Bidding Amount Should Be A Greater Than Startbid Amount And Multiplication Table Of Your Next Bid Amount");
						}
				});
				if(key == 0 ){
					_this.currentLotId = value.id;
					_this.updateLot();
				}
			});
			
			
		},function error(msg){
			
		});
	}
	
	
};

$.aaacplApp.livePage.initializeClock = function (id, srvnow, starttime, endtime) {
	var _this = this;
	    var clock = $("#lot" + id + ' .clocktimer');
	    var lotid = id;
	    var localendtime = (_this.mysqlTimeStampToDate(endtime).getTime() - _this.mysqlTimeStampToDate(srvnow).getTime()) + new Date().getTime();
	    var timeinterval = setInterval(function() {
	        var sTime = _this.mysqlTimeStampToDate(starttime).getTime();
	        var eTime = _this.mysqlTimeStampToDate(endtime).getTime();

	        var t = _this.getTimeRemaining(localendtime);

	        clock.innerHTML = _this.formatTimeDigit(t.hours) + ':' + _this.formatTimeDigit(t.minutes) + ':' + _this.formatTimeDigit(t.seconds);
	        var time = t.total / 1000;
	        if ((time < (eTime - sTime) || isNaN(sTime))) {
	           $("#lot" + id ).show();
	        }
	        if (time < 300) {
	            clock.css('color', 'red');
	        }

	        if (t.total <= 0) {
	            //STOPPED
	            $(clock).hide();
	            var bidderCnt = parseInt($('.lotdetails').attr('totalbid'))
	            $('#clock_' + lotid).parent().html('Ended');
	            $('#bidbtn_' + lotid).hide();
	            $('#increment_' + lotid).hide();
	            var statusbidMsg = '';
	            if (bidderCnt > 0) {
	                if (curUser == $('#bidbtncont_' + lotid).attr('hbidder')) {
	                    statusbidMsg = "You are highest bidder! <sub>(Subject To Confirmation)</sub>";
	                }
	            } else {
	                statusbidMsg = 'No Bidder(s)';
	            }
	            $('#bidbtncont_' + lotid).width('220');
	            $('#bidbtn_' + lotid).parent().html('<div class="stitle">' + (statusbidMsg != "" ? "Status" : "") + '</div><div class="statustext">' + statusbidMsg + '</div>');
	            setTimeout(function() {
	                $('#lot-cont-' + lotid).hide();
	                $('#lot-cont-' + lotid).next().show();
	                curLotId = undefined;
	            }, 30000);

	            clearInterval(_this.timeintervalArr[lotid]);
	        }
	    }, 1000);
	    _this.timeintervalArr[lotid] = timeinterval;
	}

	$.aaacplApp.livePage.formatTimeDigit = function(num) {
	    return num < 10 ? '0' + num : num;
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


     