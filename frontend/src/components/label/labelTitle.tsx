interface labelTitleProps {
    children: React.ReactNode
}

export function LabelTitle({ children }: labelTitleProps) {
  return (
    <div className="w-full text-lg font-semibold flex items-center gap-1">
      {children}
    </div>
  );
}
