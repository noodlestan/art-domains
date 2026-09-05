import type { BranchSuccess } from '../../operations/types';
import type { Checkout } from '../../store/createCheckout';

export function createBranchSuccess(
	checkout: Checkout,
	branch: string,
	message?: string,
): BranchSuccess {
	return {
		ts: new Date(),
		checkout,
		outcome: 'success',
		operation: 'branch',
		branch,
		message() {
			return message || '<empty>';
		},
		timing() {
			return this.finishedTs ? this.finishedTs.getTime() - this.ts.getTime() : NaN;
		},
	};
}
