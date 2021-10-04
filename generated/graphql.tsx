import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Athlete = {
  __typename?: 'Athlete';
  birthYear: Scalars['Int'];
  createWorkouts: Scalars['Boolean'];
  gender: Gender;
  id: Scalars['Int'];
  metricsRequired: Scalars['Boolean'];
  organization: Organization;
  parentEmail: Scalars['String'];
  sessions: Array<Session>;
  team: Team;
  trainingPlan: TrainingPlan;
  user: User;
};

export type Boulder = {
  __typename?: 'Boulder';
  boulderNumber: Scalars['Int'];
  id: Scalars['Int'];
  scoreKeeper: User;
  stack: Stack;
};

/** Age Catagory */
export enum Catagory {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  Jr = 'JR'
}

export type Coach = {
  __typename?: 'Coach';
  birthYear: Scalars['Int'];
  id: Scalars['Int'];
  organization: Organization;
  team: Team;
  user?: Maybe<User>;
};

export type Event = {
  __typename?: 'Event';
  athletes?: Maybe<Array<Athlete>>;
  creator: User;
  id: Scalars['Int'];
  location: Scalars['String'];
  name: Scalars['String'];
  numBoulders: Scalars['Int'];
  runningOrder?: Maybe<RunningOrder>;
  stacks?: Maybe<Array<Stack>>;
  startDate: Scalars['String'];
  started: Scalars['Boolean'];
  visible: Scalars['Boolean'];
};

/** Athlete Gender */
export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateAthlete: Scalars['Boolean'];
  activateUser: Scalars['Boolean'];
  addAthleteToEvent: Scalars['Boolean'];
  addAthleteToTeam: Scalars['Boolean'];
  createAthleteProfile: Scalars['Boolean'];
  createBoulder: Scalars['Boolean'];
  createCoachProfile: Scalars['Boolean'];
  createEvent: Scalars['Boolean'];
  createOrganization: Scalars['Boolean'];
  createRunningOrder: Scalars['Boolean'];
  createTeam: Scalars['Boolean'];
  createWorkout: Scalars['Boolean'];
  deleteAthleteProfile: Scalars['Boolean'];
  deleteTeam: Scalars['Boolean'];
  deleteWorkout: Scalars['Boolean'];
  editRunningOrder: Scalars['Boolean'];
  logSession: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  resetRunningOrder: Scalars['Boolean'];
  updateAthleteBirthYear: Scalars['Boolean'];
  updateWorkoutDescription: Scalars['Boolean'];
  updateWorkoutEquiptment: Scalars['Boolean'];
  updateWorkoutName: Scalars['Boolean'];
  updateWorkoutSets: Scalars['Boolean'];
  updateWorkoutType: Scalars['Boolean'];
};


export type MutationActivateAthleteArgs = {
  password: Scalars['String'];
  userId: Scalars['Float'];
};


export type MutationAddAthleteToEventArgs = {
  athleteId: Scalars['String'];
  eventId: Scalars['String'];
};


export type MutationAddAthleteToTeamArgs = {
  athleteId: Scalars['Float'];
  teamId: Scalars['Float'];
};


export type MutationCreateAthleteProfileArgs = {
  birthYear: Scalars['Float'];
  createWorkouts: Scalars['Boolean'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  metricsRequired: Scalars['Boolean'];
  parentEmail: Scalars['String'];
  teamId: Scalars['Float'];
};


export type MutationCreateBoulderArgs = {
  boulderNumber: Scalars['Float'];
  stackId: Scalars['Float'];
};


export type MutationCreateCoachProfileArgs = {
  birthYear: Scalars['Float'];
  orgId: Scalars['Float'];
};


export type MutationCreateEventArgs = {
  location: Scalars['String'];
  name: Scalars['String'];
  numBoulders: Scalars['Float'];
  startDate: Scalars['String'];
  visible: Scalars['Boolean'];
};


export type MutationCreateOrganizationArgs = {
  name: Scalars['String'];
};


export type MutationCreateRunningOrderArgs = {
  eventId: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  orgId: Scalars['Float'];
  teamName: Scalars['String'];
};


export type MutationCreateWorkoutArgs = {
  description: Scalars['String'];
  equiptment: Scalars['String'];
  name: Scalars['String'];
  notifications: Scalars['Boolean'];
  numSets: Scalars['Float'];
  recordClimbs: Scalars['Boolean'];
  sets: Scalars['String'];
  workoutType: Scalars['String'];
};


export type MutationDeleteAthleteProfileArgs = {
  athleteId: Scalars['Float'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['Float'];
};


export type MutationDeleteWorkoutArgs = {
  workoutId: Scalars['Float'];
};


export type MutationEditRunningOrderArgs = {
  first: Array<Scalars['Int']>;
  runningOrderId: Scalars['String'];
  second: Array<Scalars['Int']>;
  third: Array<Scalars['Int']>;
  unordered: Array<Scalars['Int']>;
};


export type MutationLogSessionArgs = {
  notes: Scalars['String'];
  percentCompleted: Scalars['Float'];
  rpe: Scalars['Float'];
  workoutId: Scalars['Float'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetRunningOrderArgs = {
  eventId: Scalars['String'];
  roId: Scalars['String'];
};


export type MutationUpdateAthleteBirthYearArgs = {
  athleteId: Scalars['Float'];
  birthYear: Scalars['Float'];
};


export type MutationUpdateWorkoutDescriptionArgs = {
  description: Scalars['String'];
  workoutId: Scalars['Float'];
};


export type MutationUpdateWorkoutEquiptmentArgs = {
  equiptment: Scalars['String'];
  workoutId: Scalars['Float'];
};


export type MutationUpdateWorkoutNameArgs = {
  name: Scalars['String'];
  workoutId: Scalars['Float'];
};


export type MutationUpdateWorkoutSetsArgs = {
  sets: Scalars['String'];
  workoutId: Scalars['Float'];
};


export type MutationUpdateWorkoutTypeArgs = {
  workoutId: Scalars['Float'];
  workoutType: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  athletes: Array<Athlete>;
  coaches: Array<Coach>;
  id: Scalars['Int'];
  name: Scalars['String'];
  owner: User;
  teams: Array<Team>;
  workouts: Array<Workout>;
};

export type Query = {
  __typename?: 'Query';
  athletes: Array<Athlete>;
  bye: Scalars['String'];
  event: Event;
  events: Array<Event>;
  getAthleteById: Athlete;
  getAthletesInOrg: Array<Athlete>;
  getAuthenticatedEvents: Array<Event>;
  getBoulder: Boulder;
  getBoulders: Array<Boulder>;
  getBouldersForEvent: Array<Boulder>;
  getCoaches: Array<Coach>;
  getOrganization: Organization;
  getOrganizations: Array<Organization>;
  getRunningOrder: RunningOrder;
  getStacks: Array<Stack>;
  getTeamByCoachId: Team;
  getTeamsInOrg: Array<Team>;
  getWorkout: Workout;
  getWorkoutsForTeam: Array<Workout>;
  getWorkoutsInOrg: Array<Workout>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  teams: Array<Team>;
  users: Array<User>;
};


export type QueryEventArgs = {
  eventId: Scalars['String'];
};


export type QueryGetAthleteByIdArgs = {
  athleteId: Scalars['Float'];
};


export type QueryGetBoulderArgs = {
  boulderId: Scalars['Float'];
};


export type QueryGetBouldersForEventArgs = {
  eventId: Scalars['String'];
};


export type QueryGetRunningOrderArgs = {
  eventId: Scalars['String'];
};


export type QueryGetStacksArgs = {
  eventId: Scalars['String'];
};


export type QueryGetTeamByCoachIdArgs = {
  coachId: Scalars['String'];
};


export type QueryGetWorkoutArgs = {
  workoutId: Scalars['Float'];
};


export type QueryGetWorkoutsForTeamArgs = {
  teamId: Scalars['String'];
};

export type RunningOrder = {
  __typename?: 'RunningOrder';
  first: Array<Stack>;
  id: Scalars['Int'];
  second: Array<Stack>;
  third: Array<Stack>;
  unordered: Array<Stack>;
};

export type Session = {
  __typename?: 'Session';
  date: Scalars['String'];
  id: Scalars['Int'];
  notes: Scalars['String'];
  percentCompleted: Scalars['Int'];
  rpe: Scalars['Int'];
  workout: Workout;
};

export type Stack = {
  __typename?: 'Stack';
  athletes: Array<Athlete>;
  boulders: Array<Boulder>;
  catagory: Catagory;
  event: Event;
  gender: Gender;
  id: Scalars['Int'];
};

export type Team = {
  __typename?: 'Team';
  athletes: Array<Athlete>;
  id: Scalars['Int'];
  organization: Organization;
  teamName: Scalars['String'];
};

export type TrainingPlan = {
  __typename?: 'TrainingPlan';
  description: Scalars['String'];
  endDate: Scalars['String'];
  id: Scalars['Int'];
  numWeeks: Scalars['Int'];
  org: Organization;
  plan: Scalars['String'];
  startDate: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};

export type Workout = {
  __typename?: 'Workout';
  description: Scalars['String'];
  equiptment: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  notifications: Scalars['Boolean'];
  numSets: Scalars['Int'];
  organization: Organization;
  recordClimbs: Scalars['Boolean'];
  sets: Scalars['String'];
  workoutType: Scalars['String'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string } | null | undefined };

export type GetWorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkoutsQuery = { __typename?: 'Query', getWorkoutsInOrg: Array<{ __typename?: 'Workout', name: string, description: string, numSets: number, workoutType: string, sets: string, id: number, equiptment: string, recordClimbs: boolean, notifications: boolean }> };


export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      firstName
      lastName
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetWorkoutsDocument = gql`
    query GetWorkouts {
  getWorkoutsInOrg {
    name
    description
    numSets
    workoutType
    sets
    id
    equiptment
    recordClimbs
    notifications
  }
}
    `;

/**
 * __useGetWorkoutsQuery__
 *
 * To run a query within a React component, call `useGetWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, options);
      }
export function useGetWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, options);
        }
export type GetWorkoutsQueryHookResult = ReturnType<typeof useGetWorkoutsQuery>;
export type GetWorkoutsLazyQueryHookResult = ReturnType<typeof useGetWorkoutsLazyQuery>;
export type GetWorkoutsQueryResult = Apollo.QueryResult<GetWorkoutsQuery, GetWorkoutsQueryVariables>;