import type { WorkspaceContext } from '../context/createWorkspaceContext';
import { cloneCheckout } from '../git/cloneCheckout';
import { getCurrentBranch } from '../git/getCurrentBranch';
import { saveCheckoutRecord } from '../resources/checkout/saveCheckoutRecord';
import { scanCheckoutState } from '../scan/scanCheckoutState';
import type { Checkout } from '../store/createCheckout';

import { createCloneFailure } from './operations/createCloneFailure';
import { createClonePending } from './operations/createClonePending';
import { createCloneSuccess } from './operations/createCloneSuccess';

export async function doClone(ctx: WorkspaceContext, checkout: Checkout): Promise<Checkout | null> {
	if (!checkout.repo) return null;

	try {
		ctx.log.log(createClonePending(checkout));
		await cloneCheckout(checkout);
		const rescan = await scanCheckoutState(ctx, checkout);
		ctx.store.updateCheckout(rescan);
		ctx.log.log(createCloneSuccess(rescan));

		const actualBranch = await getCurrentBranch(checkout.path);
		await saveCheckoutRecord(ctx.config, {
			name: rescan.record.name,
			repository: rescan.repo?.name,
			location: rescan.record.location,
			branch: actualBranch || rescan.record.branch || 'main',
		});

		return rescan;
	} catch (error) {
		ctx.log.log(createCloneFailure(checkout, error));
		return null;
	}
}
