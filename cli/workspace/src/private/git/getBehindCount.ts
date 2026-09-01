import simpleGit from 'simple-git';

export async function getBehindCount(dir: string, remoteBranch: string): Promise<number> {
	const git = simpleGit(dir);
	try {
		const branch = remoteBranch.replace(/^origin\//, '');
		await git.fetch('origin', branch);
	} catch {
		// Remote unreachable: fall back to the local tracking reference so the
		// scan still reflects the last known state instead of silently clean.
	}
	try {
		const behind = await git.raw(['rev-list', '--count', `HEAD..${remoteBranch}`]);
		return Number.parseInt(behind.trim(), 10);
	} catch {
		return 0;
	}
}
