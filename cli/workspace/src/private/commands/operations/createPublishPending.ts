import type { PublishPending } from '../../operations/types';
import type { Checkout } from '../../store/createCheckout';

export function createPublishPending(
	checkout: Checkout | undefined,
	pkg: string,
	version: string,
): PublishPending {
	return {
		ts: new Date(),
		checkout,
		outcome: 'pending',
		operation: 'publish',
		package: pkg,
		version,
		message() {
			return `publishing ${pkg}@${version}`;
		},
	};
}
