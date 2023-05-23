import Link from "next/link";

export default function Home() {
  return (
    <p className="h-[100vh]">
      <Link className="font-softgank text-cream-carmen" href="/hydration">
        Prefetching Using Hydration
      </Link>
    </p>
  );
}
