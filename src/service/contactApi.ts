// src/service/contactApi.ts
import {
  GetContactsDocument,
  AddContactDocument,
  UpdateContactDocument,
  DeleteContactDocument,
} from "@/src/graphql/generated/graphql";
import { getClient } from "@/src/lib/graphql-client";
import { Contact } from "@/src/store/useContactStore";

export const getContacts = async (): Promise<Contact[]> => {
  const client = getClient();
  const data = await client.request(GetContactsDocument);
  return data.contacts as Contact[];
};

export const addContact = async (contact: { username: string; phone: string; address?: string }) => {
  const client = getClient();
  const data = await client.request(AddContactDocument, { contact });
  if (!data?.addContact) throw new Error("Add failed");
  return data.addContact as Contact;
};

export const updateContact = async (params: { id: string; edits: { username?: string; phone?: string; address?: string } }) => {
  const client = getClient();
  const data = await client.request(UpdateContactDocument, params);
  if (!data?.updateContact) throw new Error("Update failed");
  return data.updateContact as Contact;
};

export const deleteContact = async (id: string) => {
  const client = getClient();
  const data = await client.request(DeleteContactDocument, { id });
  if (!data?.deleteContact) throw new Error("Delete failed");
  return data.deleteContact as Contact;
};
