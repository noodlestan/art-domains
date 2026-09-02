import type { Checkout } from '../store/createCheckout';

export type CheckoutOp = 'clone' | 'push' | 'pull' | 'branch';

export type OperationOutcome = 'pending' | 'success' | 'failure';

export interface OperationBase {
	operation: string;
	ts: Date;
	checkout?: Checkout;
	outcome: OperationOutcome;
	message: () => string;
}

export interface OperationPending extends OperationBase {
	outcome: 'pending';
}

export interface OperationSuccess extends OperationBase {
	outcome: 'success';
}

export interface OperationFailure extends OperationBase {
	outcome: 'failure';
	error: string;
	errorSerialized: () => string;
}

export interface ClonePending extends OperationPending {
	operation: 'clone';
	location: string;
}

export interface CloneSuccess extends OperationSuccess {
	operation: 'clone';
	location: string;
}

export interface CloneFailure extends OperationFailure {
	operation: 'clone';
	location: string;
}

export interface PushPending extends OperationPending {
	operation: 'push';
	branch: string;
}

export interface PushSuccess extends OperationSuccess {
	operation: 'push';
	branch: string;
}

export interface PushFailure extends OperationFailure {
	operation: 'push';
	branch: string;
}

export interface PullPending extends OperationPending {
	operation: 'pull';
	branch: string;
}

export interface PullSuccess extends OperationSuccess {
	operation: 'pull';
	branch: string;
}

export interface PullFailure extends OperationFailure {
	operation: 'pull';
	branch: string;
}

export interface PublishPending extends OperationPending {
	operation: 'publish';
	package: string;
	version: string;
}

export interface PublishSuccess extends OperationSuccess {
	operation: 'publish';
	package: string;
	version: string;
}

export interface PublishFailure extends OperationFailure {
	operation: 'publish';
	package: string;
	version: string;
}

export interface BranchPending extends OperationPending {
	operation: 'branch';
	branch: string;
}

export interface BranchSuccess extends OperationSuccess {
	operation: 'branch';
	branch: string;
}

export interface BranchFailure extends OperationFailure {
	operation: 'branch';
	branch: string;
}

export interface LinkedPending extends OperationPending {
	operation: 'linked';
	package: string;
	target: string;
}

export interface LinkedSuccess extends OperationSuccess {
	operation: 'linked';
	package: string;
	target: string;
}

export interface LinkedFailure extends OperationFailure {
	operation: 'linked';
	package: string;
	target: string;
}

export interface UnlinkPending extends OperationPending {
	operation: 'unlink';
	package: string;
	source: string;
}

export interface UnlinkSuccess extends OperationSuccess {
	operation: 'unlink';
	package: string;
	source: string;
}

export interface UnlinkFailure extends OperationFailure {
	operation: 'unlink';
	package: string;
	source: string;
}

export interface GenericOperationPending extends OperationPending {
	data?: unknown;
}

export interface GenericOperationSuccess extends OperationSuccess {
	data?: unknown;
}

export interface GenericOperationFailure extends OperationFailure {
	data?: unknown;
}

export type Operation =
	| ClonePending
	| CloneSuccess
	| CloneFailure
	| PushPending
	| PushSuccess
	| PushFailure
	| PullPending
	| PullSuccess
	| PullFailure
	| PublishPending
	| PublishSuccess
	| PublishFailure
	| BranchPending
	| BranchSuccess
	| BranchFailure
	| LinkedPending
	| LinkedSuccess
	| LinkedFailure
	| UnlinkPending
	| UnlinkSuccess
	| UnlinkFailure
	| GenericOperationPending
	| GenericOperationSuccess
	| GenericOperationFailure;
