import type { ClonePending } from '../../operations/types';
import type { Checkout } from '../../store/createCheckout';

export function createClonePending(checkout: Checkout): ClonePending {
	return {
		ts: new Date(),
		checkout,
		outcome: 'pending',
		operation: 'clone',
		location: checkout.record.location,
		message() {
			return `to ${checkout.record.location}`;
		},
	};
}
