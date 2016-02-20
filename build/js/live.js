$.aaacplApp.livePage.getLayout = function (){
	
	/***
	** LIVE LOTS IN AUCTIONS - this page is view by both participator and observer 
	**/
	var tmpl = '<div class="box box-solid manage">'+
             '<div class="box-header">'+
               '<h3 class="box-title">001 - Lots name goes here</h3>'+
			   '<div class="box-tools pull-right">'+
			   '<span class="label label-info">04:00 PM - 06:00 PM</span>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body">'+
			' <div class="row">'+
        '<div class="col-md-4 col-sm-6 col-xs-12">'+
         ' <div class="info-box bg-aqua">'+
          '  <span class="info-box-icon"><i class="fa fa-info-circle"></i></span>'+
           ' <div class="info-box-content">'+
		   '<div class="">'+
            '  <span class="info-box-text">Start bid</span>'+
             ' <span class="info-box-number">41,410</span>'+
			 '</div>'+
			 '<div class="">'+
            '  <span class="info-box-text">Increment</span>'+
             ' <span class="info-box-number">41,410</span>'+
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
            '  <span class="info-box-text">Events</span>'+
            '  <span class="info-box-number">41,410</span>'+
            '  <div class="progress">'+
             '   <div class="progress-bar" style="width: 70%"></div>'+
             ' </div>'+
              '    <span class="progress-description">'+
              '      70% Increase in 30 Days'+
              '    </span>'+
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
            '  <span class="info-box-text">Likes</span>'+
            '  <span class="info-box-number">41,410</span>'+
             ' <div class="progress">'+
               ' <div class="progress-bar" style="width: 70%"></div>'+
              ' </div>'+
                '  <span class="progress-description">'+
                 '   70% Increase in 30 Days'+
                 ' </span>'+
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
	
};

     