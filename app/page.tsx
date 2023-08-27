import Link from "next/link";
import supabase from "@/utils/supabase";

export const revalidate = 0;

export default async function Drinks() {
  const { data: drinks } = await supabase.from("drinks").select();

  if (!drinks) {
    return <p>No drinks found.</p>;
  }

  return (
    <>
      <Link href="/add">+ Add Drink</Link>
      {drinks.map((drink) => (
        <p key={drink.id}>
          <Link href={`/${drink.id}`}>{drink.units}</Link>
          <br />
        </p>
      ))}
    </>
  );
}
