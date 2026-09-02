import type { WorkspaceContext } from '../../context/createWorkspaceContext';
import { pullCheckout } from '../../git/pullCheckout';
import { scanCheckoutState } from '../../scan/scanCheckoutState';
import type { Checkout } from '../../store/createCheckout';
import { createPullFailure } from '../operations/createPullFailure';
import { createPullPending } from '../operations/createPullPending';
import { createPullSuccess } from '../operations/createPullSuccess';

export async function doPullCheckout(
	ctx: WorkspaceContext,
	checkout: Checkout,
): Promise<Checkout | null> {
	try {
		ctx.log.log(createPullPending(checkout, checkout.record.branch));
		await pullCheckout(checkout);
		const updated = await scanCheckoutState(ctx, checkout);
		ctx.store.updateCheckout(updated);
		ctx.log.log(createPullSuccess(checkout, checkout.record.branch));
		return updated;
	} catch (error) {
		const op = createPullFailure(checkout, checkout.record.branch, error);
		ctx.log.log(op);
		return null;
	}
}
