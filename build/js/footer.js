$.aaacplApp.pageFooter.getLayout = function (){
	//This code will be dynamic - for now it is static
	var tmpl = ' <!-- Main Footer --> '+
     ' <footer class="main-footer">'+
      '  <!-- To the right -->'+
       ' <div class="pull-right hidden-xs">'+
        '</div>'+
        '<!-- Default to the left -->'+
        '<strong>Copyright &copy; 2016 <a href="#">A.A. Auctioneers & Contractors Pvt. Ltd.</a></strong> All rights reserved.'+
      '</footer>';
	return tmpl;
};