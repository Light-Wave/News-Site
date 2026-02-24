import ResetPasswordPageClient from "./reset-password-page-client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const tokenParam = resolvedSearchParams.token;
  const token = Array.isArray(tokenParam)
    ? (tokenParam[0] ?? "")
    : (tokenParam ?? "");

  return <ResetPasswordPageClient token={token} />;
}
