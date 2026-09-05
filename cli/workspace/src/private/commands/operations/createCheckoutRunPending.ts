import type { CheckoutRunPending } from '../../operations/types';
import type { Checkout } from '../../store/createCheckout';

export function createCheckoutRunPending(checkout: Checkout, command: string): CheckoutRunPending {
	return {
		ts: new Date(),
		checkout,
		outcome: 'pending',
		operation: 'run',
		command,
		message() {
			return command;
		},
	};
}
