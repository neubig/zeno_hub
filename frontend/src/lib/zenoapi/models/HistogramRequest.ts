/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FilterPredicateGroup } from './FilterPredicateGroup';
import type { HistogramColumnRequest } from './HistogramColumnRequest';
import type { Metric } from './Metric';

/**
 * Specification of a histogram request in Zeno.
 */
export type HistogramRequest = {
	columnRequests: Array<HistogramColumnRequest>;
	filterPredicates?: FilterPredicateGroup | null;
	model?: string | null;
	metric?: Metric | null;
	items?: Array<string> | null;
};
