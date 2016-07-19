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
	
	$.aaacplApp.ajaxCall("GET",'auction/live/0',function success(response){
		var auctionListData = response.auctionResponseList;
		if(auctionListData.length > 0){
			$('#live-auctions .box-body').html('');
		} else {
			$('#live-auctions .box-body').html('No live auction(s).');
		}
		$.each(auctionListData, function(key,value){
			$('#live-auctions .box-body').append($.aaacplApp.auctionListPage.getRowTmpl(value, true));
		});
		
	},function error(msg){
		
	});
	
	$.aaacplApp.ajaxCall("GET",'auction/upcoming/0',function success(response){
		var auctionListData = response.auctionResponseList;
		if(auctionListData.length > 0){
			$('#upcoming-auctions .box-body').html('');
		} else {
			$('#upcoming-auctions .box-body').html('No upcoming auction(s).');
		}
		$.each(auctionListData, function(key,value){
			$('#upcoming-auctions .box-body').append($.aaacplApp.auctionListPage.getRowTmpl(value, false));
		});
		
	},function error(msg){
		
	});
	
};


$.aaacplApp.auctionListPage.getRowTmpl = function(value, islive){
	var deptInfo = $.aaacplApp.getDeptInfoById(value.deptId);
			var imgLogo = "";
			 if(typeof(deptInfo.logoPath) !== 'undefined' && deptInfo.logoPath !== null && deptInfo.logoPath !== "null" && deptInfo.logoPath !== "" ){
				var logoPath = $.aaacplApp.uploadPath + deptInfo.logoPath;
				
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
			 var actionBtn = ""
		  if(islive){
			 actionBtn =  '<a href="#/live?auctionid='+value.auctionId+'" class="small-box-footer">'+
             ' Go to auction <i class="fa fa-arrow-circle-right"></i>'+
            '</a>';
		  }
		  var tmpl = '<div class="col-md-9"><div class="small-box bg-aqua">'+
            '<div class="inner">'+
				'<div class="media">'+
				  imgLogo +
				  '<div class="media-body">'+
					  '<h4 class="media-heading"><strong>'+value.name+'</strong>  &nbsp; '+catalogLink+'</h4>'+
					  '<h6>By '+deptInfo.name+'</h6>'+
					  '<p><strong>Details:</strong> '+value.description +
					  '<br><strong>Timings:</strong> '+value.startDate +' - ' + value.endDate + '</p>'+
				  '</div>'+
				'</div>'+
            '</div>'+
            '<div class="icon">'+
			'<i class="fa fa-'+ (value.auctionTypeId==1 ? 'arrow-up' : 'arrow-down') + '"></i>'+
            '</div>'+ actionBtn+
          '</div></div>';
		  return tmpl;
};

     