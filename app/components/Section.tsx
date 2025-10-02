export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        {children}
      </div>
    </section>
  )
}