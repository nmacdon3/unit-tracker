import Link from "next/link";
import supabase from "@/utils/supabase";
import NewDrink from "./NewDrink";

export const revalidate = 0;

export default async function Drinks() {
  const { data: drinks } = await supabase.from("drinks").select();

  if (!drinks) {
    return <p>No drinks found.</p>;
  }

  return (
    <>
      {drinks.map((drink) => (
        <p key={drink.id}>
          <Link href={`/${drink.id}`}>{drink.type}</Link>
          <br />
        </p>
      ))}
      <NewDrink />
    </>
  );
}
