"use client";
import { useState } from "react";

const data = [
  {
    code: "1TSS",
    text: "RECOMMENDATION - TOP GRADE TERMITE CONTROL to knock down the tubes and treat the subarea soil with TERMIDOR (FIPRONIL) for the control of termites. Area must be vacated at the time of application.",
  },
  {
    code: "1TSE",
    text: "RECOMMENDATION - TOP GRADE TERMITE CONTROL to rod and treat the exterior soil with TERMIDOR (FIPRONIL) for the control of termites. Any holes drilled in the concrete will be patched with mortar.",
  },
  {
    code: "1TSG",
    text: "RECOMMENDATION - TOP GRADE TERMITE CONTROL to drill through the interior garage concrete and inject TERMIDOR (FIPRONIL). NOTE* This is a local treatment method.",
  },
  {
    code: "1SFT",
    text: "RECOMMENDATION - TOP GRADE TERMITE CONTROL to knock down mud tubes and treat the exterior soil, exterior concrete, and subarea soil with TERMIDOR (FIPRONIL) per label instructions for the control of termites. Any holes made in the concrete will be filled with mortar.",
  },
];

export default function Findings() {
  const [search, setSearch] = useState("");

  //create a function that will highlight the words that are currently searched for

  return (
    <div className="table-container p-8">
      <div className="flex justify-center">
        <input type="text" className="bg-white border-2 p-2 rounded border-slate-500" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div className="table-header grid grid-cols-12">
        <div className="col-span-1">Code</div>
        <div className="col-span-11">Text</div>
      </div>
      <div className="table-content">
        {data.filter(el => el.code.toLowerCase().includes(search.toLowerCase()) || el.text.toLowerCase().includes(search.toLowerCase())).map((el, i) => {
          return (<div className="single-row grid grid-cols-12 gap-4 border-4" key={i}>
            <div className="col-span-1">{el.code}</div>
            <div className="col-span-11">{el.text}</div>
            </div>)
        }
        )}
      </div>
    </div>
  );
}
