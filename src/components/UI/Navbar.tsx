"use client";

import { GetCountriesQuery } from "@/gql/graphql";
import SearchBar from "./SearchBar";
import { redirect } from "next/navigation";

interface NavbarProps {
  searchBarData: GetCountriesQuery;
}

function Navbar({ searchBarData }: NavbarProps) {
  return (
    <nav className="w-screen shadow-2xl flex justify-between items-center h-[5vh] px-12 z-9999">
      <a href="/" className="text-xl">
        Countries
      </a>
      <SearchBar
        className="w-86 mx-auto"
        data={searchBarData.countries}
        searchBy={["name", "code", "capital"]}
        showData={["emoji", "name"]}
        action={(country) => redirect(`/country/${country.code}`)}
        resetAfterAction
      />
      <span className="flex gap-1 text-sm">
        Made by
        <a
          href="https://github.com/lukas-dvorsky/countries-api"
          target="_blank"
          className="hover:underline cursor-pointer"
        >
          Lukáš Dvorský
        </a>
        2026
      </span>
    </nav>
  );
}

export default Navbar;
