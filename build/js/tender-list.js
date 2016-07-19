$.aaacplApp.tenderListPage.getLayout = function (){
	
	/***
	** LIST OF TENDERS - this page is viewed by both participator and observer 
	**/
	var tmpl = '<div class="box box-solid" id="live-tenders">'+
	'<div class="box-header with-border">'+
	'<h3 class="box-title">Live Tenders</h3>'+
	'</div>'+
	'<div class="box-body">'+
	'Loading... please wait...' +
	'</div>'+
	'</div>'+
	'<div class="box box-solid" id="upcoming-tenders">'+
	'<div class="box-header with-border">'+
	'<h3 class="box-title">Upcoming Tenders</h3>'+
	'</div>'+
	'<div class="box-body">'+
	'Loading... please wait...'+
	'</div>'+
	'</div>';
	
	return tmpl;
};

$.aaacplApp.tenderListPage.executeScript = function(){
	
	$.aaacplApp.ajaxCall("GET",'auction/live/1',function success(response){
		var auctionListData = response.auctionResponseList;
		if(auctionListData.length > 0){
			$('#live-tenders .box-body').html('');
		} else {
			$('#live-tenders .box-body').html('No live tender(s).');
		}
		$.each(auctionListData, function(key,value){
			
			$('#live-tenders .box-body').append($.aaacplApp.tenderListPage.getRowTmpl(value,true));
		});
		
	},function error(msg){
		
	});
	
	$.aaacplApp.ajaxCall("GET",'auction/upcoming/1',function success(response){
		var auctionListData = response.auctionResponseList;
		if(auctionListData.length > 0){
			$('#upcoming-tenders .box-body').html('');
		} else {
			$('#upcoming-tenders .box-body').html('No upcoming tender(s).');
		}
		$.each(auctionListData, function(key,value){
			$('#upcoming-tenders .box-body').append($.aaacplApp.tenderListPage.getRowTmpl(value,false));
		});
		
	},function error(msg){
		
	});
	
};

$.aaacplApp.tenderListPage.getRowTmpl = function(value, islive){

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
			 var actionBtn = "";
			 if(islive){
				actionBtn = '<a href="#/live/tender?tenderid='+value.auctionId+'" class="small-box-footer">'+
				 ' Go to tender <i class="fa fa-arrow-circle-right"></i>'+
				'</a>';
			 }
			var tmpl = '<div class="col-md-9"><div class="small-box bg-aqua">'+
            '<div class="inner">'+
				'<div class="media">'+
				  imgLogo +
				  '<div class="media-body">'+
					  '<h4 class="media-heading"><strong>'+value.name+'</strong>  &nbsp; '+catalogLink+'</h4>'+
					  '<h6>By '+deptInfo.name+'</h6>'+
					  '<p>Details: '+value.description +
					  '<br>Timings: '+value.tenderStartDate +' - ' + value.tenderEndDate + '</p>'+
				  '</div>'+
				'</div>'+
            '</div>'+
            '<div class="icon">'+
			'<i class="fa fa-'+ (value.auctionTypeId==1 ? 'arrow-up' : 'arrow-down') + '"></i>'+
            '</div>'+ actionBtn+
          '</div></div>';
		  return tmpl;
};

     