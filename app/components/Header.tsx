import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/ReLeague.png" alt="ReLeague" width={60} height={60} className="mr-3" />
          <h1 className="text-2xl font-bold text-green-800">ReLeague U13</h1>
        </div>
        <nav>
          <a href="#" className="mx-3 text-green-800 hover:text-green-600">Home</a>
          <a href="#" className="mx-3 text-green-800 hover:text-green-600">Fixtures</a>
          <a href="#" className="mx-3 text-green-800 hover:text-green-600">Results</a>
          <a href="#" className="mx-3 text-green-800 hover:text-green-600">Table</a>
        </nav>
      </div>
    </header>
  )
}