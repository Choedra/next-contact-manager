// src/store/useContactStore.ts
import { create } from "zustand";

export interface Contact {
  id: string;
  username: string;
  phone: string;
  address?: string | null;
  userId?: string; 
}

interface ContactState {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addContactToStore: (contact: Contact) => void;
  updateContactInStore: (contact: Contact) => void;
  removeContactFromStore: (id: string) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
  addContactToStore: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  updateContactInStore: (contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) => (c.id === contact.id ? contact : c)),
    })),
  removeContactFromStore: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    })),
}));
