import { doPullCheckout } from '../../private/commands/checkouts/doPullCheckout';
import { pullWorkspaceCheckout } from '../../private/commands/workspaces/pullWorkspaceCheckout';
import { scanWorkspaceCheckout } from '../../private/commands/workspaces/scanWorkspaceCheckout';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { createOperationPending } from '../../private/context/operations/createOperationPending';
import { presentCheckoutReport } from '../../private/present/presentCheckoutReport';
import { presentOperationsReport } from '../../private/present/presentOperationsReport';
import { loadCheckoutRecords } from '../../private/resources/checkout/loadCheckoutRecords';
import { loadRepositoryRecords } from '../../private/resources/repository/loadRepositoryRecords';
import { hydrateStoreFromRecords } from '../../private/store/hydrateStoreFromRecords';
import { scanAllCheckoutsStates } from '../../private/store/scanAllCheckoutsStates';

export async function runPull(ctx: WorkspaceContext): Promise<void> {
	const repos = await loadRepositoryRecords(ctx);
	const records = await loadCheckoutRecords(ctx, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	ctx.log.log(createOperationPending('command', ['pull']));

	await scanAllCheckoutsStates(ctx);

	for (const checkout of ctx.store.getAllCheckouts()) {
		if (checkout.scan?.can?.('pull') && checkout.scan.should?.('pull')) {
			await doPullCheckout(ctx, checkout);
		}
	}

	await scanWorkspaceCheckout(ctx);
	await pullWorkspaceCheckout(ctx);

	presentCheckoutReport(ctx.config, ctx.store.getAllCheckouts());
	presentOperationsReport(ctx.log);
}
