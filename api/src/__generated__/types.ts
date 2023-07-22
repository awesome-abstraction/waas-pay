import { GraphQLResolveInfo } from 'graphql';
import { ServerContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateWalletFromMetadataResponse = {
  __typename?: 'CreateWalletFromMetadataResponse';
  status: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createWalletFromMetadata: CreateWalletFromMetadataResponse;
  safeToIpfsNode: SaveToIpfsResponse;
};


export type MutationCreateWalletFromMetadataArgs = {
  features: Array<WalletFeature>;
  walletType: WalletType;
};


export type MutationSafeToIpfsNodeArgs = {
  input: SaveToIpfsInput;
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String']['output'];
};

export type SaveToIpfsInput = {
  features: Array<WalletFeature>;
  users: Array<User>;
  walletType: WalletType;
};

export type SaveToIpfsResponse = {
  __typename?: 'SaveToIpfsResponse';
  status: Scalars['Int']['output'];
  userCids?: Maybe<Array<UserCid>>;
};

export type User = {
  phoneOrEmail: Scalars['String']['input'];
};

export type UserCid = {
  __typename?: 'UserCid';
  cid: Scalars['String']['output'];
  phoneOrEmail: Scalars['String']['output'];
};

export type WalletFeature = {
  id: Scalars['String']['input'];
  serializedParams?: InputMaybe<Scalars['String']['input']>;
};

export enum WalletType {
  Biconomy = 'BICONOMY',
  Safe = 'SAFE'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateWalletFromMetadataResponse: ResolverTypeWrapper<CreateWalletFromMetadataResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SaveToIpfsInput: SaveToIpfsInput;
  SaveToIpfsResponse: ResolverTypeWrapper<SaveToIpfsResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: User;
  UserCid: ResolverTypeWrapper<UserCid>;
  WalletFeature: WalletFeature;
  WalletType: WalletType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateWalletFromMetadataResponse: CreateWalletFromMetadataResponse;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  SaveToIpfsInput: SaveToIpfsInput;
  SaveToIpfsResponse: SaveToIpfsResponse;
  String: Scalars['String']['output'];
  User: User;
  UserCid: UserCid;
  WalletFeature: WalletFeature;
};

export type CreateWalletFromMetadataResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['CreateWalletFromMetadataResponse'] = ResolversParentTypes['CreateWalletFromMetadataResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createWalletFromMetadata?: Resolver<ResolversTypes['CreateWalletFromMetadataResponse'], ParentType, ContextType, RequireFields<MutationCreateWalletFromMetadataArgs, 'features' | 'walletType'>>;
  safeToIpfsNode?: Resolver<ResolversTypes['SaveToIpfsResponse'], ParentType, ContextType, RequireFields<MutationSafeToIpfsNodeArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SaveToIpfsResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['SaveToIpfsResponse'] = ResolversParentTypes['SaveToIpfsResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userCids?: Resolver<Maybe<Array<ResolversTypes['UserCid']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserCidResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserCid'] = ResolversParentTypes['UserCid']> = {
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneOrEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ServerContext> = {
  CreateWalletFromMetadataResponse?: CreateWalletFromMetadataResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SaveToIpfsResponse?: SaveToIpfsResponseResolvers<ContextType>;
  UserCid?: UserCidResolvers<ContextType>;
};

