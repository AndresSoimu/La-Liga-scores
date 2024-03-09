import "./App.css";
import { useEffect, useState } from "react";
import SelectDate from "./components/select.jsx";

function App() {
  const [info, setInfo] = useState();
  const [date, setDate] = useState(25);
  const ApiUrl = `https://api.openligadb.de/getmatchdata/laliga1/2023/${date}`;

  const selectElement = document.querySelector("select");

  function getDate() {
    setDate(selectElement?.value);
  }

  async function getData() {
    try {
      const response = await fetch(ApiUrl, {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("error fetching API");
      }
      const data = await response.json();
      setInfo(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData();
  }, [date]); // eslint-disable-line
  //if(!info) return
  //console.log(info?.map(match=>{return {match}}));

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          La Liga
          <span>
            <svg
              width="60"
              height="60"
              viewBox="0 0 70 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              alt="LALIGA logotipo"
            >
              <path
                d="M2.91 25.173L20.332 0h16.854L15.497 30.861h14.08L7.675 42.026l-4.41-5.618C1.701 34.346.99 32.782.99 30.648c0-1.92.712-3.77 1.92-5.475zM17.203 51.2c0-1.778.712-3.698 1.99-5.547L51.265 0h18.56L33.841 51.2h16.213L24.882 64l-5.405-6.897c-1.493-1.92-2.275-3.84-2.275-5.902l.001-.002z"
                fill="#FF4B44"
              ></path>
            </svg>
          </span>
        </h1>
        <div>
          <SelectDate onChange={getDate} />
        </div>

        <ol>
          {info?.map((match, index) => {
            const { team1, team2, matchResults } = match;

            let resultSimbol = "vs";
            if (matchResults[1]?.pointsTeam1 >= 0) {
              resultSimbol = ":";
            }

            // console.log(match);
            return (
              <li key={index}>
                <p className="team-name-1">{team1.teamName} </p>
                <div className="score">
                  <img src={team1.teamIconUrl} alt="" />
                  <p>{matchResults[1]?.pointsTeam1}</p>

                  <p>{resultSimbol}</p>

                  <p>{matchResults[1]?.pointsTeam2}</p>
                  <img src={team2.teamIconUrl} alt="" />
                </div>
                <p className="team-name-2">{match.team2.teamName} </p>
              </li>
            );
          })}
        </ol>
      </header>
    </div>
  );
}

export default App;
