import { gql, makeVar } from "@apollo/client";

export const token = makeVar<string | null>(null);

export const GET_TOKEN = gql`
  query GetToken {
    token @client
  }
`;
