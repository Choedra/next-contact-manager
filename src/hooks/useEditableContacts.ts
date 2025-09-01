import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { useContacts } from "./useContacts";

type EditField = "username" | "phone" | "address";

export function useEditableContacts() {
  const { contacts, onUpdate, onDelete, isLoading, isUpdating, isDeleting } =
    useContacts();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<EditField | null>(null);
  const [editData, setEditData] = useState<{
    [key: string]: { username: string; phone: string; address: string };
  }>({});

  // Hydrate editData when contacts change, but don't overwrite the row being edited
  useEffect(() => {
    setEditData((prev) => {
      const updated = { ...prev };
      contacts.forEach((c) => {
        if (!updated[c.id] || editingId !== c.id) {
          updated[c.id] = {
            username: c.username,
            phone: c.phone,
            address: c.address || "",
          };
        }
      });
      return updated;
    });
  }, [contacts, editingId]);

  // Debounced server update
  const debouncedUpdate = useCallback(
    debounce((id: string, field: EditField, value: string) => {
      const trimmed = value.trim();
      if (trimmed.length > 0) {
        onUpdate(id, { [field]: trimmed });
      }
    }, 500),
    [onUpdate]
  );

  // Cancel debounce on unmount or dependency change
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const startEditing = (id: string, field: EditField) => {
    setEditingId(id);
    setEditingField(field);
  };

  const stopEditing = () => {
    setEditingId(null);
    setEditingField(null);
  };

  return {
    contacts,
    isLoading,
    isUpdating,
    isDeleting,
    onDelete,
    editData,
    setEditData,
    editingId,
    editingField,
    startEditing,
    stopEditing,
    debouncedUpdate,
  };
}
