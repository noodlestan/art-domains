import type { OperationsLog } from '../log/createOperationsLog';

import { formatTable } from './formatTable';
import { makeOperationLogLine } from './makeOperationLogLine';

export function presentOperationsReport(log: OperationsLog): void {
	const operations = log.all();
	if (operations.length === 0) {
		return;
	}

	const headers = ['', 'repo', 'checkout', 'operation', 'message', 'ms'];
	const rows = operations.map(makeOperationLogLine);

	console.info('Operations Report:');
	console.info(formatTable(rows, headers));
	console.info('');
}
