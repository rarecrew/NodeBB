'use strict';


define('admin/manage/uploads', ['uploader', 'fileRestriction'], function (uploader, fileRestriction) {
	var Uploads = {};

	Uploads.init = function () {
		$('#upload').on('click', function () {
			uploader.show({
				title: '[[admin/manage/uploads:upload-file]]',
				route: config.relative_path + '/api/admin/upload/file',
				params: { folder: ajaxify.data.currentFolder },
			}, function () {
				ajaxify.refresh();
			});
		});

		$('.delete').on('click', function () {
			var file = $(this).parents('[data-path]');
			bootbox.confirm('[[admin/manage/uploads:confirm-delete]]', function (ok) {
				if (!ok) {
					return;
				}
				socket.emit('admin.uploads.delete', file.attr('data-path'), function (err) {
					if (err) {
						return app.alertError(err.message);
					}
					file.remove();
				});
			});
		});

		$('.restrict').on('click', function () {
			var file = $(this).parents('[data-path]');
			fileRestriction.show({
				title: '[[admin/manage/uploads:file-restriction]]',
				route: config.relative_path + '/api/admin/upload/restriction',
				params: {
					file: file[0].dataset.path,
				},
			}, function () {
				ajaxify.refresh();
			});
		});
	};

	return Uploads;
});
