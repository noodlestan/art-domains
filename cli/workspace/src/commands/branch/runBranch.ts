import { doBranchCheckout } from '../../private/commands/checkouts/doBranchCheckout';
import { createBranchFailure } from '../../private/commands/operations/createBranchFailure';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { createOperationPending } from '../../private/context/operations/createOperationPending';
import { presentCheckoutReport } from '../../private/present/presentCheckoutReport';
import { presentOperationsReport } from '../../private/present/presentOperationsReport';
import { loadCheckoutRecords } from '../../private/resources/checkout/loadCheckoutRecords';
import { loadRepositoryRecords } from '../../private/resources/repository/loadRepositoryRecords';
import { scanCheckoutState } from '../../private/scan/scanCheckoutState';
import { hydrateStoreFromRecords } from '../../private/store/hydrateStoreFromRecords';
import { scanAllCheckoutsStates } from '../../private/store/scanAllCheckoutsStates';

export async function runBranch(
	ctx: WorkspaceContext,
	options: { branch: string; checkouts?: string[] },
): Promise<void> {
	const repos = await loadRepositoryRecords(ctx);
	const records = await loadCheckoutRecords(ctx, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	ctx.log.log(createOperationPending('command', ['branch', options.branch, options.checkouts]));

	const { branch, checkouts } = options;
	const resolvedCheckouts =
		checkouts && checkouts.length > 0
			? ctx.store.getCheckoutsByPattern(checkouts)
			: ctx.store.getAllCheckouts();

	for (const checkout of resolvedCheckouts) {
		const scanned = await scanCheckoutState(ctx, checkout);
		ctx.store.updateCheckout(scanned);

		if (!scanned.scan?.can?.('branch')) {
			ctx.log.log(createBranchFailure(branch, 'checkout not cloned', scanned));
			continue;
		}

		await doBranchCheckout(ctx, scanned, branch);
	}

	await scanAllCheckoutsStates(ctx);
	presentCheckoutReport(ctx.config, ctx.store.getAllCheckouts());
	presentOperationsReport(ctx.log);
}
