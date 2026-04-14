import { FilterLinks } from "./filter-links";

const ITEMS = [
  { name: "Red A", color: "red" },
  { name: "Red B", color: "red" },
  { name: "Blue A", color: "blue" },
  { name: "Blue B", color: "blue" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ color?: string | string[] }>;
}) {
  const { color } = await searchParams;
  const selected = color ? (Array.isArray(color) ? color : [color]) : [];
  const items = selected.length
    ? ITEMS.filter((i) => selected.includes(i.color))
    : ITEMS;

  return (
    <main style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>Multi-value searchParams bug</h1>
      <FilterLinks selected={selected} />
      <p>Server sees: {JSON.stringify(selected)}</p>
      <ul>
        {items.map((i) => (
          <li key={i.name}>{i.name}</li>
        ))}
      </ul>
    </main>
  );
}
