interface layoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: layoutProps) {
  return (
    <div className="min-w-auto flex w-full p-3 h-auto flex-1">{children}</div>
  );
}
