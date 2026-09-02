import { WorkspaceContext } from '../../context/createWorkspaceContext';
import { createOperationPending } from '../../context/operations/createOperationPending';
import { findRecordFiles } from '../../records/findRecordFiles';
import { RepositoryRecord } from '../types';

import { readRepositoryRecord } from './readRepositoryRecord';

export async function loadRepositoryRecords(ctx: WorkspaceContext): Promise<RepositoryRecord[]> {
	const searchPath = ctx.config.root.path;
	ctx.log.log(createOperationPending('load-repository-records', searchPath));

	const recordFiles = await findRecordFiles(
		searchPath,
		ctx.config.records.pattern,
		['Repository'],
		ctx.config.records,
	);
	const records = await Promise.all(recordFiles.map(file => readRepositoryRecord(file)));
	return records.filter((record): record is RepositoryRecord => record !== null);
}
