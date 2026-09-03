import { runWithConcurrency } from '../../private/async/runWithConcurrency';
import { doPullCheckout } from '../../private/commands/checkouts/doPullCheckout';
import { doPushCheckout } from '../../private/commands/checkouts/doPushCheckout';
import { pushWorkspaceCheckout } from '../../private/commands/workspaces/pushWorkspaceCheckout';
import { scanWorkspaceCheckout } from '../../private/commands/workspaces/scanWorkspaceCheckout';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { createOperationPending } from '../../private/context/operations/createOperationPending';
import { presentCheckoutReport } from '../../private/present/presentCheckoutReport';
import { presentOperationsReport } from '../../private/present/presentOperationsReport';
import { loadCheckoutRecords } from '../../private/resources/checkout/loadCheckoutRecords';
import { loadRepositoryRecords } from '../../private/resources/repository/loadRepositoryRecords';
import { hydrateStoreFromRecords } from '../../private/store/hydrateStoreFromRecords';
import { scanAllCheckoutsStates } from '../../private/store/scanAllCheckoutsStates';

export async function runPush(ctx: WorkspaceContext): Promise<void> {
	const repos = await loadRepositoryRecords(ctx);
	const records = await loadCheckoutRecords(ctx, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	ctx.log.log(createOperationPending('command', ['push']));

	await scanAllCheckoutsStates(ctx);

	await runWithConcurrency(ctx.store.getAllCheckouts(), 4, async checkout => {
		if (checkout.scan?.can?.('push') && checkout.scan.should?.('push')) {
			if (checkout.scan.should?.('pull')) {
				await doPullCheckout(ctx, checkout);
			}
			const current = ctx.store.getCheckoutForLocation(checkout.record.location) ?? checkout;
			await doPushCheckout(ctx, current);
		}
	});

	await scanWorkspaceCheckout(ctx);
	await pushWorkspaceCheckout(ctx);

	presentCheckoutReport(ctx.config, ctx.store.getAllCheckouts());
	presentOperationsReport(ctx.log);
}
