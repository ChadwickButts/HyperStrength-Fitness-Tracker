import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Exercise = {
  __typename?: 'Exercise';
  category?: Maybe<Scalars['String']['output']>;
  equipment?: Maybe<Scalars['String']['output']>;
  exerciseid: Scalars['String']['output'];
  exercisename: Scalars['String']['output'];
  force?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  instructions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  level?: Maybe<Scalars['String']['output']>;
  mechanic?: Maybe<Scalars['String']['output']>;
  primaryMuscles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  secondaryMuscles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Query = {
  __typename?: 'Query';
  exercises?: Maybe<Array<Maybe<Exercise>>>;
  workout_exercises?: Maybe<Array<Maybe<Workout_Exercises>>>;
  workouts?: Maybe<Array<Maybe<Workout>>>;
};


export type QueryWorkout_ExercisesArgs = {
  workoutid?: InputMaybe<Scalars['String']['input']>;
};

export type Workout = {
  __typename?: 'Workout';
  date: Scalars['String']['output'];
  tracked: Scalars['Boolean']['output'];
  workoutid: Scalars['String']['output'];
  workoutname: Scalars['String']['output'];
};

export type Workout_Exercises = {
  __typename?: 'Workout_Exercises';
  date: Scalars['String']['output'];
  exerciseid: Scalars['String']['output'];
  exercisename: Scalars['String']['output'];
  tracked: Scalars['Boolean']['output'];
  workoutid: Scalars['String']['output'];
  workoutname: Scalars['String']['output'];
};



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
  Exercise: ResolverTypeWrapper<Exercise>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Workout: ResolverTypeWrapper<Workout>;
  Workout_Exercises: ResolverTypeWrapper<Workout_Exercises>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Exercise: Exercise;
  Query: {};
  String: Scalars['String']['output'];
  Workout: Workout;
  Workout_Exercises: Workout_Exercises;
};

export type ExerciseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exercise'] = ResolversParentTypes['Exercise']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  equipment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exerciseid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exercisename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  force?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  instructions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mechanic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryMuscles?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  secondaryMuscles?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  exercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['Exercise']>>>, ParentType, ContextType>;
  workout_exercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['Workout_Exercises']>>>, ParentType, ContextType, Partial<QueryWorkout_ExercisesArgs>>;
  workouts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Workout']>>>, ParentType, ContextType>;
};

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tracked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  workoutid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workoutname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Workout_ExercisesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout_Exercises'] = ResolversParentTypes['Workout_Exercises']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exerciseid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exercisename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tracked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  workoutid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workoutname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Exercise?: ExerciseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  Workout_Exercises?: Workout_ExercisesResolvers<ContextType>;
};

