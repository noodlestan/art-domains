import { runWithConcurrency } from '../../private/async/runWithConcurrency';
import { doPullCheckout } from '../../private/commands/checkouts/doPullCheckout';
import { doPullWorkspaceCheckout } from '../../private/commands/workspaces/doPullWorkspaceCheckout';
import { scanWorkspaceCheckout } from '../../private/commands/workspaces/scanWorkspaceCheckout';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { createOperationPending } from '../../private/context/operations/createOperationPending';
import { presentCheckoutReport } from '../../private/present/presentCheckoutReport';
import { presentOperationsReport } from '../../private/present/presentOperationsReport';
import { loadCheckoutRecords } from '../../private/resources/checkout/loadCheckoutRecords';
import { loadRepositoryRecords } from '../../private/resources/repository/loadRepositoryRecords';
import { hydrateStoreFromRecords } from '../../private/store/hydrateStoreFromRecords';
import { scanAllCheckoutsStates } from '../../private/store/scanAllCheckoutsStates';

export async function runPull(
	ctx: WorkspaceContext,
	options: { checkouts?: string[] } = {},
): Promise<void> {
	const repos = await loadRepositoryRecords(ctx);
	const records = await loadCheckoutRecords(ctx, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	ctx.log.log(createOperationPending('command', ['pull', options.checkouts]));

	await scanAllCheckoutsStates(ctx);

	const checkouts =
		options.checkouts && options.checkouts.length > 0
			? ctx.store.getCheckoutsByPattern(options.checkouts)
			: ctx.store.getAllCheckouts();

	await runWithConcurrency(checkouts, 4, async checkout => {
		if (checkout.scan?.can?.('pull') && checkout.scan.should?.('pull')) {
			await doPullCheckout(ctx, checkout);
		}
	});

	await scanWorkspaceCheckout(ctx);
	await doPullWorkspaceCheckout(ctx);

	presentCheckoutReport(ctx.config, checkouts);
	presentOperationsReport(ctx.log);
}
