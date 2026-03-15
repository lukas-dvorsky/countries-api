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
        className="select-none max-h-96 bg-inherit sm:max-h-56 border-t border-black/10 sticky top-0 z-5 shadow-sm shadow-black/20"
      />
      <h1 className="text-2xl font-bold text-center">
        {country?.name} <span className="font-light">({country?.code})</span>
      </h1>
      <span className="text-center text-lg relative -top-3">
        {country?.native}
      </span>

      <Separator />
      <NameValuePair name="Capital" value={country?.capital} />
      <Separator />
      <NameValuePair name="Currencies" value={country?.currencies.join(", ")} />
      <Separator />
      <NameValuePair name="Continent" value={country?.continent.name} />
      <Separator />
      <NameValuePair name="Phone numbers" value={country?.phones.join(", ")} />
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

      {country?.states.length !== 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xl text-center ">States</span>
            {country?.states.map((state) => {
              return (
                <div key={state.code}>
                  <NameValuePair name="Name" value={state.name} />
                  <NameValuePair name="Code" value={state.code} />
                </div>
              );
            })}
          </div>
        </>
      )}

      {country?.subdivisions.length !== 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xl text-center ">Subdivisions</span>
            {country?.subdivisions.map((subdivision) => {
              return (
                <div key={subdivision.code}>
                  <NameValuePair
                    name="Name"
                    value={
                      subdivision.emoji
                        ? subdivision.emoji + " " + subdivision.name
                        : subdivision.name
                    }
                  />
                  <NameValuePair name="Code" value={subdivision.code} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default CountryData;
