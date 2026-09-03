import simpleGit from 'simple-git';

import type { WorkspaceContext } from '../../context/createWorkspaceContext';
import { scanCheckoutState } from '../../scan/scanCheckoutState';
import type { Checkout } from '../../store/createCheckout';
import { createPushFailure } from '../operations/createPushFailure';
import { createPushPending } from '../operations/createPushPending';
import { createPushSuccess } from '../operations/createPushSuccess';

export async function doPushWorkspaceCheckout(ctx: WorkspaceContext): Promise<Checkout | null> {
	const workspace = ctx.workspace;
	if (!workspace) return null;
	if (!workspace.scan?.can?.('push') || !workspace.scan.should?.('push')) return null;

	const git = simpleGit(workspace.path);
	try {
		ctx.log.log(createPushPending(workspace, workspace.record.branch));
		await git.push('origin', workspace.record.branch);
		const updated = await scanCheckoutState(ctx, workspace, true);
		ctx.workspace = updated;
		ctx.log.log(createPushSuccess(workspace, workspace.record.branch));
		return updated;
	} catch (error) {
		const op = createPushFailure(workspace, workspace.record.branch, error);
		ctx.log.log(op);
		return null;
	}
}
