import { createPublishPending } from '../../private/commands/operations/createPublishPending';
import type { WorkspaceContext } from '../../private/context/createWorkspaceContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function runPublish(
	ctx: WorkspaceContext,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_options: { root: string; auto?: boolean },
): Promise<void> {
	ctx.log.log(createPublishPending(ctx.workspace, '', ''));
	// TODO: implement publish command
	console.info('publish command - TODO');
}
