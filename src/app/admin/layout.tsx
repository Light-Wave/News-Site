export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white flex-1 flex flex-col min-h-screen">
      <main className="flex-1 mx-auto w-full">{children}</main>
    </div>
  );
}
