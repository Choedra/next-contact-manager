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
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {/* Username Field */}
            <FormField
              control={addForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Username *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      disabled={isAdding}
                      className="h-10"
                      onBlur={field.onBlur} // This enables validation on blur
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1 min-h-[16px]" />
                </FormItem>
              )}
            />

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
                      className="h-10"
                      onBlur={field.onBlur} // This enables validation on blur
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1 min-h-[16px]" />
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
                      className="h-10"
                      onBlur={field.onBlur} // This enables validation on blur
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1 min-h-[16px]" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex flex-col justify-end">
              <Button
                type="submit"
                disabled={isAdding}
                className="h-10 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
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