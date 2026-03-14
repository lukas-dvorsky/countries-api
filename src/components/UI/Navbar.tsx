"use client";

import { GetCountriesQuery } from "@/gql/graphql";
import SearchBar from "./SearchBar";
import { redirect } from "next/navigation";

interface NavbarProps {
  searchBarData: GetCountriesQuery;
}

function Navbar({ searchBarData }: NavbarProps) {
  return (
    <nav className="w-screen shadow-2xl flex justify-center items-center h-12 z-10">
      <SearchBar
        className="w-86"
        data={searchBarData.countries}
        searchBy={["name", "code", "capital"]}
        showData={["emoji", "name"]}
        action={(country) => redirect(`/country/${country.code}`)}
        resetAfterAction
      />
    </nav>
  );
}

export default Navbar;
