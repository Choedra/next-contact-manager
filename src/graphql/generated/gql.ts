/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n  }\n}": typeof types.LoginDocument,
    "mutation Signup($user: SignupInput!) {\n  signup(user: $user) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}": typeof types.SignupDocument,
    "mutation AddContact($contact: AddContactInput!) {\n  addContact(contact: $contact) {\n    id\n    phone\n    address\n  }\n}": typeof types.AddContactDocument,
    "mutation DeleteContact($id: ID!) {\n  deleteContact(id: $id) {\n    id\n    phone\n    address\n  }\n}": typeof types.DeleteContactDocument,
    "mutation UpdateContact($id: ID!, $edits: EditContactInput!) {\n  updateContact(id: $id, edits: $edits) {\n    id\n    phone\n    address\n  }\n}": typeof types.UpdateContactDocument,
    "query GetContacts {\n  contacts {\n    id\n    phone\n    address\n  }\n}": typeof types.GetContactsDocument,
};
const documents: Documents = {
    "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n  }\n}": types.LoginDocument,
    "mutation Signup($user: SignupInput!) {\n  signup(user: $user) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}": types.SignupDocument,
    "mutation AddContact($contact: AddContactInput!) {\n  addContact(contact: $contact) {\n    id\n    phone\n    address\n  }\n}": types.AddContactDocument,
    "mutation DeleteContact($id: ID!) {\n  deleteContact(id: $id) {\n    id\n    phone\n    address\n  }\n}": types.DeleteContactDocument,
    "mutation UpdateContact($id: ID!, $edits: EditContactInput!) {\n  updateContact(id: $id, edits: $edits) {\n    id\n    phone\n    address\n  }\n}": types.UpdateContactDocument,
    "query GetContacts {\n  contacts {\n    id\n    phone\n    address\n  }\n}": types.GetContactsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Signup($user: SignupInput!) {\n  signup(user: $user) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}"): (typeof documents)["mutation Signup($user: SignupInput!) {\n  signup(user: $user) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddContact($contact: AddContactInput!) {\n  addContact(contact: $contact) {\n    id\n    phone\n    address\n  }\n}"): (typeof documents)["mutation AddContact($contact: AddContactInput!) {\n  addContact(contact: $contact) {\n    id\n    phone\n    address\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteContact($id: ID!) {\n  deleteContact(id: $id) {\n    id\n    phone\n    address\n  }\n}"): (typeof documents)["mutation DeleteContact($id: ID!) {\n  deleteContact(id: $id) {\n    id\n    phone\n    address\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateContact($id: ID!, $edits: EditContactInput!) {\n  updateContact(id: $id, edits: $edits) {\n    id\n    phone\n    address\n  }\n}"): (typeof documents)["mutation UpdateContact($id: ID!, $edits: EditContactInput!) {\n  updateContact(id: $id, edits: $edits) {\n    id\n    phone\n    address\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetContacts {\n  contacts {\n    id\n    phone\n    address\n  }\n}"): (typeof documents)["query GetContacts {\n  contacts {\n    id\n    phone\n    address\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;