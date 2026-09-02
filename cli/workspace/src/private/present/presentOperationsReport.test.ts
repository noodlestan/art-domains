import { afterEach, describe, expect, it, vi } from 'vitest';

import { createMockCommandContext } from '../../test/helpers/context/createMockCommandContext';
import { makeTempDir } from '../../test/helpers/tempDirs/makeTempDir';
import { removeTempDirs } from '../../test/helpers/tempDirs/removeTempDirs';
import { createCloneFailure } from '../commands/operations/createCloneFailure';
import { createCloneSuccess } from '../commands/operations/createCloneSuccess';
import { createOperationsLog } from '../log/createOperationsLog';
import type { ClonePending } from '../operations/types';
import { createCheckout } from '../store/createCheckout';

import { makeOperationLogLine, presentOperationsReport } from './presentOperationsReport';

function makePendingOperation(): ClonePending {
	return {
		ts: new Date(),
		checkout: undefined,
		outcome: 'pending',
		operation: 'clone',
		location: 'checkouts/my-repo',
		message() {
			return 'cloning my-repo';
		},
	};
}

const tempDirs: string[] = [];

afterEach(async () => {
	await removeTempDirs(tempDirs);
	vi.restoreAllMocks();
});

describe('presentOperationsReport', () => {
	it('no output when the log is empty', () => {
		const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
		const log = createOperationsLog();

		presentOperationsReport(log);

		expect(spy).not.toHaveBeenCalled();
	});

	it('prints Operations Report: when operations exist', () => {
		const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
		const log = createOperationsLog();
		const tempDir = makeTempDir(tempDirs);
		const ctx = createMockCommandContext(tempDir);
		const checkout = createCheckout(ctx.config, 'my-repo', {
			name: 'MyRepo',
			remote: 'git@example.com:my-repo.git',
		});
		log.log(createCloneSuccess(checkout));

		presentOperationsReport(log);

		expect(spy).toHaveBeenCalledWith('Operations Report:');
	});
});

describe('makeOperationLogLine', () => {
	it('renders a pending line with ⏳', () => {
		const line = makeOperationLogLine(makePendingOperation());

		expect(line[0]).toBe('⏳');
		expect(line).toEqual(['⏳', 'unknown', 'clone', 'cloning my-repo']);
	});

	it('renders a success line with 🟢', () => {
		const tempDir = makeTempDir(tempDirs);
		const ctx = createMockCommandContext(tempDir);
		const checkout = createCheckout(ctx.config, 'my-repo', {
			name: 'MyRepo',
			remote: 'git@example.com:my-repo.git',
		});

		const line = makeOperationLogLine(createCloneSuccess(checkout));

		expect(line[0]).toBe('🟢');
	});

	it('renders a failure line with 🔴', () => {
		const line = makeOperationLogLine(createCloneFailure(undefined, new Error('boom')));

		expect(line[0]).toBe('🔴');
	});
});
