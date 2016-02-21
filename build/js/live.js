$.aaacplApp.livePage.getLayout = function (){
	
	/***
	** LIVE LOTS IN AUCTIONS - this page is view by both participator and observer 
	**/
	var tmpl = "<div id='live-auction'></div>";
	return tmpl;
};

$.aaacplApp.livePage.getLots = function(lotDetail){
	var tmpl = '<div class="box box-solid live-lot" id="lot'+lotDetail.id+'">'+
             '<div class="box-header">'+
               '<h3 class="box-title"><span class="label label-info">TIMINGS : '+lotDetail.startDate.split(' ')[1]+' - '+lotDetail.endDate.split(' ')[1]+'</span> &nbsp; '+lotDetail.name+' - '+lotDetail.description+'</h3>'+
			   '<div class="box-tools pull-right">'+
			   '</div>'+
            '</div>'+
            '<div class="box-body">'+
			' <div class="row">'+
        '<div class="col-md-4 col-sm-6 col-xs-12">'+
         ' <div class="info-box bg-aqua">'+
          '  <span class="info-box-icon"><i class="fa fa-info-circle"></i></span>'+
           ' <div class="info-box-content">'+
		    '<div class="col-md-6 col-xs-12">'+
            '  <span class="info-box-text">Start bid</span>'+
             ' <span class="info-box-number"><i class="fa fa-inr"></i><span class="sbid">'+lotDetail.startBid+'</span></span>'+
			 '</div>'+
			 '<div class="col-md-6 col-xs-12">'+
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
            '  <span class="info-box-number"><i class="fa fa-inr"></i><span class="hbid">41,410</span></span>'+
             '<div class="input-group input-group">'+
              '  <input type="text" class="form-control"  placeholder="Place bid here!">'+
              '     <span class="input-group-btn">'+
              '      <button type="button" class="btn bg-orange btn-flat">Bid Now</button>'+
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

$.aaacplApp.livePage.executeScript = function(){
	
	if($.aaacplApp.queryParams('auctionid')!=""){
		
		
		$.aaacplApp.ajaxCall("GET","lots/byAccess/auction/"+$.aaacplApp.queryParams('auctionid')+"/user/"+$.aaacplApp.getLoggedInUserId(), function success(response){
			$("#live-auction").html('');
			$.aaacplApp.livePage.lotsData = response.lotsResponseList;
			
			if($.aaacplApp.livePage.lotsData.length > 0 ){
				$.aaacplApp.livePage.updatePage();
			}
			
		},function error(msg){
			
		});
	}
	
	
	var tickCntr = 0;
	var timeintervalArr = [];

	/*function initializeClock(id, srvnow, endtime) {
	    var clock = document.getElementById(id);
	    var lotid = id.split('_')[1];
	    var localendtime = (mysqlTimeStampToDate(endtime).getTime() - mysqlTimeStampToDate(srvnow).getTime()) + new Date().getTime();
	    var timeinterval = setInterval(function() {
	        var sTime = parseInt($('#lottimer_' + lotid).attr('startsecs'));
	        var eTime = parseInt($('#lottimer_' + lotid).attr('endsecs'));

	        var t = getTimeRemaining(localendtime);

	        clock.innerHTML = formatTimeDigit(t.hours) + ':' + formatTimeDigit(t.minutes) + ':' + formatTimeDigit(t.seconds);
	        var time = t.total / 1000;
	        if ((time < (eTime - sTime) || isNaN(sTime))) {
	           
	        }
	        if (time < 300) {
	            $(clock).css('color', 'red');
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

	            clearInterval(timeintervalArr[lotid]);
	        }
	    }, 1000);
	    timeintervalArr[lotid] = timeinterval;
	}

	function formatTimeDigit(num) {
	    return num < 10 ? '0' + num : num;
	}

	function getTimeRemaining(localendtime) {
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
	
	function mysqlTimeStampToDate(timestamp) {
		//function parses mysql datetime string and returns javascript Date object
		//input has to be in this format: 2007-06-05 15:26:02
		var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
		var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
		return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
	  }*/
	
};

$.aaacplApp.livePage.updatePage = function(){
	$.aaacplApp.ajaxCall("GET", 'lots/status',function success(response){
	}, function error(msg){
	});
};

     