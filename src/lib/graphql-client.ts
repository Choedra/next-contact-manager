import { GraphQLClient } from "graphql-request"

export const getClient = () => {
  const token = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.token
    : null

  return new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })
}
