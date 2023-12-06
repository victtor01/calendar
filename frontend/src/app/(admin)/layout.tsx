import AdminRoute from "@/components/adminRote";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminRoute>{children}</AdminRoute>;
}
