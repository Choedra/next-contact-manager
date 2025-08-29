"use client";

import AddContactForm from "@/src/components/contacts/AddContactForm";
import ContactsHeader from "@/src/components/contacts/ContactsHeader";
import ContactsTable from "@/src/components/contacts/ContactsTable";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";

export default function ContactsPage() {
  const token = useAuthGuard();

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <ContactsHeader />
        <AddContactForm />
        <ContactsTable />
      </div>
    </div>
  );
}
