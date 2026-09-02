import type { GenericOperationFailure } from '../../operations/types';

function formatRawError(raw: string): string {
	const lines = raw
		.split('\n')
		.map(l => l.trim())
		.filter(l => l.length > 0);
	return lines.map(l => '  ' + l).join('\n');
}

function formatData(data: unknown): string {
	return data ? JSON.stringify(data) : '';
}

export function createOperationFailure(
	operation: string,
	error: unknown,
	data?: unknown,
): GenericOperationFailure {
	const rawError = error instanceof Error ? error.message : String(error);
	return {
		ts: new Date(),
		outcome: 'failure',
		operation,
		error: rawError,
		data,
		message() {
			return rawError;
		},
		errorSerialized() {
			const d = formatData(data);
			return `Error: ${operation} — ${d ? d + ' ' : ''}${this.message()}\n\n${formatRawError(rawError)}`;
		},
	};
}
