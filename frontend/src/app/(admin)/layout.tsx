import AdminRoute from "@/components/adminRote";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRoute>
      <div className="h-screen w-full bg-red-200">{children}</div>
    </AdminRoute>
  );
}
