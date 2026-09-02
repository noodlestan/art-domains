import { WorkspaceContext } from '../context/createWorkspaceContext';
import { createOperationPending } from '../context/operations/createOperationPending';
import { scanCheckoutState } from '../scan/scanCheckoutState';

export async function scanAllCheckoutsStates(ctx: WorkspaceContext): Promise<void> {
	ctx.log.log(createOperationPending('scan-all-checkouts'));
	for (const checkout of ctx.store.getAllCheckouts()) {
		const updated = await scanCheckoutState(ctx, checkout);
		ctx.store.updateCheckout(updated);
	}
}
