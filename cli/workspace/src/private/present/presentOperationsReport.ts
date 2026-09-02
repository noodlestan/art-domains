import type { OperationsLog } from '../log/createOperationsLog';
import type { Operation } from '../operations/types';

import { formatTable } from './formatTable';

export function makeOperationLogLine(op: Operation): string[] {
	return [
		op.outcome === 'pending' ? '⏳' : op.outcome === 'success' ? '🟢' : '🔴',
		op.checkout?.repo?.name || 'unknown',
		op.operation,
		op.message(),
	];
}

export function presentOperationsReport(log: OperationsLog): void {
	const operations = log.all();
	if (operations.length === 0) {
		return;
	}

	const headers = ['', 'repo', 'operation', 'message'];
	const rows = operations.map(makeOperationLogLine);

	console.info('Operations Report:');
	console.info(formatTable(rows, headers));
	console.info('');
}
