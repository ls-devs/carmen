import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1 className="font-thunder text-red-carmen">
        Hello, Next.js 13 App Directory!
      </h1>
      <p>
        <Link className="font-softgank text-cream-carmen" href="/hydration">
          Prefetching Using Hydration
        </Link>
      </p>
    </>
  )
}
