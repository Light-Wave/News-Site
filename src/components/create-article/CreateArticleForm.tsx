"use client";

import { createArticle } from "@/actions/article";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TipTapEditor from "./TipTapEditor";

const formSchema = z.object({
  headline: z.string().min(2),
  summary: z.string().min(10),
  image: z.string().min(1),
  content: z.string().min(10),
  categoryIds: z.array(z.string()).min(1),
});

type FormValues = z.infer<typeof formSchema>;

type Category = {
  id: string;
  name: string;
};

export default function CreateArticleForm({
  categories,
}: {
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: "",
      summary: "",
      image: "",
      content: "",
      categoryIds: [],
    },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await createArticle({
      ...values,
    });

    if (res.success) {
      toast.success(`"${values.headline}" was successfully created`);

      form.reset();
    } else {
      toast.error(res.message ?? "Failed to create article");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Create Article</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Headline */}
              <FormField
                control={form.control}
                name="headline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headline</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary */}
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Categories */}
              <FormField
                control={form.control}
                name="categoryIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>

                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value.length > 0
                            ? `${field.value.length} selected`
                            : "Select categories"}

                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="p-0 w-64">
                        <Command>
                          <CommandInput placeholder="Search..." />
                          <CommandEmpty>No results</CommandEmpty>

                          <CommandGroup>
                            {categories.map((c) => {
                              const selected = field.value.includes(c.id);

                              return (
                                <CommandItem
                                  key={c.id}
                                  onSelect={() => {
                                    if (selected) {
                                      field.onChange(
                                        field.value.filter((v) => v !== c.id),
                                      );
                                    } else {
                                      field.onChange([...field.value, c.id]);
                                    }
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      selected ? "opacity-100" : "opacity-0"
                                    }`}
                                  />
                                  {c.name}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TipTap */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <TipTapEditor
                      content={field.value}
                      onUpdate={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                Save Article
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
