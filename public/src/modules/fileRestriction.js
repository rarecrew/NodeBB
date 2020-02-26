'use strict';

define('fileRestriction', function () {
	var module = {};

	module.show = function (data, callback) {
		socket.emit('groups.getGroups', function (err, groupList) {
			if (err) {
				return app.alertError(err.message);
			}
			if (groupList) {
				socket.emit('groups.getFileGroupRestrictions', { fileName: data.params.file }, function (err, restrictionList) {
					if (err) {
						return app.alertError(err.message);
					}
					if (restrictionList) {
						var restrictionTable = [];
						var updatedRestrictionTable = [];
						restrictionTable = prepareFileRestrictionTable(groupList, restrictionList);

						app.parseAndTranslate('admin/manage/restrict-file', {
							groups: restrictionTable,
						}, function (restrictFileModal) {
							restrictFileModal = $(restrictFileModal);
							restrictFileModal.modal('show');
							restrictFileModal.on('hidden.bs.modal', function () {
								restrictFileModal.remove();
							});

							restrictFileModal.find('.save-btn').on('click', function () {
								$('#restrictionTable input[type="checkbox"]').each(function () {
									if ($(this).prop('checked')) {
										updatedRestrictionTable.push({ groupName: $(this).attr('name') });
									}
								});

								socket.emit('groups.setFileGroupRestrictions', { fileName: data.params.file, fileRestrictions: updatedRestrictionTable }, function (err) {
									if (err) {
										return app.alertError(err.message);
									}
								});

								restrictFileModal.modal('hide');
								restrictFileModal.remove();
							});
						});
					}
				});
			}
		});
		callback();
	};

	function prepareFileRestrictionTable(groupList, restrictionList) {
		var table = [];
		groupList.forEach((element) => {
			table.push({ groupName: element, access: 0 });
		});

		restrictionList.forEach((element) => {
			var index = table.findIndex(x => x.groupName === element.groupName);
			if (index > -1) {
				table[index].access = element.access;
			}
		});

		return table;
	}

	return module;
});
