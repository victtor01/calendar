import Header from "@/components/calendar/header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="flex w-full flex-col border dark:border-zinc-700 bg-white">
      <Header />
      {children}
    </main>
  );
}
