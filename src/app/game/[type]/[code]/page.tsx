import {
  GetContinentCountriesDocument,
  GetContinentCountriesQuery,
  GetContinentCountriesQueryVariables,
} from "@/gql/graphql";
import { client } from "@/lib/graphql/client";
import GameClient from "./GameClient";

interface GamePageProps {
  params: Promise<{ code: string; type: string }>;
}

async function GamePage({ params }: GamePageProps) {
  const { code, type } = await params;
  const data = await client.request<
    GetContinentCountriesQuery,
    GetContinentCountriesQueryVariables
  >(GetContinentCountriesDocument, { code });

  if (!data.continent) return <div>Something went wrong..</div>;

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <GameClient
        dataset={data.continent.countries}
        countryCode="code"
        optionKey="name"
      />
    </main>
  );
}

export default GamePage;
