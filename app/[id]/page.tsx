import supabase from "@/utils/supabase";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: drinks } = await supabase.from("drinks").select("id");

  return drinks?.map(({ id }: { id: string }) => ({
    id,
  }));
}

export default async function Drink({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = await supabase
    .from("drinks")
    .select()
    .match({ id })
    .single();

  if (!data) {
    notFound();
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
