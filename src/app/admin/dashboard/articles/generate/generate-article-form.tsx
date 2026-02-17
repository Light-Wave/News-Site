"use client";

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
import { generateArticle } from "@/actions/ai";

const formSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
  userId: z.string().min(1, "Select an AI writer"),
});

type FormValues = z.infer<typeof formSchema>;

type Category = {
  id: string;
  name: string;
};

type AiWriter = {
  id: string;
  name: string;
  email: string;
};

export default function GenerateArticleForm({
  categories,
  aiWriters,
}: {
  categories: Category[];
  aiWriters: AiWriter[];
}) {
  const [openCategories, setOpenCategories] = useState(false);
  const [openWriters, setOpenWriters] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      categoryIds: [],
      userId: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const selectedCategoryNames = categories
      .filter((c) => values.categoryIds.includes(c.id))
      .map((c) => c.name);

    const selectedWriter = aiWriters.find((w) => w.id === values.userId);

    if (!selectedWriter) {
      toast.error("Invalid writer selected");
      return;
    }

    const res = await generateArticle(
      values.prompt,
      selectedCategoryNames,
      selectedWriter.email,
    );

    if (res.success) {
      toast.success("AI article successfully generated ✨");
      form.reset();
    } else {
      toast.error(res.message ?? "Failed to generate article");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Generate AI Article</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Prompt */}
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Write a dramatic article about magical inflation..."
                        {...field}
                      />
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

                    <Popover
                      open={openCategories}
                      onOpenChange={setOpenCategories}
                    >
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

              {/* AI Writer */}
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Writer</FormLabel>

                    <Popover open={openWriters} onOpenChange={setOpenWriters}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? (aiWriters.find((w) => w.id === field.value)
                                ?.name ?? "Select writer")
                            : "Select writer"}

                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="p-0 w-64">
                        <Command>
                          <CommandInput placeholder="Search..." />
                          <CommandEmpty>No results</CommandEmpty>

                          <CommandGroup>
                            {aiWriters.map((writer) => (
                              <CommandItem
                                key={writer.id}
                                onSelect={() => {
                                  field.onChange(writer.id);
                                  setOpenWriters(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    field.value === writer.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {writer.name ?? writer.email}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Generating article..."
                  : "Generate Article"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
