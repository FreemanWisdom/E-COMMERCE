import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/category/${category.id}`}
      className="group rounded-2xl border border-neutral-100 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-[var(--font-heading)] text-xl text-primary">{category.name}</h3>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-primary">
          {category.count}
        </span>
      </div>
      <p className="mt-3 text-sm text-primary/80 group-hover:text-primary">
        Explore curated {category.name.toLowerCase()} collections.
      </p>
    </Link>
  );
}
