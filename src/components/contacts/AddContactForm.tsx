"use client";

import { useContacts } from "@/src/hooks/useContacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function AddContactForm() {
  const { addForm, onAdd, isAdding } = useContacts();

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Add New Contact</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...addForm}>
          <form
            onSubmit={addForm.handleSubmit(onAdd)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
          >
            {/* Phone Field */}
            <FormField
              control={addForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="+975XXXXXXXX"
                      disabled={isAdding}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="min-h-[1.25rem] text-sm text-red-500" />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={addForm.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Address (optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Thimphu, Bhutan"
                      disabled={isAdding}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="min-h-[1.25rem] text-sm text-red-500" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex items-end">
              <Button
                type="submit"
                disabled={isAdding}
                className="w-full flex items-center justify-center gap-2"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Contact
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
