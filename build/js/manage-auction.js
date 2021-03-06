$.aaacplApp.manageAuction.getLayout = function (){
	
	/***
	** COMPLETE AUCTION PAGE LAYOUT 
	**/
	var tmpl = 
	'<div class="box box-solid manage">'+
             '<div class="box-header">'+
               '<h3 class="box-title">Auctions</h3>'+
               '<div><a href="javascript:history.back()" class="btn btn-box-tool"><i class="fa fa-arrow-left fa-lg"></i><span id="departmentIdField" style="margin-left: 6px;"></span></a></div>'+
			   '<div class="box-tools pull-right">'+
			   '<button class="btn bg-orange" data-toggle="modal" data-target="#add-auction-form">Add New Auction</button>'+
			   '</div>'+
            '</div>'+
            '<div class="box-body" id="auction-rows-cont">'+
			'</div><!-- /.box-body -->'+
			'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
         ' </div>'+
		 
		 //Modal for adding new auctions
         		 '<div class="modal fade" tabindex="-1" role="dialog" id="add-auction-form" aria-labelledby="model-heading" data-backdrop="static" data-keyboard="false">'+
                   '<div class="modal-dialog" role="document">'+
                    ' <div class="modal-content box">'+
                       '<div class="modal-header">'+
                        ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '   <span aria-hidden="true">×</span></button>'+
                        ' <h4 class="modal-title" id="model-heading">New Auction</h4>'+
                       '</div>'+
                       '<div id="createAuctionFormSection">'+
         			  '<form class="form" role="form">'+
                       '<div class="modal-body">'+
         			 '<div class="form-group">'+
         			  ' <label for="auctionInputName">Auction Name</label>'+
         			   ' <input type="text" class="form-control" id="auctionInputName" name="name" required>'+
         			 '</div>'+
         			 '<!-- Date and time range -->'+
                           '<div class="form-group">'+
                            ' <label>Auction start and end date:</label>'+
                            ' <div class="input-group">'+
                             '  <div class="input-group-addon">'+
                             '    <i class="fa fa-clock-o"></i>'+
                             '  </div>'+
                             '  <input type="text" class="form-control pull-right" id="auctionDateRange" required>'+
                             '</div><!-- /.input group -->'+
                           '</div><!-- /.form group -->'+
						   
						    '<!-- Tender Date and time range -->'+
							   '<div class="form-group">'+
								' <label>Tender Settings(Start and end date)</label>'+
								' <div class="input-group">'+'<input type="checkbox" id="tenderEnable"> Show as tender'+'</div>'+
								' <div class="input-group" id="tenderdategroup" style="display:none">'+
								 '  <div class="input-group-addon">'+
								 '    <i class="fa fa-clock-o"></i>'+
								 '  </div>'+
								 '  <input type="text" class="form-control pull-right" id="tenderDateRange" >'+
								 '</div><!-- /.input group -->'+
							   '</div><!-- /.form group -->'+
						   
                      '<!-- Description -->'+
                           '<div class="form-group">'+
                           '<label>Description</label>'+
                           '<textarea class="form-control" id="auctionDescription" name="description" required></textarea>'+
                           '</div>'+
			'<div class="row">' +			   
           	        '<!-- auction Type -->'+
                           '<div class="col-md-6 form-group">'+
                           '<label>Auction Type</label>'+
                             '<select id="auctiontype" class="form-control" name="auctionTypeId">'+
                             '<option value="1">Forward Auction</option>'+
                             '<option value="2">Reverse Auction</option>'+
                             '</select>'+
                           '</div>'+
						   '<!-- auction auto bid -->'+
						    '<div class="col-md-6 form-group">'+
                           '<label>Auto Bid Limit</label>'+
						   ' <div class="input-group">'+'<input type="checkbox" id="autoBidEnable"> Enable Auto Bid'+'</div>'+
								 '  <input type="text" min="1" value="0" class="form-control pull-right" name="autoBidLimit" id="autoBidLimit" style="display:none">'+
                           '</div>'+
			  '</div>'+
              '<!-- auction Catalog -->'+
              '<div class="form-group"> <label>Catalogue</label>'+
               '<div><input type="hidden" id="auctionCatalogPath" name="catalog" value="">'+
               '<input type="file" class="hidden" id="auctionInputFile">'+
               '<label class="form-control btn btn-default" for="auctionInputFile" style="width: 15%;">Select a file</label><span id="auctionInputFileText" style="padding:8px;">no file chosen</span>'+
               '<button type="button" style="display:none;" class="btn btn-primary" id="auctionUploadCatalogFile">Upload</button>'+
               '</div>'+
               '</div>'+
                           '<div class="form-group" id="catalogFileInfo"> '+
                           '</div>'+
                           '</div>'+
                           '<!-- /.modal-body -->'+
                       '<div class="modal-footer">'+
                       '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>'+
                       '  <button type="submit" class="btn bg-orange">Create</button>'+
                       '  <button type="reset" class="btn">Reset</button>'+
                       '</div>'+
         			  '</form>'+
         			  '</div>'+'<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>'+
                   '</div>'+
                   '</div>'+
                   '<!-- /.modal-content -->'+
                 '</div>'+
				 '</div>';
		
	return tmpl;
};

$.aaacplApp.manageAuction.executeScript = function(){
		var _this = this;

		$("#auctionUploadCatalogFile").on('click',function(e){
            var file = $('#auctionInputFile').get(0).files[0];
            if(file){
            var formData = new FormData();
            formData.append('file', file);
			var curDate = new Date();
			$(".overlay").show();
            $.aaacplApp.ajaxCall("POST", "files/upload?fn=auction_catalog_" + curDate.getTime(), function success(response){
				$(".overlay").hide();
                if(response.filePath && response.filePath !=""){
                $("#auctionCatalogPath").val(response.filePath);
                 $("#auctionUploadCatalogFile").hide();
                }
                else{
                    $.notify("Unable to upload file","error");
					
                }
            }, function error(msg){
                $.notify("Unable to upload file","error");
            }, formData,true);
            }
        });

        $("#auctionInputFile").on('change',function(){
            var fileInfo;
                  if (this.files && this.files[0]) {
                    var file = this.files[0];
                        // Present file info and append it to the list of files
                        fileInfo = "<div><strong>Name:</strong> " + file.name + "</div>";
                        fileInfo += "<div><strong>Size:</strong> " + parseInt(file.size / 1024, 10) + " kb</div>";
                        fileInfo += "<div><strong>Type:</strong> " + file.type + "</div>";
						$.notify("Click upload button before creating auction for uploading catalog","info");
                        $("#auctionUploadCatalogFile").show();
                        $('#auctionInputFileText').html(this.files[0].name);
                    }
                    document.getElementById("catalogFileInfo").innerHTML = fileInfo;
            });
			
			$("#tenderEnable").change(function(e) {
					if(this.checked) {
						$("#tenderDateRange").prop('required', true);
						$("#tenderdategroup").show();
					} else {
						$("#tenderdategroup").hide();
						$("#tenderDateRange").val('');
						$("#tenderDateRange").prop('required', false);
					}
				});
				$("#autoBidEnable").change(function(e) {
					if(this.checked) {
						$("#autoBidLimit").prop('required', true);
						$("#tenderDateRange").prop('type', "number");
						$("#autoBidLimit").show();
					} else {
						$("#autoBidLimit").hide();
						$("#autoBidLimit").val('0');
						$("#tenderDateRange").prop('type', "text");
						$("#autoBidLimit").prop('required', false);
					}
				});

        var deptName;
        var deptList = $.aaacplApp.dataStorage.deptList;
        $.each(deptList, function(key , value){
            if(value.id == $.aaacplApp.queryParams('deptid')){
                deptName = value.name;
            }
        });
		$('#departmentIdField').html("DEPARTMENT : "+deptName);

		var createAuctionForm = $('#add-auction-form form');
		
		$('#add-auction-form').on('shown.bs.modal', function () {
		  createAuctionForm[0].reset();
		  createAuctionForm.find("#tenderdategroup").hide();
		  document.getElementById("catalogFileInfo").innerHTML = "";
		});
        // on submit function of form is called to perform client side validation
		createAuctionForm.submit(function(event){
			
			event.preventDefault(); // Prevent the form from submitting via the browser
			var dateRangeValue = $('#auctionDateRange').val(); // getting the entire dateRange value
			var tenderDateRangeValue = $('#tenderDateRange').val(); // getting the entire dateRange value
            var formData = createAuctionForm.serializeArray(); // JSON data of values entered in form
            var auctionPost = {};
                 $.each(formData, function (key, item) {
                                 auctionPost[item.name] = item.value;
                  });
                 auctionPost["deptId"] = $.aaacplApp.queryParams('deptid');
                 auctionPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "" ;
                 auctionPost["endDate"] =  typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "" ;
				 auctionPost["tenderStartDate"] = typeof tenderDateRangeValue === "string" ? tenderDateRangeValue.substr(0, 19) : "" ;
				 auctionPost["tenderEndDate"] =  typeof tenderDateRangeValue === "string" ? tenderDateRangeValue.substr(21, 20) : "" ;
				 auctionPost["isAuctionTender"] = $('#tenderEnable').is(':checked') ? 1 : 0;
                 auctionPost["createdBy"] = $.aaacplApp.getLoggedInUserId();
		    $(".overlay").show();
            $.aaacplApp.ajaxCall("POST", 'auction/create', function success(response){
				$(".overlay").hide();
				$("#add-auction-form").modal('hide');
				if(response.successMessage && response.successMessage !=""){
					 $.notify("Auction has been created.", "success");
					auctionPost.auctionId = response.successMessage;
					$.aaacplApp.dataStorage.auctionList.push(auctionPost);
					_this.loadAuctionRows();
				} else {
					$.notify("Unable to create auction. Please try again.", "error");
				}
            }, function error(msg){
				$(".overlay").hide();
				$("#add-auction-form").modal('hide');
				$.notify("Unable to create auction. Please try again.", "error");
            },
            //POST PAYLOAD
            JSON.stringify(auctionPost));
		});

	
	$('#auctionDateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, timePicker24Hour: true, format: 'YYYY-MM-DD HH:mm:ss'});
	$('#tenderDateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, timePicker24Hour: true, format: 'YYYY-MM-DD HH:mm:ss'});
	$.aaacplApp.ajaxCall("GET", 'auction/types',function success(response){
		console.info(response);
	});
	_this.loadAuctionRows();
	
};

$.aaacplApp.manageAuction.loadAuctionRows = function(){
	if($.aaacplApp.queryParams('deptid') != ""){
		$(".overlay").show();
			var auctionList = $.aaacplApp.dataStorage.auctionList;
			$("#auction-rows-cont").html('');
		    $(".overlay").hide();
			$.each(auctionList, function(key , value){
				var tenderDateValue = value.tenderStartDate != "" ?  value.tenderStartDate.substr(0, 19)+' - '+value.tenderEndDate.substr(0, 19) : "";
				var auctionRow = '<div class="box box-default box-solid collapsed-box auction-row" id="ar-'+value.auctionId+'">'+
                                 				' <div class="box-header with-border">'+
                                 				'  <h3 id="box-title'+value.auctionId+'" class="box-title">'+value.name+'</h3>'+
                                 				 ' <div class="box-tools pull-right">'+
                                 				  '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>'+
                                 				  '  <a href="#/manage/lots?auctionid='+value.auctionId+'" id="href'+value.auctionId+'" class="btn btn-box-tool"><i class="fa fa-hdd-o"></i> MANAGE LOTS</a>'+
                                 				  '</div>'+
                                 				'</div>'+
                                                     '<form id="editAuctionForm'+value.auctionId+'" class="form" role="form">'+
                                                     '<div class="box-body">'+
                                 				 '<div class="form-group">'+
                                 				  ' <label for="auction'+value.auctionId+'InputName">Auction Name</label>'+
                                 				   ' <input type="text" class="form-control" name="name" id="auction'+value.auctionId+'InputName" value="'+value.name+'">'+
                                 				 '</div>'+
                                 				 '<!-- Date and time range -->'+
                                                   '<div class="form-group">'+
                                                    ' <label>Auction start and end date:</label>'+
                                                    ' <div class="input-group">'+
                                                     '  <div class="input-group-addon">'+
                                                     '    <i class="fa fa-clock-o"></i>'+
                                                     '  </div>'+
                                                     '  <input type="text" class="form-control pull-right" id="auction'+value.auctionId+'DateRange" value="'+value.startDate.substr(0, 19)+' - '+value.endDate.substr(0, 19)+'" >'+
                                                     '</div><!-- /.input group -->'+
                                                   '</div><!-- /.form group -->'+
												   
												   
												   '<!-- Tender Date and time range -->'+
												   '<div class="form-group">'+
													' <label>Tender Settings(Start and end date)</label>'+
													' <div class="input-group">'+'<input type="checkbox" id="tenderEnable'+value.auctionId + '" '+ (value.isTender==1 ? 'checked' : '') +'> Show as tender'+'</div>'+
													' <div class="input-group" style="display:none" id="tenderdategroup'+value.auctionId+'">'+
													 '  <div class="input-group-addon">'+
													 '    <i class="fa fa-clock-o"></i>'+
													 '  </div>'+
													 '  <input type="text" class="form-control pull-right" id="tender'+value.auctionId+'DateRange" value="'+tenderDateValue+'">'+
													 '</div><!-- /.input group -->'+
												   '</div><!-- /.form group -->'+
												   
												   
                                                         '<!-- Description -->'+
                                                                     '<div class="form-group">'+
                                                                     '<label>Description</label>'+
                                                                     '<textarea class="form-control" name="description" id="auction'+value.auctionId+'Description">'+value.description+'</textarea>'+
                                                                     '</div>'+
													'<div class="row">' +			   
															'<!-- auction Type -->'+
																   '<div class="col-md-6 form-group">'+
																   '<label>Auction Type</label>'+
																	 '<select id="auction'+value.auctionId+'Type" name="auctionTypeId" class="form-control">'+
																	 '<option value="1">Forward Auction</option>'+
																	 '<option value="2">Reverse Auction</option>'+
																	 '</select>'+
																   '</div>'+
															'<!-- auction auto bid -->'+
																	'<div class="col-md-6 form-group">'+
																   '<label>Auto Bid Limit</label>'+
																   ' <div class="input-group">'+'<input type="checkbox" id="autoBidEnable'+value.auctionId+'" '+ (value.autoBidLimit>0 ? 'checked' : '') +'> Enable Auto Bid'+'</div>'+
																		 '  <input type="text" min="1" class="form-control pull-right" name="autoBidLimit" id="autoBidLimit'+value.auctionId+'" value="'+value.autoBidLimit+'" style="display:none">'+
																   '</div>'+
													  '</div>'+
																	 
                                                   
                                                         '<!-- status -->'+
                                                                     '<div class="form-group">'+
                                                                     '<label>Status</label>'+
                                                                       '<select class="form-control" name="status" id="auction'+value.status+'status">'+
                                                                       '<option value="A">Active</option>'+
                                                                       '<option value="I">Inactive</option>'+
                                                                       '</select>'+
                                                                     '</div>'+
                                                        '<!-- auction Catalog -->'+
                                                                       
                                                                       '<div class="form-group"> <label>Catalogue</label>'+
                                                                                     '<div><input type="hidden" id="auction'+value.auctionId+'Catalog" name="catalog" value="'+value.catalog+'">'+
                                                                                     '<input type="file" class="hidden" id="auction'+value.auctionId+'auctionInputFile">'+
                                                                                     '<label class="form-control btn btn-default" for="auction'+value.auctionId+'auctionInputFile" style="width: 10%;">Select a file</label><span id="auction'+value.auctionId+'InputFileText" style="padding:8px;">no file chosen</span>'+
                                                                                     '<button type="button" style="display:none;" class="btn btn-primary" id="auction'+value.auctionId+'auctionUploadCatalogFile">Upload</button>'+
                                                                                     '</div>'+
                                                                                     '</div>'+
                                                                       			 '<div class="form-group" id="auction'+value.auctionId+'catalogFileInfo">'+
                                                                       			   
                                                                       			   '</div>'+
                                                                       
                                                                     '</div>'+
                                 				'<div class="box-footer">'+
                                 					'  <button type="submit" class="btn bg-orange">UPDATE</button>'+
                                 					' <button type="button" id="resetEditAuction" class="btn">Reset</button>'+
                                 				'</div>'+
                                 				 '</form>'+
                                 			'</div>';
			 
			 $("#auction-rows-cont").append(auctionRow);

			 if(value.status && value.status == "I"){
             $('#auction'+value.status+'status').val('I');
             }

             if(value.auctionTypeId && value.auctionTypeId == 2){
              $('#auction'+value.auctionId+'Type').val(2);
             }

             var fileName = "no file chosen";
             if(typeof(value.catalog) !== 'undefined' && value.catalog !== null){
			 fileName = value.catalog.split('/')[1];
			 $('#auction'+value.auctionId+'InputFileText').html(fileName);
			 }
		
			if(value.isTender == 1) {
				$("#tenderdategroup" + value.auctionId).show();
			}
			if(value.autoBidLimit > 0) {
				$("#autoBidLimit" + value.auctionId).show();
			}
			$("#tenderEnable" + value.auctionId).change(function(e) {
				var id = e.target.id.replace("tenderEnable","");
					if(this.checked) {
						$("#tender" + id + "DateRange").prop('required', true);
						$("#tenderdategroup" + id).show();
					} else {
						$("#tenderdategroup" + id).hide();
						$("#tender"+ id +"DateRange").val('');
						$("#tender" + id + "DateRange").prop('required', false);
					}
				});
				$("#autoBidEnable" + value.auctionId).change(function(e) {
					var id = e.target.id.replace("autoBidEnable","");
					if(this.checked) {
						$("#autoBidLimit" + id).prop('required', true);
						$("#autoBidLimit" + id).prop('text', "number");
						$("#autoBidLimit" + id).show();
					} else {
						$("#autoBidLimit" + id).hide();
						$("#autoBidLimit"+ id ).val('0');
						$("#autoBidLimit" + id ).prop('required', false);
						$("#autoBidLimit" + id ).prop('text', "text");
					}
				});
				
			 $("#auction"+value.auctionId+"auctionUploadCatalogFile").on('click',function(e){
                         var file = $('#auction'+value.auctionId+'auctionInputFile').get(0).files[0];
                         if(file){
                         var formData = new FormData();
                         formData.append('file', file);
						 var curDate = new Date();
						 var catalogFolder = value.catalog.split("/").length > 0 ? value.catalog.split("/")[0] :  ("auction_catalog_" + curDate.getTime());
						 $(".overlay").show();
                         $.aaacplApp.ajaxCall("POST", "files/upload?fn=" + catalogFolder, function success(response){
							 $(".overlay").hide();
                         if(response.filePath && response.filePath != ""){
                               $("#auction"+value.auctionId+"Catalog").val(response.filePath);
                               $('#auction'+value.auctionId+'auctionUploadCatalogFile').hide();
							   $.notify(" Click upload button to upload file on server.","info");
                         }else{
						 $.notify("Unable to upload file","error");
                         }
                         }, function error(msg){
                         $.notify("Unable to upload file","error");
                         }, formData,true);
                         }
                     });

             $("#auction"+value.auctionId+"auctionInputFile").on('change',function(){
                         var fileInfo;
                               if (this.files && this.files[0]) {
                                 var file = this.files[0];
                                     // Present file info and append it to the list of files
                                     fileInfo = "<div><strong>Name:</strong> " + file.name + "</div>";
                                     fileInfo += "<div><strong>Size:</strong> " + parseInt(file.size / 1024, 10) + " kb</div>";
                                     fileInfo += "<div><strong>Type:</strong> " + file.type + "</div>";
                                     $('#auction'+value.auctionId+'auctionUploadCatalogFile').show();
									 $.notify("Click upload button before creating auction for uploading catalog","info");
                                     $('#auction'+value.id+'InputFileText').html(this.files[0].name);
                                 }
                                 document.getElementById("auction"+value.auctionId+"catalogFileInfo").innerHTML = fileInfo;
                         });

			 $("#href"+value.auctionId).on('click', function() {
                         $.aaacplApp.getLotList(value.auctionId);
             });

			 $("#resetEditAuction").click(function(){
             		    $("#editAuctionForm"+value.auctionId)[0].reset();
             		    $('#auction'+value.auctionId+'auctionUploadCatalogFile').hide();
                        $('#auction'+value.id+'InputFileText').html(fileName);
                        document.getElementById("auction"+value.auctionId+"catalogFileInfo").innerHTML = "";
             		 });
			 $('#auction'+value.auctionId+'DateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, timePicker24Hour: true, format: 'YYYY-MM-DD HH:mm:ss'});
			 $('#tender'+value.auctionId+'DateRange').daterangepicker({timePicker: true, timePickerIncrement: 1, timePicker24Hour: true, format: 'YYYY-MM-DD HH:mm:ss'});


             $('#editAuctionForm' + value.auctionId).submit(function(event){
             					var id = event.target.id.replace('editAuctionForm','');
             					event.preventDefault(); // Prevent the form from submitting via the browser
             					var dateRangeValue = $('#auction'+id+'DateRange').val(); // getting the entire dateRange value
             					var tenderDateRangeValue = $('#tender'+id+'DateRange').val(); // getting the entire dateRange value
             					var formData = $('#editAuctionForm' + id).serializeArray(); // JSON data of values entered in form
             					var auctionPost = {};
             						 $.each(formData, function (key, item) {
             										 auctionPost[item.name] = item.value;
             									 });
             						 auctionPost["id"] = id;
             						 auctionPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "" ;
             						 auctionPost["endDate"] =  typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "" ;
									 auctionPost["tenderStartDate"] = typeof tenderDateRangeValue === "string" ? tenderDateRangeValue.substr(0, 19) : "" ;
             						 auctionPost["tenderEndDate"] =  typeof tenderDateRangeValue === "string" ? tenderDateRangeValue.substr(21, 20) : "" ;
									 auctionPost["isAuctionTender"] = $('#tenderEnable'+id).is(':checked') ? 1 : 0;
             						 auctionPost["updatedBy"] = $.aaacplApp.getLoggedInUserId();
             						 auctionPost["deptId"] = $.aaacplApp.queryParams('deptid');
             					$(".overlay").show();
             					$.aaacplApp.ajaxCall("PUT", 'auction/update', function success(response){
             						$(".overlay").hide();
             						if(response.successMessage && response.successMessage !=""){
										$("#ar-"+id+" [data-widget]").click();
										 $.notify("Auction has been updated.", "success");
             							$.aaacplApp.getAuctionList($.aaacplApp.queryParams('deptid'));
             							$("#box-title"+value.auctionId).text(auctionPost.name);
             						} else {
										$.notify("Unable to update auction. Please try again.", "error");
             						}
             					}, function error(msg){
             						$(".overlay").hide();
									$.notify("Unable to update auction. Please try again.", "error");
             					},
             					//POST PAYLOAD
             					JSON.stringify(auctionPost));
             				});

			});
	}
};