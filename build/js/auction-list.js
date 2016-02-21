$.aaacplApp.auctionListPage.getLayout = function (){
	
	/***
	** LIST OF AUCTIONS - this page is viewed by both participator and observer 
	**/
	var tmpl = '<div class="box box-solid" id="live-auctions">'+
	'<div class="box-header with-border">'+
	'<h3 class="box-title">Live Auctions</h3>'+
	'</div>'+
	'<div class="box-body">'+
	'No live auctions' +
	'</div>'+
	'</div>'+
	'<div class="box box-solid" id="upcoming-auctions">'+
	'<div class="box-header with-border">'+
	'<h3 class="box-title">Upcoming Auctions</h3>'+
	'</div>'+
	'<div class="box-body">'+
	'No upcoming auctions'+
	'</div>'+
	'</div>';
	
	return tmpl;
};

$.aaacplApp.auctionListPage.executeScript = function(){
	
	$.aaacplApp.ajaxCall("GET",'auction/live',function success(response){
		var auctionListData = response.auctionResponseList;
		if(auctionListData.length > 0){
			$('#live-auctions .box-body').html('');
		}
		$.each(auctionListData, function(key,value){
			var tmpl = '<div class="small-box bg-aqua">'+
            '<div class="inner">'+
              '<h4><strong>'+value.name+'</strong></h4>'+
              '<p>'+value.startDate +' - ' + value.endDate + '</p>'+
            '</div>'+
            '<div class="icon">'+
            '</div>'+
            '<a href="#/live?auctionid='+value.auctionId+'" class="small-box-footer">'+
             ' Go to auction <i class="fa fa-arrow-circle-right"></i>'+
            '</a>'+
          '</div>';
			$('#live-auctions .box-body').append(tmpl);
		});
		
	},function error(msg){
		
	});
	
	$.aaacplApp.ajaxCall("GET",'auction/upcoming',function success(response){
		var auctionListData = response.auctionResponseList;
		if(auctionListData.length > 0){
			$('#upcoming-auctions .box-body').html('');
		}
		$.each(auctionListData, function(key,value){
			var tmpl = '<div class="small-box bg-aqua">'+
            '<div class="inner">'+
              '<h4><strong>'+value.name+'</strong></h4>'+
              '<p>'+value.startDate +' - ' + value.endDate + '</p>'+
            '</div>'+
            '<div class="icon">'+
            '</div>'+
          '</div>';
			$('#upcoming-auctions .box-body').append(tmpl);
		});
		
	},function error(msg){
		
	});
	
};

     