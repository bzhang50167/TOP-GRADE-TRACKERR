"use client";
import data from "../../recommendations.json";

export default function Recommendations() {
  console.log("Data: ", data);
  return (
    <div className="flex justify-items-center w-full overflow-x-auto">
      <div className="flex justify-self-center w-full m-4">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody style={{ border: "solid 1px", margin: "2px" }}>
            {data.map((el, i) => {
              return (
                <tr key={i} style={{ border: "solid 1px" }}>
                  <td>{el.code}</td>
                  <td>{el.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
