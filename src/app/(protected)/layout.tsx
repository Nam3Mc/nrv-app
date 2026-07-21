import { requireAuth } from "@/core/auth/require-auths";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  await requireAuth();
  return <>{children}</>;
}