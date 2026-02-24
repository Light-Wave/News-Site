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

  if (!token) {
    return (
      <div>
        <h1>Invalid password reset link</h1>
        <p>The password reset link is missing a token or is invalid.</p>
      </div>
    );
  }
  return <ResetPasswordPageClient token={token} />;
}
