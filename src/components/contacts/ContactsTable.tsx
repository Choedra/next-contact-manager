"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditableContacts } from "@/src/hooks/useEditableContacts";

export default function ContactsTable() {
  const {
    contacts,
    isLoading,
    isDeleting,
    onDelete,
    editData,
    setEditData,
    editingId,
    editingField,
    startEditing,
    stopEditing,
    debouncedUpdate,
  } = useEditableContacts();

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading contacts...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="h-6 w-6" /> Contacts
            </CardTitle>
            <CardDescription>Manage your contact list</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {contacts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No contacts yet. Add your first contact above!</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Username</TableHead>
                <TableHead className="w-[30%]">Phone</TableHead>
                <TableHead className="w-[30%]">Address</TableHead>
                <TableHead className="text-right w-[10%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className="group">
                  {/* Username Cell */}
                  <TableCell className="w-[30%]">
                    {editingId === contact.id && editingField === "username" ? (
                      <Input
                        autoFocus
                        value={editData[contact.id].username}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditData((prev) => ({
                            ...prev,
                            [contact.id]: {
                              ...prev[contact.id],
                              username: val,
                            },
                          }));
                          debouncedUpdate(contact.id, "username", val);
                        }}
                        onBlur={stopEditing}
                        className="h-8"
                      />
                    ) : (
                      <span
                        className="inline-block h-8 px-2 align-middle cursor-pointer w-full truncate"
                        onClick={() => startEditing(contact.id, "username")}
                      >
                        {contact.username}
                      </span>
                    )}
                  </TableCell>

                  {/* Phone Cell */}
                  <TableCell className="w-[30%]">
                    {editingId === contact.id && editingField === "phone" ? (
                      <Input
                        autoFocus
                        value={editData[contact.id].phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditData((prev) => ({
                            ...prev,
                            [contact.id]: {
                              ...prev[contact.id],
                              phone: val,
                            },
                          }));
                          debouncedUpdate(contact.id, "phone", val);
                        }}
                        onBlur={stopEditing}
                        className="h-8"
                      />
                    ) : (
                      <span
                        className="inline-block h-8 px-2 align-middle cursor-pointer w-full truncate"
                        onClick={() => startEditing(contact.id, "phone")}
                      >
                        {contact.phone}
                      </span>
                    )}
                  </TableCell>

                  {/* Address Cell */}
                  <TableCell className="w-[30%]">
                    {editingId === contact.id && editingField === "address" ? (
                      <Input
                        autoFocus
                        value={editData[contact.id].address}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditData((prev) => ({
                            ...prev,
                            [contact.id]: {
                              ...prev[contact.id],
                              address: val,
                            },
                          }));
                          debouncedUpdate(contact.id, "address", val);
                        }}
                        onBlur={stopEditing}
                        placeholder="Address (optional)"
                        className="h-8"
                      />
                    ) : (
                      <span
                        className={`inline-block h-8 px-2 align-middle cursor-pointer w-full truncate ${
                          !contact.address ? "text-muted-foreground" : ""
                        }`}
                        onClick={() => startEditing(contact.id, "address")}
                      >
                        {contact.address || "—"}
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right w-[10%]">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(contact.id)}
                      disabled={isDeleting}
                      className="h-8 w-8 p-0 bg-red-400 hover:bg-red-500"
                    >
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-white" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
