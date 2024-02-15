import Header from "@/components/calendar/header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="flex w-full flex-col gap-4">
      <Header />
      {children}
    </main>
  );
}
