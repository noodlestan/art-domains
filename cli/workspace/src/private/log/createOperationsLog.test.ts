import { describe, expect, it, vi } from 'vitest';

import { makeMockConfig } from '../../test/helpers/context/makeMockConfig';
import { createCloneSuccess } from '../commands/operations/createCloneSuccess';
import { createCheckout } from '../store/createCheckout';

import { createOperationsLog } from './createOperationsLog';

function makeCheckout(name: string) {
	const config = makeMockConfig('.');
	const repo = { name, remote: `git@example.com:${name}.git` };
	return createCheckout(config, repo.name, repo, 'main');
}

function makePendingOperation() {
	return {
		ts: new Date(),
		checkout: undefined,
		outcome: 'pending' as const,
		operation: 'clone' as const,
		location: 'checkouts/my-repo',
		message() {
			return 'cloning my-repo';
		},
		timing() {
			return NaN;
		},
	};
}

describe('createOperationsLog', () => {
	it('logs an operation', () => {
		const operations = createOperationsLog();
		const checkout = makeCheckout('test');

		operations.log(createCloneSuccess(checkout));

		const ops = operations.all();
		expect(ops).toHaveLength(1);
		expect(ops[0].operation).toBe('clone');
		expect(ops[0].checkout?.repo?.name).toBe('test');
	});

	it('returns empty array when no operations', () => {
		const operations = createOperationsLog();

		expect(operations.all()).toEqual([]);
	});

	it('since filters by timestamp', async () => {
		const operations = createOperationsLog();
		operations.log(createCloneSuccess(makeCheckout('a')));
		const before = new Date(Date.now() + 10);
		await new Promise(resolve => setTimeout(resolve, 15));
		operations.log(createCloneSuccess(makeCheckout('b')));

		const ops = operations.since(before);
		expect(ops).toHaveLength(1);
		expect(ops[0].checkout?.repo?.name).toBe('b');
	});

	it('latest returns last n operations', () => {
		const operations = createOperationsLog();
		operations.log(createCloneSuccess(makeCheckout('a')));
		operations.log(createCloneSuccess(makeCheckout('b')));
		operations.log(createCloneSuccess(makeCheckout('c')));

		const ops = operations.latest(2);
		expect(ops).toHaveLength(2);
		expect(ops[0].checkout?.repo?.name).toBe('b');
		expect(ops[1].checkout?.repo?.name).toBe('c');
	});

	it('streams a pending operation to the logger without storing it', () => {
		const logger = vi.fn();
		const operations = createOperationsLog(logger);

		operations.log(makePendingOperation());

		expect(logger).toHaveBeenCalledTimes(1);
		expect(operations.all()).toEqual([]);
	});
});
