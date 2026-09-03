import { runWithConcurrency } from '../async/runWithConcurrency';
import { WorkspaceContext } from '../context/createWorkspaceContext';
import { createOperationPending } from '../context/operations/createOperationPending';
import { scanCheckoutState } from '../scan/scanCheckoutState';

export async function scanAllCheckoutsStates(ctx: WorkspaceContext): Promise<void> {
	ctx.log.log(createOperationPending('scan-all-checkouts'));
	await runWithConcurrency(ctx.store.getAllCheckouts(), 4, async checkout => {
		const updated = await scanCheckoutState(ctx, checkout);
		ctx.store.updateCheckout(updated);
	});
}
