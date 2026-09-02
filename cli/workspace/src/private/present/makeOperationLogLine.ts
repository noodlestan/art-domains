import type { OperationBase } from '../operations/types';

export function makeOperationLogLine(op: OperationBase): string[] {
	return [
		op.outcome === 'pending' ? '⏳' : op.outcome === 'success' ? '🟢' : '🔴',
		op.checkout?.repo?.name,
		op.operation,
		op.message(),
	].filter(Boolean) as string[];
}
