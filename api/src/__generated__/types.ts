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

export type Mutation = {
  __typename?: 'Mutation';
  saveUserWalletsMeta: SaveUserWalletsMetaResponse;
};


export type MutationSaveUserWalletsMetaArgs = {
  input: SaveUserWalletsMetaInput;
};

export type Query = {
  __typename?: 'Query';
  getUserWalletsMeta: UserWalletsMetaResponse;
  ping: Scalars['String']['output'];
};


export type QueryGetUserWalletsMetaArgs = {
  cid: Scalars['String']['input'];
};

export type SaveUserWalletsMetaInput = {
  companyName: Scalars['String']['input'];
  minaSmartContractAddress: Scalars['String']['input'];
  walletType: WalletType;
};

export type SaveUserWalletsMetaResponse = {
  __typename?: 'SaveUserWalletsMetaResponse';
  cid?: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
};

export type UserWalletsMeta = {
  __typename?: 'UserWalletsMeta';
  companyName: Scalars['String']['output'];
  minaSmartContractAddress: Scalars['String']['output'];
  walletType: WalletType;
};

export type UserWalletsMetaResponse = {
  __typename?: 'UserWalletsMetaResponse';
  data?: Maybe<UserWalletsMeta>;
  status: Scalars['Int']['output'];
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
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SaveUserWalletsMetaInput: SaveUserWalletsMetaInput;
  SaveUserWalletsMetaResponse: ResolverTypeWrapper<SaveUserWalletsMetaResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserWalletsMeta: ResolverTypeWrapper<UserWalletsMeta>;
  UserWalletsMetaResponse: ResolverTypeWrapper<UserWalletsMetaResponse>;
  WalletType: WalletType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  SaveUserWalletsMetaInput: SaveUserWalletsMetaInput;
  SaveUserWalletsMetaResponse: SaveUserWalletsMetaResponse;
  String: Scalars['String']['output'];
  UserWalletsMeta: UserWalletsMeta;
  UserWalletsMetaResponse: UserWalletsMetaResponse;
};

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  saveUserWalletsMeta?: Resolver<ResolversTypes['SaveUserWalletsMetaResponse'], ParentType, ContextType, RequireFields<MutationSaveUserWalletsMetaArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUserWalletsMeta?: Resolver<ResolversTypes['UserWalletsMetaResponse'], ParentType, ContextType, RequireFields<QueryGetUserWalletsMetaArgs, 'cid'>>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SaveUserWalletsMetaResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['SaveUserWalletsMetaResponse'] = ResolversParentTypes['SaveUserWalletsMetaResponse']> = {
  cid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWalletsMetaResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserWalletsMeta'] = ResolversParentTypes['UserWalletsMeta']> = {
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  minaSmartContractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  walletType?: Resolver<ResolversTypes['WalletType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWalletsMetaResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserWalletsMetaResponse'] = ResolversParentTypes['UserWalletsMetaResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['UserWalletsMeta']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ServerContext> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SaveUserWalletsMetaResponse?: SaveUserWalletsMetaResponseResolvers<ContextType>;
  UserWalletsMeta?: UserWalletsMetaResolvers<ContextType>;
  UserWalletsMetaResponse?: UserWalletsMetaResponseResolvers<ContextType>;
};

