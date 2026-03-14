import NameValuePair from "@/components/NameValuePair";
import Separator from "@/components/UI/Separator";
import { GetCountryByCodeQuery } from "@/gql/graphql";

interface CountryDataProps {
  country: GetCountryByCodeQuery["country"];
  code: string;
}

function CountryData({ country, code }: CountryDataProps) {
  return (
    <div className="w-screen sm:w-100 flex flex-col bg-mist-50 h-screen shadow gap-4 overflow-y-auto pb-16 inset-shadow-sm inset-shadow-black/20">
      <img
        src={`https://flagcdn.com/${code.toLocaleLowerCase()}.svg`}
        alt={`${code} Flag`}
        draggable={false}
        className="select-none max-h-96 bg-inherit sm:max-h-56 border-t border-black/10 sticky top-0 z-5"
      />
      <h1 className="text-2xl font-bold text-center">
        {country?.name} <span className="font-light">({country?.code})</span>
      </h1>
      <span className="text-center text-lg relative -top-3">
        {country?.native}
      </span>

      <Separator />

      <div>
        <NameValuePair name="Capital" value={country?.capital} />
      </div>

      <Separator />
      <NameValuePair name="Currencies" value={country?.currencies.join(", ")} />

      <Separator />

      <div>
        <NameValuePair name="Continent" value={country?.continent.name} />
      </div>

      <Separator />

      <div>
        <NameValuePair
          name="Phone numbers"
          value={country?.phones.join(", ")}
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <span className="font-bold text-xl text-center ">Languages</span>
        {country?.languages.map((lang) => {
          return (
            <div key={lang.code}>
              <NameValuePair name="Name" value={lang.name} />
              <NameValuePair name="Native" value={lang.native} />
              <NameValuePair name="Code" value={lang.code} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CountryData;
