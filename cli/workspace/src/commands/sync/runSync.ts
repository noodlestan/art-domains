import { runWithConcurrency } from '../../private/async/runWithConcurrency';
import { doPullCheckout } from '../../private/commands/checkouts/doPullCheckout';
import { doPushCheckout } from '../../private/commands/checkouts/doPushCheckout';
import { syncWorkspaceCheckout } from '../../private/commands/workspaces/syncWorkspaceCheckout';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { createOperationPending } from '../../private/context/operations/createOperationPending';
import { presentCheckoutReport } from '../../private/present/presentCheckoutReport';
import { presentOperationsReport } from '../../private/present/presentOperationsReport';
import { loadCheckoutRecords } from '../../private/resources/checkout/loadCheckoutRecords';
import { loadRepositoryRecords } from '../../private/resources/repository/loadRepositoryRecords';
import { hydrateStoreFromRecords } from '../../private/store/hydrateStoreFromRecords';
import { scanAllCheckoutsStates } from '../../private/store/scanAllCheckoutsStates';

export async function runSync(ctx: WorkspaceContext): Promise<void> {
	const repos = await loadRepositoryRecords(ctx);
	const records = await loadCheckoutRecords(ctx, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	ctx.log.log(createOperationPending('command', ['sync']));

	await scanAllCheckoutsStates(ctx);

	await runWithConcurrency(ctx.store.getAllCheckouts(), 4, async checkout => {
		if (checkout.scan?.can?.('pull')) {
			const pulled = checkout.scan.should?.('pull')
				? await doPullCheckout(ctx, checkout)
				: checkout;
			if (pulled?.scan?.can?.('push') && pulled.scan.should?.('push')) {
				await doPushCheckout(ctx, pulled);
			}
		}
	});

	await syncWorkspaceCheckout(ctx);

	presentCheckoutReport(ctx.config, ctx.store.getAllCheckouts());
	presentOperationsReport(ctx.log);
}
