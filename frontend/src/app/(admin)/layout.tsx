import Private from "@/components/private"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Private>
      {children}
    </Private>
  )
}
