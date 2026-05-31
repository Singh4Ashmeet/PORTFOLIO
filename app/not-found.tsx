import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page section-y">
      <p className="font-mono text-[11px] uppercase tracking-[3px] text-muted">
        404
      </p>
      <h1 className="mt-5 display-heading">Page not found</h1>
      <Link
        className="mt-8 inline-flex font-mono text-xs uppercase tracking-[1.5px] text-accent hover:underline"
        href="/"
      >
        return home →
      </Link>
    </section>
  );
}
