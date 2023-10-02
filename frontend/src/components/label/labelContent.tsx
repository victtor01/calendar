interface labelContentProps {
  children: React.ReactNode;
}

export function LabelContent({ children}: labelContentProps) {
  return (
    <label className="flex flex-col w-full gap-1 relative">
     { children }
    </label>
  );
}
