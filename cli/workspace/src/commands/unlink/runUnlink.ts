import { createUnlinkPending } from '../../private/commands/operations/createUnlinkPending';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function runUnlink(ctx: WorkspaceContext, _options: { root: string }): Promise<void> {
	ctx.log.log(createUnlinkPending(ctx.workspace, '', ''));
	// TODO: implement unlink command
	console.info('unlink command - TODO');
}
