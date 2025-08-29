import { LoginInput, RegisterInput } from "../components/auth/validation/auth-validation";
import { LoginDocument, SignupDocument } from "../graphql/generated/graphql";
import { getClient } from "../lib/graphql-client"; // ✅ use function
interface GraphQLError {
  message: string;
}

interface GraphQLResponseError extends Error {
  response?: {
    errors?: GraphQLError[];
  };
}

const mapGraphQLError = (msg: string) => {
  if (msg.includes("Incorrect password")) return "Incorrect password. Try again!";
  if (msg.includes("User not found")) return "No account found with this email.";
  return msg;
};

export const login = async (variables: LoginInput): Promise<string> => {
  try {
    const client = getClient(); 
    const data = await client.request(LoginDocument, variables);
    return data.login.token;
  } catch (err) {
    const error = err as GraphQLResponseError;
    if (error.response?.errors?.length) {
      throw new Error(mapGraphQLError(error.response.errors[0].message));
    }
    throw new Error("Login failed. Please check your connection and try again.");
  }
};

export const signup = async (variables: RegisterInput): Promise<string> => {
  try {
    const client = getClient(); // ✅ fresh client
    const data = await client.request(SignupDocument, { user: variables });
    return data.signup.token;
  } catch (err) {
    const error = err as GraphQLResponseError;
    if (error.response?.errors?.length) {
      throw new Error(error.response.errors[0].message);
    }
    throw new Error("Registration failed. Please check your connection and try again.");
  }
};
