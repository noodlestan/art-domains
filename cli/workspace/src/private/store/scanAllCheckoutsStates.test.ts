import { afterEach, describe, expect, it } from 'vitest';

import { createMockCommandContext } from '../../test/helpers/context/createMockCommandContext';
import { makeTempDir } from '../../test/helpers/tempDirs/makeTempDir';
import { removeTempDirs } from '../../test/helpers/tempDirs/removeTempDirs';

import { createCheckout } from './createCheckout';
import { scanAllCheckoutsStates } from './scanAllCheckoutsStates';

const tempDirs: string[] = [];

afterEach(async () => {
	await removeTempDirs(tempDirs);
});

describe('scanAllCheckoutsStates', () => {
	it('no-op on an empty store', async () => {
		const tempDir = makeTempDir(tempDirs);
		const ctx = createMockCommandContext(tempDir);

		await scanAllCheckoutsStates(ctx);

		expect(ctx.store.getAllCheckouts()).toHaveLength(0);
	});

	it('scans all checkouts and updates the store for each', async () => {
		const tempDir = makeTempDir(tempDirs);
		const ctx = createMockCommandContext(tempDir);

		const checkoutA = createCheckout(ctx.config, 'a', undefined, 'main', 'A');
		const checkoutB = createCheckout(ctx.config, 'b', undefined, 'main', 'B');
		const checkoutC = createCheckout(ctx.config, 'c', undefined, 'main', 'C');

		ctx.store.addCheckout(checkoutA);
		ctx.store.addCheckout(checkoutB);
		ctx.store.addCheckout(checkoutC);

		await scanAllCheckoutsStates(ctx);

		const all = ctx.store.getAllCheckouts();
		expect(all).toHaveLength(3);

		for (const checkout of all) {
			expect(checkout.scan).toBeDefined();
		}
	});

	it('preserves checkout order from getAllCheckouts', async () => {
		const tempDir = makeTempDir(tempDirs);
		const ctx = createMockCommandContext(tempDir);

		const locations = ['alpha', 'bravo', 'charlie', 'delta'];
		for (const loc of locations) {
			ctx.store.addCheckout(createCheckout(ctx.config, loc, undefined, 'main', loc));
		}

		await scanAllCheckoutsStates(ctx);

		const result = ctx.store.getAllCheckouts();
		expect(result.map(c => c.record.location)).toEqual(locations);
	});
});
