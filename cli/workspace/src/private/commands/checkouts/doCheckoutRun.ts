import type { WorkspaceContext } from '../../context/createWorkspaceContext';
import { runCommandInDirectory } from '../../exec/runCommandInDirectory';
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
		const runOutcome = await runCommandInDirectory(checkout.path, command);
		if (runOutcome.code === 0) {
			ctx.log.log(createCheckoutRunSuccess(checkout, commandLine));
		} else {
			ctx.log.log(
				createCheckoutRunFailure(checkout, commandLine, new Error(`Exit code: ${runOutcome.code}`)),
			);
		}
		if (!runOutcome.output.trim() && !runOutcome.error.trim()) {
			console.info('\n--- [No output]\n');
		} else {
			if (runOutcome.output) {
				console.info('\n--- Output:\n');
				console.info(runOutcome.output);
				console.info('');
			}
			if (runOutcome.error) {
				console.error('\n--- Error:\n');
				console.error(runOutcome.error);
				console.error('');
			}
		}
		return checkout;
	} catch (error) {
		const op = createCheckoutRunFailure(checkout, commandLine, error);
		ctx.log.log(op);
		return null;
	}
}
