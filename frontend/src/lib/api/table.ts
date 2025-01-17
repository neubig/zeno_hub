import { projectConfig } from '$lib/stores';
import type { FilterPredicateGroup, ZenoColumn } from '$lib/zenoapi';
import { ZenoService } from '$lib/zenoapi';
import { ZenoColumnType } from '$lib/zenoapi/models/ZenoColumnType';
import { get } from 'svelte/store';

export async function getFilteredTable(
	completeColumns: ZenoColumn[],
	filterModels: string[],
	diffColumn: ZenoColumn | undefined,
	offset: number,
	limit: number,
	sort: [ZenoColumn | undefined, boolean],
	items: string[],
	filterPredicates?: FilterPredicateGroup
) {
	const requestedColumns = completeColumns.filter(
		(c) =>
			c.columnType !== ZenoColumnType.EMBEDDING &&
			c.model !== undefined &&
			c.model !== null &&
			(filterModels.includes(c.model) || c.model === '')
	);

	// create diff columns for comparison view
	let diffColumn1 = undefined;
	let diffColumn2 = undefined;
	if (diffColumn) {
		diffColumn1 = Object.assign({}, diffColumn);
		diffColumn2 = Object.assign({}, diffColumn);
		const addModel = [ZenoColumnType.POSTDISTILL, ZenoColumnType.OUTPUT].includes(
			diffColumn.columnType
		);
		diffColumn1.model = addModel ? filterModels[0] : '';
		diffColumn2.model = addModel ? filterModels[1] : '';
	}

	const project = get(projectConfig);
	if (!project) {
		return Promise.reject('No project selected.');
	}
	const res = await ZenoService.getFilteredTable(project.uuid, {
		columns: requestedColumns,
		diffColumn1,
		diffColumn2,
		filterPredicates,
		offset,
		limit,
		sort,
		items
	});
	return JSON.parse(res);
}
