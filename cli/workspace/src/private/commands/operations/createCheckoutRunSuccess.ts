import type { CheckoutRunSuccess } from '../../operations/types';
import type { Checkout } from '../../store/createCheckout';

export function createCheckoutRunSuccess(checkout: Checkout, command: string): CheckoutRunSuccess {
	return {
		ts: new Date(),
		checkout,
		outcome: 'success',
		operation: 'run',
		command,
		message() {
			return command;
		},
	};
}
