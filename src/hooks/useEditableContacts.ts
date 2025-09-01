import { useState, useCallback, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import { useContacts } from "./useContacts";

type EditField = "username" | "phone" | "address";

export function useEditableContacts() {
  const { contacts, onUpdate, onDelete, isLoading, isUpdating, isDeleting } = useContacts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<EditField | null>(null);
  const [editData, setEditData] = useState<{ [key: string]: { username: string; phone: string; address: string } }>({});

  // Create debounced function with useRef to prevent recreation
  const debouncedUpdateRef = useRef(
    debounce((id: string, field: EditField, value: string, updateFn: (id: string, data: { [field: string]: string }) => void) => {
      const trimmed = value.trim();
      if (trimmed.length > 0) {
        updateFn(id, { [field]: trimmed });
      }
    }, 500)
  );

  // Initialize editData only once when contacts are loaded
  useEffect(() => {
    if (contacts.length > 0 && Object.keys(editData).length === 0) {
      const initialEditData: typeof editData = {};
      contacts.forEach((c) => {
        initialEditData[c.id] = { 
          username: c.username, 
          phone: c.phone, 
          address: c.address || "" 
        };
      });
      setEditData(initialEditData);
    }
  }, [contacts, editData]);

  // Cleanup debounce on unmount
  useEffect(() => {
    const debouncedUpdate = debouncedUpdateRef.current;
    return () => {
      debouncedUpdate.cancel();
    };
  }, []);

  const startEditing = (id: string, field: EditField) => {
    setEditingId(id);
    setEditingField(field);
  };

  const stopEditing = () => {
    setEditingId(null);
    setEditingField(null);
  };

  // Update individual field without causing full state recalculation
  const updateEditData = useCallback((id: string, field: EditField, value: string) => {
    setEditData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
    
    // Use the debounced update
    debouncedUpdateRef.current(id, field, value, onUpdate);
  }, [onUpdate]);

  return {
    contacts,
    isLoading,
    isUpdating,
    isDeleting,
    onDelete,
    editData,
    updateEditData,
    editingId,
    editingField,
    startEditing,
    stopEditing,
  };
}