$.aaacplApp.auctionListPage.getLayout = function (){
	
	/***
	** LIST OF AUCTIONS - this page is viewed by both participator and observer 
	**/
	var tmpl = '<div class="box box-solid" id="live-auctions">'+
	'<div class="box-header with-border">'+
	'<h3 class="box-title">Live Auctions</h3>'+
	'</div>'+
	'<div class="box-body">'+
	'Loading... please wait...' +
	'</div>'+
	'</div>'+
	'<div class="box box-solid" id="upcoming-auctions">'+
	'<div class="box-header with-border">'+
	'<h3 class="box-title">Upcoming Auctions</h3>'+
	'</div>'+
	'<div class="box-body">'+
	'Loading... please wait...'+
	'</div>'+
	'</div>';
	
	return tmpl;
};

$.aaacplApp.auctionListPage.executeScript = function(){
	
	$.aaacplApp.ajaxCall("GET",'auction/live',function success(response){
		var auctionListData = response.auctionResponseList;
		if(auctionListData.length > 0){
			$('#live-auctions .box-body').html('');
		} else {
			$('#live-auctions .box-body').html('No live auction(s).');
		}
		$.each(auctionListData, function(key,value){
			var deptInfo = $.aaacplApp.getDeptInfoById(value.deptId);
			var imgLogo = "";
			 if(typeof(deptInfo.logoPath) !== 'undefined' && deptInfo.logoPath !== null && deptInfo.logoPath !== "null" && deptInfo.logoPath !== "" ){
				var logoPath = $.aaacplApp.uploadPath + deptInfo.logoPath;
				//imgLogo = '<img class="img-circle" src="'+logoPath+'" alt="Dept Logo">';
				imgLogo = '<div class="media-left">'+
							' <a href="#">'+
							'  <img class="media-object" src="'+logoPath+'" alt="Dept Logo">'+
							'</a>'+
							'</div>';
				
			 }
			 var catalogLink = "";
			 if(typeof(value.catalog) !== 'undefined' && value.catalog !== null && value.catalog !== "null" && value.catalog !== ""){
				var catalogPath = $.aaacplApp.uploadPath + value.catalog;
				catalogLink = '<a href="'+catalogPath+'"><small class="label label-warning"><i class="fa fa-download"></i> Catalogue</small></a>';
			 }
			var tmpl = '<div class="small-box bg-aqua">'+
            '<div class="inner">'+
				'<div class="media">'+
				  imgLogo +
				  '<div class="media-body">'+
					  '<h4 class="media-heading"><strong>'+value.name+'</strong>  &nbsp; '+catalogLink+'</h4>'+
					  '<h6>By '+deptInfo.name+'</h6>'+
					  '<p>Details: '+value.description +
					  '<br>Timings: '+value.startDate +' - ' + value.endDate + '</p>'+
				  '</div>'+
				'</div>'+
            '</div>'+
            '<div class="icon">'+
			'<i class="fa fa-'+ (value.auctionTypeId==1 ? 'arrow-up' : 'arrow-down') + '"></i>'+
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
		} else {
			$('#upcoming-auctions .box-body').html('No upcoming auction(s).');
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

     