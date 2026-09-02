import { createLinkedPending } from '../../private/commands/operations/createLinkedPending';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function runLink(ctx: WorkspaceContext, _options: { root: string }): Promise<void> {
	ctx.log.log(createLinkedPending(ctx.workspace, '', ''));
	// TODO: implement link command
	console.info('link command - TODO');
}
