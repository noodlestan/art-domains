import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { createOperationPending } from '../../private/context/operations/createOperationPending';
import { loadCheckoutRecords } from '../../private/resources/checkout/loadCheckoutRecords';
import { loadRepositoryRecords } from '../../private/resources/repository/loadRepositoryRecords';
import { hydrateStoreFromRecords } from '../../private/store/hydrateStoreFromRecords';

import { cloneAll } from './cloneAll';
import { cloneSpecific } from './cloneSpecific';
import { cloneStatus } from './cloneStatus';

interface CloneOptions {
	all?: boolean;
	repoName?: string;
	checkoutInput?: string;
}

export async function runClone(
	ctx: WorkspaceContext,
	{ all, repoName, checkoutInput }: CloneOptions,
): Promise<WorkspaceContext> {
	const repos = await loadRepositoryRecords(ctx);
	const records = await loadCheckoutRecords(ctx, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	ctx.log.log(createOperationPending('command', ['clone', { all, repoName, checkoutInput }]));

	if (all) {
		await cloneAll(ctx, repos);
	} else if (repoName) {
		await cloneSpecific(ctx, repos, repoName, checkoutInput);
	} else {
		await cloneStatus(ctx);
	}

	return ctx;
}
