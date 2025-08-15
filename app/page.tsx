"use client";

import { useRef, useState } from "react";
import Nav from "./components/nav";
import LandingHeader from "./components/LandingHeader";
import CopyrightFooter from "./components/copyrightFooter";
import recommendations from "../recommendations.json";
import findings from "../findings.json"; // <-- Add this file!

export default function Home() {
  const aboutUsRef = useRef(null);

  const [mode, setMode] = useState("recommendations"); // "recommendations" | "findings"
  const [searchRecommendations, setSearchRecommendations] = useState("");
  const [searchFindings, setSearchFindings] = useState("");

  const currentData =
    mode === "recommendations" ? recommendations : findings;

  const currentSearch =
    mode === "recommendations" ? searchRecommendations : searchFindings;

  const setCurrentSearch =
    mode === "recommendations" ? setSearchRecommendations : setSearchFindings;

  const filteredData = currentData.filter(
    (el) =>
      el.code.toLowerCase().includes(currentSearch.toLowerCase()) ||
      el.text.toLowerCase().includes(currentSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-auto">
      <Nav />
      <main className="flex flex-col w-full justify-start items-center gap-16">
        <LandingHeader aboutUsRef={aboutUsRef} />

        <div className="table-container p-8 w-full max-w-4xl">
          {/* Toggle Button */}
          <div className="flex justify-center mb-6">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() =>
                setMode((prev) =>
                  prev === "recommendations" ? "findings" : "recommendations"
                )
              }
            >
              Switch to {mode === "recommendations" ? "Findings" : "Recommendations"}
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder={`Search ${mode}`}
              className="bg-white border-2 p-2 rounded border-slate-500 w-full"
              value={currentSearch}
              onChange={(e) => setCurrentSearch(e.target.value)}
            />
          </div>

          {/* Table Header */}
          <div className="table-header grid grid-cols-12 font-bold border-b pb-2 mb-2">
            <div className="col-span-1">Code</div>
            <div className="col-span-11">Text</div>
          </div>

          {/* Filtered Table Rows */}
          <div className="table-content flex flex-col gap-2">
            {filteredData.map((el, i) => (
              <div
                className="single-row grid grid-cols-12 gap-4 border p-2 rounded"
                key={i}
              >
                <div className="col-span-1">{el.code}</div>
                <div className="col-span-11">{el.text}</div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="text-center text-gray-500 italic">
                No results found.
              </div>
            )}
          </div>
        </div>
      </main>
      <CopyrightFooter />
    </div>
  );
}
