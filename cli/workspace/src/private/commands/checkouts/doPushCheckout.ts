import type { WorkspaceContext } from '../../context/createWorkspaceContext';
import { pushCheckout } from '../../git/pushCheckout';
import { scanCheckoutState } from '../../scan/scanCheckoutState';
import type { Checkout } from '../../store/createCheckout';
import { createPushFailure } from '../operations/createPushFailure';
import { createPushPending } from '../operations/createPushPending';
import { createPushSuccess } from '../operations/createPushSuccess';

export async function doPushCheckout(
	ctx: WorkspaceContext,
	checkout: Checkout,
): Promise<Checkout | null> {
	try {
		ctx.log.log(createPushPending(checkout, checkout.record.branch));
		await pushCheckout(checkout);
		const updated = await scanCheckoutState(ctx, checkout);
		ctx.store.updateCheckout(updated);
		ctx.log.log(createPushSuccess(checkout, checkout.record.branch));
		return updated;
	} catch (error) {
		const op = createPushFailure(checkout, checkout.record.branch, error);
		ctx.log.log(op);
		return null;
	}
}
