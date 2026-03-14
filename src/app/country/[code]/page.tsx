import NameValuePair from "@/components/NameValuePair";
import {
  GetCountryByCodeDocument,
  GetCountryByCodeQuery,
  GetCountryByCodeQueryVariables,
} from "@/gql/graphql";
import { client } from "@/lib/graphql/client";
import CountryData from "./CountryData";

interface CountryPageProps {
  params: Promise<{ code: string }>;
}

async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;
  const countryData = await client.request<
    GetCountryByCodeQuery,
    GetCountryByCodeQueryVariables
  >(GetCountryByCodeDocument, { code });

  const country = countryData.country;
  console.log(country);

  return (
    <main>
      <CountryData country={country} code={code} />
    </main>
  );
}

export default CountryPage;
