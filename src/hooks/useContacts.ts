// src/hooks/useContacts.ts
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContactStore, type Contact } from "../store/useContactStore";
import { getContacts, addContact, updateContact, deleteContact } from "../service/contactApi";
import { ContactInput, contactSchema } from "../components/contacts/validation/contact-validation";

export function useContacts() {
  const { contacts, setContacts, addContactToStore, updateContactInStore, removeContactFromStore } = useContactStore();
  const queryClient = useQueryClient();

  // Form for adding new contacts
  const addForm = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone: "",
      address: "",
    }
  });

  // Fetch contacts - only once on initial load
  const { isLoading, error } = useQuery<Contact[], Error>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const data = await getContacts();
      // Sort contacts to maintain consistent order
      const sortedContacts = data.sort((a, b) => 
        a.phone.localeCompare(b.phone) // Sort by phone number alphabetically
      );
      setContacts(sortedContacts);
      return sortedContacts;
    },
    staleTime: Infinity, // Don't refetch automatically
  });

  // ADD mutation - update store optimistically
  const addMutation = useMutation({
    mutationFn: addContact,
    onSuccess: (newContact) => {
      addContactToStore(newContact);
      addForm.reset();
    },
    onError: (error) => {
      console.error("Failed to add contact:", error);
      // Optional: revert optimistic update if needed
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateContact,
    onSuccess: (updatedContact) => {
      updateContactInStore(updatedContact);
    },
    onError: (error, variables) => {
      console.error("Failed to update contact:", error);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: (_, id) => {
      removeContactFromStore(id);
    },
    onError: (error, variables) => {
      console.error("Failed to delete contact:", error);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    }
  });

  // Handler functions
  const onAdd = (data: ContactInput) => {
    addMutation.mutate(data);
  };

  const onUpdate = (id: string, edits: Partial<ContactInput>) => {
    updateMutation.mutate({ id, edits });
  };

  const onDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return {
    contacts,
    isLoading,
    error,
    addForm,
    onAdd,
    onUpdate,
    onDelete,
    isAdding: addMutation.isPending,
    addError: addMutation.error,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}