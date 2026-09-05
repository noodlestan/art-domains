import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { createOperationPending } from '../../private/context/operations/createOperationPending';
import { presentCheckoutReport } from '../../private/present/presentCheckoutReport';
import { presentOperationsReport } from '../../private/present/presentOperationsReport';
import { loadCheckoutRecords } from '../../private/resources/checkout/loadCheckoutRecords';
import { loadRepositoryRecords } from '../../private/resources/repository/loadRepositoryRecords';
import { hydrateStoreFromRecords } from '../../private/store/hydrateStoreFromRecords';
import { scanAllCheckoutsStates } from '../../private/store/scanAllCheckoutsStates';

export async function runCheckoutsRun(
	ctx: WorkspaceContext,
	options: { command: string[]; checkouts?: string[]; all?: boolean },
): Promise<void> {
	const repos = await loadRepositoryRecords(ctx);
	const records = await loadCheckoutRecords(ctx, repos);
	hydrateStoreFromRecords(ctx.config, ctx.store, records);

	ctx.log.log(createOperationPending('command', ['checkouts', 'run', options.command]));

	await scanAllCheckoutsStates(ctx);

	if (!options.all && (!options.checkouts || options.checkouts.length === 0)) {
		console.error('No checkouts matched.');
		console.error(
			`Usage: Use \`art-workspace checkouts run [options] -c <pattern>\` or \`art-workspace checkouts run [options] --all\` if you want to run the command in all checkouts.`,
		);
		return;
	}

	const checkouts = options.all
		? ctx.store.getAllCheckouts()
		: ctx.store.getCheckoutsByPattern(options.checkouts ?? []);

	presentCheckoutReport(ctx.config, checkouts);
	presentOperationsReport(ctx.log);
}
