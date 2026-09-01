import { pullWorkspaceCheckout } from '../../private/commands/workspaces/pullWorkspaceCheckout';
import { scanWorkspaceCheckout } from '../../private/commands/workspaces/scanWorkspaceCheckout';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { presentCheckoutReport } from '../../private/present/presentCheckoutReport';
import { presentExtraneousReport } from '../../private/present/presentExtraneousReport';
import { presentOperationsReport } from '../../private/present/presentOperationsReport';
import { presentWorkspaceReport } from '../../private/present/presentWorkspaceReport';
import { loadCheckoutRecords } from '../../private/resources/checkout/loadCheckoutRecords';
import { loadRepositoryRecords } from '../../private/resources/repository/loadRepositoryRecords';
import { hydrateStoreFromRecords } from '../../private/store/hydrateStoreFromRecords';
import { scanAllCheckoutsStates } from '../../private/store/scanAllCheckoutsStates';

import { pushCleanCheckouts } from './private/pushCleanCheckouts';
import { scanExtraneousCheckouts } from './private/scanExtraneousCheckouts';

export async function runSanity(ctx: WorkspaceContext, options: { auto: boolean }): Promise<void> {
	const repos = await loadRepositoryRecords(ctx.config);
	const records = await loadCheckoutRecords(ctx.config, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	await scanWorkspaceCheckout(ctx);

	await scanAllCheckoutsStates(ctx.store);
	if (options.auto) {
		await pullWorkspaceCheckout(ctx);
		await pushCleanCheckouts(ctx);
	}

	const extraneous = await scanExtraneousCheckouts(ctx.config, ctx.store);

	const workspaceIssues = ctx.workspace?.scan
		? ctx.workspace.scan
				.issues()
				.filter(i => i !== 'unknown project' && i !== 'no remote' && i !== 'wrong remote')
		: [];
	const filteredWorkspace = ctx.workspace
		? {
				...ctx.workspace,
				scan: ctx.workspace.scan
					? { ...ctx.workspace.scan, issues: () => workspaceIssues }
					: undefined,
			}
		: undefined;

	presentWorkspaceReport(filteredWorkspace);
	presentCheckoutReport(ctx.config, ctx.store.getAllCheckouts());
	presentExtraneousReport(extraneous);
	presentOperationsReport(ctx.log);
}
