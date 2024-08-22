import { useState } from "react";
import { search_icon, filter_icon, add_icon } from "../assets/assets";
import UsersTable from "./UsersTable";

const PeopleDirectory = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <div className="flex-1 mt-5 mb-4 mr-6 border border-neutral-200 rounded-xl relative z-10 bg-white">
      <div className="flex items-center justify-between h-[4.3rem] border-neutral-200 border-b">
        <div className="ml-6">
          <span className="font-semibold text-lg text-gray-900">
            Team Members
          </span>
          <span className="ml-2 text-sm bg-brand-50 text-dark_violet px-2 py-0.5 rounded-xl border-gray-200 border">
            100 users
          </span>
        </div>
        <div className="flex gap-0.5 mr-2">
          <div className="border border-neutral-200 border-b-gray-700 rounded-sm pl-4 pr-2 py-1 flex items-center">
            <label htmlFor="search">
              <input
                id="search"
                type="search"
                placeholder="Search"
                className="outline-none placeholder:text-base placeholder-gray-400"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </label>
            <button type="submit">
              <img src={search_icon} alt="search" />
            </button>
          </div>
          <button className="p-2">
            <img src={filter_icon} alt="filter" />
          </button>
          <button className="bg-dark_violet text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
            <img
              src={add_icon}
              alt=""
              className="w-5 h-5 p-1"
              aria-hidden="true"
            />
            <span className="ml-1">ADD MEMBER</span>
          </button>
        </div>
      </div>
      <UsersTable globalFilter = {searchInput} setGlobalFilter = {setSearchInput} />
      {/* <Temp/> */}
    </div>
  );
};

export default PeopleDirectory;
