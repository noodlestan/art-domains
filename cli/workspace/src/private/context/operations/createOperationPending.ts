import type { GenericOperationPending } from '../../operations/types';

function formatData(data: unknown): string {
	return data ? JSON.stringify(data) : '';
}

export function createOperationPending(operation: string, data?: unknown): GenericOperationPending {
	return {
		ts: new Date(),
		outcome: 'pending',
		operation,
		data,
		message() {
			return formatData(data);
		},
	};
}
