export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 bg-gray-50">
      {children}
    </main>
  )
}