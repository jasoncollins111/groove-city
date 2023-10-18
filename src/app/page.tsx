import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>Groove City</p>
      </div>


        <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319">
          <div>
            <label>City</label>
            <input type="text" name="city" />
          </div>
          <button type="submit">Find your groove</button>
        </form>
    </main>
  )
}
