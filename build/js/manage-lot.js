$.aaacplApp.manageLot.getLayout = function() {

    /***
     ** COMPLETE LOT PAGE LAYOUT
     **/
    var tmpl = 
        '<div class="box box-solid manage">' +
        '<div class="box-header">' +
        '<h3 class="box-title">Lots</h3>' +
        '<div><a href="javascript:history.back()" class="btn btn-box-tool"><i class="fa fa-arrow-left fa-lg"></i><span id="auctionIdField" style="margin-left: 6px;"></span></a></div>'+
        '<div class="box-tools pull-right">' +
        '<button class="btn bg-orange" data-toggle="modal" data-target="#add-lot-form">Add New Lot</button>' +
        '</div>' +
        '</div>' +
        '<div class="box-body" id="lot-rows-cont">' +
        '</div><!-- /.box-body -->' +
        '<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>' +
        ' </div>' +

        //Modal for adding new lots
        '<div class="modal fade" tabindex="-1" role="dialog" id="add-lot-form" aria-labelledby="model-heading" data-backdrop="static" data-keyboard="false">' +
        '<div class="modal-dialog" role="document">' +
        ' <div class="modal-content box">' +
        '<div class="modal-header">' +
        ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '   <span aria-hidden="true">×</span></button>' +
        ' <h4 class="modal-title" id="model-heading">Add New Lot</h4>' +
        '</div>' +
        '<div id="createLotsFormSection">' +
        '<form id="createLotsForm" class="form" role="form">' +
        '<div class="modal-body">' +
        '<div class="form-group">' +
        ' <label for="lotInputName">Lot Name</label>' +
        ' <input type="text" class="form-control" id="lotInputName" name="name" required>' +
        '</div>' +
		'<!-- Date and time range -->' +
        '<div class="form-group">' +
        ' <label>Lot start and end date:</label>' +
        ' <div class="input-group">' +
        '  <div class="input-group-addon">' +
        '    <i class="fa fa-clock-o"></i>' +
        '  </div>' +
        '  <input type="text" class="form-control pull-right" id="lotDateRange" required>' +
        '</div><!-- /.input group -->' +
        '</div><!-- /.form group -->' +
        '<!-- startBid -->' +
        '<div class="form-group">' +
        '<label>Start Bid</label>' +
        '<input type="text" class="form-control" id="lotStartBid" name="startBid" required>' +
        '</div>' +
        '<!-- Difference Factor-->' +
        '<div class="form-group">' +
        '<label>Increment</label>' +
        '<input type="text" class="form-control" id="lotdifferenceFactor" name="differenceFactor" required>' +
        '</div>' +
        '<!-- Description -->' +
        '<div class="form-group">' +
        '<label>Description</label>' +
        '<textarea class="form-control" id="lotDescription" name="description" required></textarea>' +
        '</div>' +
        '</div>' +
        '<!-- /.modal-body -->' +
        '<div class="modal-footer">' +
        '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>' +
        '  <button type="submit" class="btn bg-orange">Create</button>' +
        '  <button type="reset" class="btn">Reset</button>' +
        '</div>' +
        '</form>' +
        '</div>' + '<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>' +
        '</div>' +
        '<!-- /.modal-content -->' +
        '</div>' +
        '<!-- /.modal-dialog -->' +
        '</div>';

    return tmpl;
};

$.aaacplApp.manageLot.select2CompArr = {};
$.aaacplApp.manageLot.executeScript = function() {
    var _this = this;
    var auctionName;
    var auctionList = $.aaacplApp.dataStorage.auctionList;
    $.each(auctionList, function(key, value) {
        if (value.auctionId == $.aaacplApp.queryParams('auctionid')) {
            auctionName = value.name;
        }
    });
    $('#auctionIdField').html("AUCTION : " + auctionName);

    $.aaacplApp.getParticipatorMasterList();

    var createLotsForm = $('#createLotsForm');

    $('#add-lot-form').on('shown.bs.modal', function() {
        createLotsForm[0].reset();
    });
    // on submit function of form is called to perform client side validation
    createLotsForm.submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser
        var dateRangeValue = $('#lotDateRange').val(); // getting the entire dateRange value
        var formData = createLotsForm.serializeArray(); // JSON data of values entered in form
        var lotsPost = {};
        $.each(formData, function(key, item) {
            lotsPost[item.name] = item.value;
        });
        lotsPost["auctionId"] = $.aaacplApp.queryParams('auctionid');
        lotsPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "";
        lotsPost["endDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "";
        lotsPost["createdBy"] = $.aaacplApp.getLoggedInUserId();
        $(".overlay").show();
        $.aaacplApp.ajaxCall("POST", 'lots/create', function success(response) {
                $(".overlay").hide();
                $("#add-lot-form").modal('hide');
                if (response.successMessage && response.successMessage !="") {
					$.notify("Lot created successfully", "success");
                    lotsPost.id = response.successMessage;
                    $.aaacplApp.dataStorage.lotList.push(lotsPost);
                    _this.loadLotRows();
                } else {
					$.notify("Unable to create lot. Please try again.", "error");
                }
            }, function error(msg) {
                $(".overlay").hide();
                $("#add-lot-form").modal('hide');
				$.notify("Unable to create lot. Please try again.", "error");
            },
            //POST PAYLOAD
            JSON.stringify(lotsPost));
    });

    $('#lotDateRange').daterangepicker({
        timePicker: true,
        timePickerIncrement: 1,
        timePicker24Hour: true,
        format: 'YYYY-MM-DD HH:mm:ss'
    });
    _this.loadLotRows();
};


$.aaacplApp.manageLot.loadLotRows = function() {
    var _this = this;
    if ($.aaacplApp.queryParams('auctionid') != "") {
        $(".overlay").show();
        var lotList = $.aaacplApp.dataStorage.lotList;
        $("#lot-rows-cont").html('');
        $(".overlay").hide();
        $.each(lotList, function(key, value) {
            var lotRow = //Modal for managing participator
                '<div class="modal fade" tabindex="-1" role="dialog" id="manageParticipator-form' + value.id + '" aria-labelledby="model-heading">' +
                '<div class="modal-dialog">' +
                ' <div class="modal-content">' +
                '<div class="modal-header">' +
                ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '   <span aria-hidden="true">×</span></button>' +
                ' <h4 class="modal-title" id="model-heading">Add participators</h4>' +
                '<div><span class="btn-box-tool" id="lotIdField' + value.id + '"></span></div>' +
                '</div>' +
                '<form class="participatorForm" role="form" id="participatorForm' + value.id + '">' +
                '<div class="modal-body">' +
                '<div class="form-group">' +
                ' <label for="deptInputName">Participators </label>' +
                ' <select class="selectParticipator form-control select2" multiple="multiple" id="participatorSelectedList'+value.id+'" data-placeholder="Select user(s)" style="width: 100%;"></select>' +
                '</div>' +
                '<div class="form-group">' +
                '<label class="checkbox-inline"><input type="checkbox" id="isAllSelected' + value.id + '" value="">Apply to all LOTS</label>' +
                '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>' +
                '  <button type="submit" class="btn bg-orange">Assign</button>' +
                '</div>' +
                '</form>' +
                '</div>' +
                '<!-- /.modal-content -->' +
                '</div>' +
                '<!-- /.modal-dialog -->' + '<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>' +
                '</div>' +
                '<div class="box box-default box-solid collapsed-box lot-row" id="lr-' + value.id + '">' +
                ' <div class="box-header with-border">' +
                '  <h3 id="box-title'+value.id+'" class="box-title">' + value.name + '</h3>' +
                ' <div class="box-tools pull-right">' +
                '  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i> EDIT</button>' +
                '  <button type="button" class="btn btn-box-tool" id="manage_participatorBtn" data-toggle="modal" data-target="#manageParticipator-form' + value.id + '"><i class="fa fa-hdd-o"></i> MANAGE PARTICIPATORS</button>' +
                '</div>' +
                '</div>' +
                '<form id="editLotForm' + value.id + '" class="form" role="form">' +
                '<div class="box-body">' +
                '<div class="form-group">' +
                ' <label for="lot' + value.id + 'InputName">Lot Name</label>' +
                ' <input type="text" name="name" class="form-control" id="lot' + value.id + 'InputName" value="' + value.name + '">' +
                '</div>' +
                '<!-- startBid -->' +
                '<div class="form-group">' +
                '<label>Start Bid</label>' +
                '<input type="text" class="form-control" id="lotStartBid" value="' + value.startBid + '" name="startBid" required>' +
                '</div>' +
                '<!-- Difference Factor-->' +
                '<div class="form-group">' +
                '<label>Increment</label>' +
                '<input type="text" class="form-control" id="lotdifferenceFactor" value="' + value.differenceFactor + '" name="differenceFactor" required>' +
                '</div>' +
                '<!-- Date and time range -->' +
                '<div class="form-group">' +
                ' <label>Lot start and end date:</label>' +
                ' <div class="input-group">' +
                '  <div class="input-group-addon">' +
                '    <i class="fa fa-clock-o"></i>' +
                '  </div>' +
                '  <input type="text" class="form-control pull-right" id="lot' + value.id + 'DateRange" value="' + value.startDate + ' - ' + value.endDate + '">' +
                '  </div><!-- /.input group -->' +
                '</div><!-- /.form group -->' +
                '<div class="form-group">' +
                '<label>Status</label>' +
                '<select class="form-control" name="status" id="lot' + value.id + 'status">' +
                '<option value="A">Active</option>' +
                '<option value="I">Inactive</option>' +
                '</select>' +
                '</div>' +
                '<!-- Description -->' +
                '<div class="form-group">' +
                '<label>Description</label>' +
                '<textarea class="form-control" name="description" id="lot' + value.id + 'InputName">' + value.description + '</textarea>' +
                '</div>' +
                '</div>' +
                '<div class="box-footer">' +
                '  <button type="submit" class="btn bg-orange">UPDATE</button>' +
                ' <button type="button" id="resetEditLot" class="btn">Reset</button>' +
                '</div>' +
                '</form>' +
                '</div>';

            $("#lot-rows-cont").append(lotRow);

             if(value.status && value.status == "I"){
             $('#lot' + value.id + 'status').val('I');
             }

            var lotName;
            var lotList = $.aaacplApp.dataStorage.lotList;

            $.each(lotList, function(key, item) {
                if (item.id == value.id) {
                    lotName = value.name;
                }
            });
            $('#lotIdField' + value.id).html("LOT NAME: " + lotName);

            var selectedParticipator = value.linkedUserIds || [];

            $("#participatorSelectedList"+value.id).on("change",function(e){
              selectedParticipator = _this.select2CompArr[e.target.id.replace("participatorSelectedList","")].val() || [];
            });

            $("#resetEditLot").click(function() {
                $("#editLotForm" + value.id)[0].reset();
            });

            $('#lot' + value.id + 'DateRange').daterangepicker({
                timePicker: true,
                timePickerIncrement: 1,
                timePicker24Hour: true,
                format: 'YYYY-MM-DD HH:mm:ss'
            });


            _this.select2CompArr[value.id] = $('#manageParticipator-form' + value.id + ' .selectParticipator').select2({
                data: $.aaacplApp.dataStorage.participatorMasterList || [] /*,
                initSelection: function(element, callback) {
                    var selectedData = [];
                    var linkedUserIds = value.linkedUserIds || [];

                    $.each(linkedUserIds, function(key, item) {
                        $.each($.aaacplApp.dataStorage.participatorMasterList, function(key, value) {
                            if (value.id == item) {
                                selectedData.push(value);  //Push values to data array
                            }
                        });
                    });
                    callback(selectedData); // existing values
                }*/
            });
			_this.select2CompArr[value.id].val(value.linkedUserIds).trigger('change');
			

            $('#participatorForm' + value.id).submit(function(event) {
                var participatorList = {
                    "participatorInfoList": []
                };
                var lotID = event.target.id.replace('participatorForm', '');
                var participatorPost = {
                "userIdList": []
                };
                event.preventDefault(); // Prevent the form from submitting via the browser
                participatorPost.userIdList =  selectedParticipator;// getting selected values

                if ($("#isAllSelected" + value.id).is(':checked')) {
                var lots = $.aaacplApp.dataStorage.lotList;
                    $.each(lots, function(key, item) {
                        participatorList.participatorInfoList.push({"lotId": item.id, "userIdList": []});
                        participatorList.participatorInfoList[key].userIdList = participatorPost.userIdList.concat();
                    });
                } else {
                    participatorPost["lotId"] = lotID;
                    participatorList.participatorInfoList.push(participatorPost);
                }
                $(".overlay").show();
                $.aaacplApp.ajaxCall("POST", 'participator/create', function success(response) {
                        $(".overlay").hide();
                        if (response.successMessage && response.successMessage !="") {
                            $('#manageParticipator-form' + value.id).modal('hide');
							$.notify("Participators added successfully", "success");
							var lots = $.aaacplApp.dataStorage.lotList;
							$.each(lots, function(key, item) {
								_this.select2CompArr[item.id].val(participatorPost.userIdList).trigger('change');
							});
							
							
                        } else {
							$.notify("Unable to add participator. Please try again later.", "error");
                        }
                    }, function error(msg) {
                        $(".overlay").hide();
						$.notify("Unable to add participator. Please try again later.", "error");
                    },
                    //POST PAYLOAD
                    JSON.stringify(participatorList));
            });

            $('#editLotForm' + value.id).submit(function(event) {
                var lotID = event.target.id.replace('editLotForm', '');
                event.preventDefault(); // Prevent the form from submitting via the browser
                var dateRangeValue = $('#lot' + lotID + 'DateRange').val(); // getting the entire dateRange value
                var formData = $('#editLotForm' + lotID).serializeArray(); // JSON data of values entered in form
                var lotsPost = {};
                $.each(formData, function(key, item) {
                    lotsPost[item.name] = item.value;
                });
                lotsPost["id"] = lotID;
                lotsPost["startDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(0, 19) : "";
                lotsPost["endDate"] = typeof dateRangeValue === "string" ? dateRangeValue.substr(21, 20) : "";
                lotsPost["updatedBy"] = $.aaacplApp.getLoggedInUserId();
                lotsPost["auctionId"] = $.aaacplApp.queryParams('auctionid');
                $(".overlay").show();
                $.aaacplApp.ajaxCall("PUT", 'lots/update', function success(response) {
                        $(".overlay").hide();
                        if (response.successMessage && response.successMessage != "") {
                            $("#lr-" + lotID + " [data-widget]").click();
							$.notify("Lot updated successfully", "success");
                            $.aaacplApp.getLotList($.aaacplApp.queryParams('auctionid'));
                            $("#box-title"+value.id).text(lotsPost.name);
                        } else {
							$.notify("Unable to update lot. Please try again.", "error");
                        }
                    }, function error(msg) {
                        $(".overlay").hide();
						$.notify("Unable to update lot. Please try again.", "error");
                    },
                    //POST PAYLOAD
                    JSON.stringify(lotsPost));
            });
        });
    }
};