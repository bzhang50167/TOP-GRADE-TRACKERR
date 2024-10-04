"use client";

import { useState } from "react";
import data from "../../recommendations.json";
import Nav from "../components/nav";

export default function Recommendations() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Nav />
      <div className="table-container p-8">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="search"
            className="bg-white border-2 p-2 rounded border-slate-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="table-header grid grid-cols-12">
          <div className="col-span-1">Code</div>
          <div className="col-span-11">Text</div>
        </div>
        <div className="table-content">
          {data
            .filter(
              (el) =>
                el.code.toLowerCase().includes(search.toLowerCase()) ||
                el.text.toLowerCase().includes(search.toLowerCase())
            )
            .map((el, i) => {
              return (
                <div
                  className="single-row grid grid-cols-12 gap-4 border-4"
                  key={i}
                >
                  <div className="col-span-1">{el.code}</div>
                  <div className="col-span-11">{el.text}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
