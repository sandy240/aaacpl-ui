$.aaacplApp.pageContent.getLayout = function (pageheader, pagecontents , pagesubheader){
	pageheader = (typeof pageheader == 'undefined' ? "" : pageheader);
	pagesubheader = (typeof pagesubheader == 'undefined' ? "" : pagesubheader);
	pagecontents = (typeof pagecontents == 'undefined' ? "" : pagecontents);
	//This code will be dynamic - for now it is static
	var tmpl = '<!-- Content Wrapper. Contains page content -->'+
      '<div class="content-wrapper">'+
       ' <!-- Content Header (Page header) -->'+
       ' <section class="content-header">'+
         ' <h1>'+
           pageheader +
           ' <small>'+pagesubheader+'</small>'+
          '</h1>'+
		  '<!-- TODO - BreadCrumb -->'+
          '<!-- ol id="breadcrumb" class="breadcrumb">'+
          '<li><a href="/"><i class="fa fa-dashboard"></i> Home</a></li>'+
           ' <li class="active">Dashboard</li>'+
          '</ol -->'+
        '</section>'+
        '<!-- Main content -->'+
        '<section class="content">'+
         pagecontents +
        '</section><!-- /.content -->'+
      '</div><!-- /.content-wrapper -->';
	return tmpl;
};

$.aaacplApp.pageContent.executeScript = function(){

 // ajax call on page load which will return the user Info on passing sessionId and userId
         $(function(){
         var userDetails = {};
         userDetails['sessionId'] = $aaacplApp.sessionId;
             $.ajax({
               type: "POST",
               url: $.aaacplApp.apiSrvPath + 'user/userinfo',
               data: JSON.stringify(userDetails),
               dataType : "json",
               crossDomain : true,
               contentType : "application/json",
               success: function(response){
               var isValidJson = $aaacplApp.tryParseJSON(response);
               if(isValidJson){
                $.each(data, function (key, value) {
                    $aaacplApp.dataStorage.userInfo[key] = value;
               });
               }else{
                    alert("Something went wrong! Please try again later");
                    $.aaacplApp.redirectTo('login');   //REDIRECT TO login or we can make a page having a
                    //panel showing messages when REST API behaves inappropriately or sends incorrect data
                 }
               },
                error: function() {
                 alert("Something went wrong! Please try again later");
                 $.aaacplApp.redirectTo('login');  //REDIRECT TO login
               }
            });
         });
};