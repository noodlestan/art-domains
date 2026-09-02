import { createUnlinkPending } from '../../private/commands/operations/createUnlinkPending';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';
import { createOperationPending } from '../../private/context/operations/createOperationPending';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function runUnlink(ctx: WorkspaceContext, _options: { root: string }): Promise<void> {
	ctx.log.log(createOperationPending('command', ['unlink']));
	ctx.log.log(createUnlinkPending(ctx.workspace, '', ''));
	// TODO: implement unlink command
	console.info('unlink command - TODO');
}
