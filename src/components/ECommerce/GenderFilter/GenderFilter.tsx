import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { genderFilter } from "../redux/productSlice";
import "./styles.css";
export default function GenderFilters() {
  const genders = [
    { fullName: "Male", shortName: "M" },
    { fullName: "Female", shortName: "F" },
  ];
  const [selectedGenders, setSelectedGenders] = useState(new Set<string>());
  const dispatch = useAppDispatch();

  const handleSelection = (e) => {
    if (e.target.checked) {
      setSelectedGenders((selGenders) => {
        selGenders.add(e.target.value);
        return selGenders;
      });
    } else {
      setSelectedGenders((selGenders) => {
        selGenders.delete(e.target.value);
        return selGenders;
      });
    }
    dispatch(
      genderFilter({ selectedGenders: new Set<string>(selectedGenders) })
    );
  };

  return (
    <div className="gender-filter">
      <div className="gender-text">
        <p>Genders :</p>
      </div>
      <div className="gender-chips">
        {genders.map((gender) => (
          <label key={gender.shortName}>
            <input
              type="checkbox"
              data-testid="checkbox"
              value={gender.shortName}
              onClick={handleSelection}
            />
            <span className="gender-checkmark">{gender.fullName}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
