import simpleGit from 'simple-git';

import type { WorkspaceContext } from '../../context/createWorkspaceContext';
import { scanCheckoutState } from '../../scan/scanCheckoutState';
import type { Checkout } from '../../store/createCheckout';
import { createPullFailure } from '../operations/createPullFailure';
import { createPullPending } from '../operations/createPullPending';
import { createPullSuccess } from '../operations/createPullSuccess';
import { createPushFailure } from '../operations/createPushFailure';
import { createPushPending } from '../operations/createPushPending';
import { createPushSuccess } from '../operations/createPushSuccess';

export async function syncWorkspaceCheckout(ctx: WorkspaceContext): Promise<Checkout | null> {
	const workspace = ctx.workspace;
	if (!workspace) return null;

	const git = simpleGit(workspace.path);

	// Pull
	if (workspace.scan?.can?.('pull')) {
		try {
			ctx.log.log(createPullPending(workspace, workspace.record.branch));
			await git.pull('origin', workspace.record.branch);
			ctx.log.log(createPullSuccess(workspace, workspace.record.branch));
		} catch (error) {
			const op = createPullFailure(workspace, workspace.record.branch, error);
			ctx.log.log(op);
			return null;
		}
	}

	// Push
	if (workspace.scan?.can?.('push')) {
		try {
			ctx.log.log(createPushPending(workspace, workspace.record.branch));
			await git.push('origin', workspace.record.branch);
			ctx.log.log(createPushSuccess(workspace, workspace.record.branch));
		} catch (error) {
			const op = createPushFailure(workspace, workspace.record.branch, error);
			ctx.log.log(op);
			return null;
		}
	}

	// Re-scan with refetch
	const updated = await scanCheckoutState(ctx, workspace, true);
	ctx.workspace = updated;
	return updated;
}
