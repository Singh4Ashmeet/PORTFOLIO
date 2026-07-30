import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page section-y pt-32">
      <p className="font-mono text-sm text-accent">$ cd /this-page</p>
      <h1 className="mt-6 display-heading text-4xl md:text-6xl">
        Route not found
      </h1>
      <p className="mt-5 max-w-md text-sm leading-[1.8] text-secondary">
        bash: no such file or directory. The index, however, is fully
        operational.
      </p>
      <Link
        className="mt-8 inline-flex font-mono text-[12px] uppercase tracking-[0.16em] text-accent hover:text-white"
        href="/"
      >
        → cd /home
      </Link>
    </section>
  );
}
