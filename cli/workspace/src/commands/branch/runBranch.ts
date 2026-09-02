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
	options: { branch: string; checkoutLocations: string[] },
): Promise<void> {
	const repos = await loadRepositoryRecords(ctx);
	const records = await loadCheckoutRecords(ctx, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	ctx.log.log(
		createOperationPending('command', ['branch', options.branch, options.checkoutLocations]),
	);

	const { branch, checkoutLocations } = options;
	const checkouts = ctx.store.getAllCheckouts();

	const locations =
		checkoutLocations.length > 0 ? checkoutLocations : checkouts.map(c => c.record.location);

	for (const location of locations) {
		const checkout = ctx.store.getCheckoutForLocation(location);
		if (!checkout) {
			ctx.log.log(createBranchFailure(branch, 'not cloned', checkout));
			continue;
		}

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
