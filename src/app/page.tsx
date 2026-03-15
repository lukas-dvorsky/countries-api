import { client } from "@/lib/graphql/client";
import GameSelectionSection from "./game/[type]/[code]/GameSelectSection";
import { GetContinentsDocument, GetContinentsQuery } from "@/gql/graphql";

export default async function Home() {
  const continents = await client.request<GetContinentsQuery>(
    GetContinentsDocument,
  );

  return (
    <main className="h-screen w-screen flex flex-col items-center overflow-scroll">
      <div className="mt-32 flex flex-col gap-16">
        <GameSelectionSection
          data={continents.continents}
          titleKey="name"
          secitonTitle="Guess countries by their flags!"
          codeKey="code"
        />
      </div>
    </main>
  );
}
