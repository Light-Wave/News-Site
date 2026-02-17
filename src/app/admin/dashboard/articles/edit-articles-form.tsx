"use client";

import { updateArticle, deleteArticle } from "@/actions/article";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import TipTapEditor from "@/components/create-article/TipTapEditor";
import { Prisma } from "@/generated/prisma/client";

const formSchema = z.object({
  headline: z.string().min(2),
  summary: z.string().min(10),
  image: z.string().min(1),
  content: z.string().min(10),
  categoryIds: z.array(z.string()).min(1),
});

type FormValues = z.infer<typeof formSchema>;
type ArticleWithCategories = Prisma.ArticleGetPayload<{
  include: { categories: true };
}>;

export default function EditArticleForm({
  article,
  categories,
}: {
  article: ArticleWithCategories;
  categories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: article.headline,
      summary: article.summary,
      image: article.image,
      content: article.content,
      categoryIds: article.categories.map((c) => c.id),
    },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await updateArticle({
      id: article.id,
      ...values,
    });

    if (res.success) {
      toast.success(`"${values.headline}" updated successfully`);
    } else {
      toast.error(res.message ?? "Failed to update article");
    }
  };

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    setIsDeleting(true);
    const res = await deleteArticle({ id: article.id });
    setIsDeleting(false);

    if (res.success) {
      toast.success(`"${article.headline}" deleted successfully`);
      router.push("/admin/dashboard/articles"); // Redirect back to list
    } else {
      toast.error(res.message ?? "Failed to delete article");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Edit Article</CardTitle>
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

              {/* Content */}
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

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  type="submit"
                  className="flex-1 cursor-pointer"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Updating..."
                    : "Update Article"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="flex-1"
                  onClick={onDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Article"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
