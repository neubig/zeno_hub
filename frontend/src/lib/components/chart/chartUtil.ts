import { metrics, models, slices } from '$lib/stores';
import {
	ChartType,
	SlicesMetricsOrModels,
	SlicesOrModels,
	type BeeswarmParameters,
	type Chart,
	type HeatmapParameters,
	type RadarParameters,
	type TableParameters,
	type XCParameters
} from '$lib/zenoapi';
import type { ComponentType } from 'svelte';
import { get } from 'svelte/store';
import BarChart from './chart-types/bar-chart/BarChart.svelte';
import BeeswarmChart from './chart-types/beeswarm-chart/BeeswarmChart.svelte';
import HeatMap from './chart-types/heatmap-chart/HeatMap.svelte';
import LineChart from './chart-types/line-chart/LineChart.svelte';
import RadarChart from './chart-types/radar-chart/RadarChart.svelte';
import Table from './chart-types/table/Table.svelte';

export function chartDefaults(name: string, id: number, type: ChartType): Chart {
	switch (type) {
		case ChartType.BAR:
		case ChartType.LINE:
			return {
				id: id,
				name: name,
				type: type,
				parameters: <XCParameters>{
					slices: get(slices)
						.map((slice) => slice.id)
						.slice(0, 2),
					metric: 1,
					models: get(models),
					xChannel: SlicesOrModels.SLICES,
					colorChannel: SlicesOrModels.MODELS
				}
			};
		case ChartType.TABLE:
			return {
				id: id,
				name: name,
				type: ChartType.TABLE,
				parameters: <TableParameters>{
					models: get(models),
					slices: get(slices)
						.map((slice) => slice.id)
						.slice(0, 2),
					metrics: [1],
					xChannel: SlicesMetricsOrModels.MODELS,
					yChannel: SlicesOrModels.SLICES,
					fixedChannel: SlicesMetricsOrModels.METRICS
				}
			};
		case ChartType.BEESWARM:
			return {
				id: id,
				name: name,
				type: ChartType.BEESWARM,
				parameters: <BeeswarmParameters>{
					models: [get(models)[0]],
					slices: get(slices)
						.map((slice) => slice.id)
						.slice(0, 2),
					metrics: get(metrics).map((metric) => metric.id),
					yChannel: SlicesOrModels.MODELS,
					colorChannel: SlicesOrModels.SLICES,
					fixedDimension: 'y'
				}
			};
		case ChartType.RADAR:
			return {
				id: id,
				name: name,
				type: ChartType.RADAR,
				parameters: <RadarParameters>{
					models: [get(models)[0]],
					slices: get(slices)
						.map((slice) => slice.id)
						.slice(0, 2),
					metrics: get(metrics).map((metric) => metric.id),
					axisChannel: SlicesMetricsOrModels.METRICS,
					fixedChannel: SlicesMetricsOrModels.MODELS,
					layerChannel: SlicesOrModels.SLICES
				}
			};
		case ChartType.HEATMAP:
			return {
				id: id,
				name: name,
				type: ChartType.HEATMAP,
				parameters: <HeatmapParameters>{
					xValues: get(slices)
						.map((slice) => slice.id)
						.slice(0, 2),
					yValues: get(models),
					metric: 1,
					model: get(models)[0],
					xChannel: SlicesOrModels.SLICES,
					yChannel: SlicesOrModels.MODELS
				}
			};
	}
}

export const chartMap: Record<string, ComponentType> = {
	[ChartType.BAR]: BarChart,
	[ChartType.LINE]: LineChart,
	[ChartType.TABLE]: Table,
	[ChartType.BEESWARM]: BeeswarmChart,
	[ChartType.RADAR]: RadarChart,
	[ChartType.HEATMAP]: HeatMap
};
