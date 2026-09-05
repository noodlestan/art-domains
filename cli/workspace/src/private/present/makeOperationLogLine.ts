import type { OperationBase } from '../operations/types';

import { truncateMiddle } from './private/truncateMiddle';

export function makeOperationLogLine(op: OperationBase): string[] {
	return [
		op.outcome === 'pending' ? '⏳' : op.outcome === 'success' ? '🟢' : '🔴',
		op.checkout?.repo?.name,
		op.checkout?.record.location,
		op.operation,
		truncateMiddle(op.message(), 50),
		String(op.timing()),
	].filter(Boolean) as string[];
}
