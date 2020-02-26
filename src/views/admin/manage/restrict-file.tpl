<div id="row restrict-file" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h3>[[admin/manage/uploads:file-restrictions]]</h3>
				<p>[[admin/manage/uploads:file-restrictions-info]]</p>
			</div>

			<div class="modal-body">
				<div class="col-xs-12">

					<table class="table table-striped groups-list">
						<thead>
							<tr>
								<th>[[admin/manage/uploads:group-name]]</th>
								<th>[[admin/manage/uploads:has-access]]</th>
							</tr>
						</thead>
						<tbody id="restrictionTable">
							<!-- BEGIN groups -->
							<tr data-group-name="{groups.groupName}">
								<td>
									{groups.groupName}
								</td>
								<td>
									<input type="checkbox" class="mdl-switch__input" name="{groups.groupName}" <!-- IF groups.access -->checked<!-- ENDIF groups.access --> />
								</td>
							</tr>
							<!-- END groups -->
						</tbody>
						<tfoot>
							<tr>
								<td colspan="6"><br /><br /></td>
							</tr>
						</tfoot>
					</table>
					<!-- IMPORT partials/paginator.tpl -->

				</div>
			</div>

			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal" aria-hidden="true">Close</button>
				<button class="btn btn-primary save-btn" data-dismiss="modal" aria-hidden="true">Save</button>
			</div>

		</div>
	</div>
</div>

