import getPokemonById from "@/utils/api/getPokemonById";
import { createCSVContext } from "@/utils/createCSVContext";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  const { ids } = await request.json();

  const data = await Promise.all(
    ids.map((id: number) => getPokemonById(String(id)))
  );

  const csv = createCSVContext(data);

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition':
        'attachment; filename="favorites.csv"',
    },
  });
}