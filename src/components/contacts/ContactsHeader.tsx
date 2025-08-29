"use client";

import { useAuthStore } from "@/src/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { LogOut, User, Contact } from "lucide-react";

export default function ContactsHeader() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-primary/10">
          <Contact className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground">Manage your contact information</p>
        </div>
      </div>
      <Button
        onClick={logout}
        variant="outline"
        className="gap-2 hover:bg-black hover:text-white transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}