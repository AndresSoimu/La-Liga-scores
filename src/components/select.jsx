import { useEffect } from "react";

const optionNumber = [];

function selectOption(i) {
  for (let i = 1; i <= 38; i++) {
    optionNumber.push(i);
  }
}

function SelectDate({ ...props }) {
  useEffect(() => {
    selectOption();
  }, []);

  return (
    <label className="select">
      <select onChange={props.onChange}>
        {optionNumber.map((number, index) => {
          return (
            <option key={index} value={number}>
              Jornada {number}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default SelectDate;
