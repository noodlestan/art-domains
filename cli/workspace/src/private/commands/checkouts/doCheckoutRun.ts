import type { WorkspaceContext } from '../../context/createWorkspaceContext';
import type { Checkout } from '../../store/createCheckout';
import { createCheckoutRunFailure } from '../operations/createCheckoutRunFailure';
import { createCheckoutRunPending } from '../operations/createCheckoutRunPending';
import { createCheckoutRunSuccess } from '../operations/createCheckoutRunSuccess';

export async function doCheckoutRun(
	ctx: WorkspaceContext,
	checkout: Checkout,
	command: string[],
): Promise<Checkout | null> {
	const commandLine = command.join(' ');

	if (!checkout.scan?.state('exists').exists) {
		const op = createCheckoutRunFailure(checkout, commandLine, new Error('checkout not cloned'));
		ctx.log.log(op);
		return null;
	}

	try {
		ctx.log.log(createCheckoutRunPending(checkout, commandLine));
		// Execution placeholder: resolve the checkout. The real spawn is added in Step 5.
		ctx.log.log(createCheckoutRunSuccess(checkout, commandLine));
		return checkout;
	} catch (error) {
		const op = createCheckoutRunFailure(checkout, commandLine, error);
		ctx.log.log(op);
		return null;
	}
}
