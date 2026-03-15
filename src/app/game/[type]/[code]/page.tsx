import {
  GetContinentCountriesDocument,
  GetContinentCountriesQuery,
  GetContinentCountriesQueryVariables,
} from "@/gql/graphql";
import { client } from "@/lib/graphql/client";
import GameWrapper from "./GameWrapper";

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
      <GameWrapper
        dataset={data.continent.countries}
        countryCode="code"
        optionKey="name"
        removeOnWrongAnswer={true}
        nextQuestionOnWrongAnswer={true}
      />
    </main>
  );
}

export default GamePage;
