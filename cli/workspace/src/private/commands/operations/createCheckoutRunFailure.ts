import type { CheckoutRunFailure } from '../../operations/types';
import type { Checkout } from '../../store/createCheckout';

function formatRawError(raw: string): string {
	const lines = raw
		.split('\n')
		.map(l => l.trim())
		.filter(l => l.length > 0);
	return lines.map(l => '  ' + l).join('\n');
}

function extractReason(raw: string): string {
	const match = raw.match(/\(([^)]+)\)/);
	return match ? match[1] : (raw.split('\n')[0]?.trim() ?? 'unknown error');
}

export function createCheckoutRunFailure(
	checkout: Checkout,
	command: string,
	error: unknown,
): CheckoutRunFailure {
	const rawError = error instanceof Error ? error.message : String(error);

	return {
		ts: new Date(),
		checkout,
		outcome: 'failure',
		operation: 'run',
		command,
		error: rawError,
		message() {
			return `${command} — ${extractReason(rawError)}`;
		},
		timing() {
			return this.finishedTs ? this.finishedTs.getTime() - this.ts.getTime() : NaN;
		},
		errorSerialized() {
			return `CheckoutRunError: ${checkout.repo?.name} — ${command}\n\n${formatRawError(rawError)}`;
		},
	};
}
