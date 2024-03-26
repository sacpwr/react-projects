import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { sizeFilter } from "../redux/productSlice";
import "./styles.css";
export default function SizeFilters() {
  const availableSizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
  const [selectedSizes, setSelectedSizes] = useState(new Set<string>());
  const dispatch = useAppDispatch();

  const handleSelection = (e) => {
    if (e.target.checked) {
      setSelectedSizes((selSizes) => {
        selSizes.add(e.target.value);
        return selSizes;
      });
    } else {
      setSelectedSizes((selSizes) => {
        selSizes.delete(e.target.value);
        return selSizes;
      });
    }
    dispatch(sizeFilter({ selectedSizeTypes: selectedSizes }));
  };

  return (
    <div className="size-filter">
      <div className="size-text">
        <p>Sizes :</p>
      </div>
      <div className="size-chips">
        {availableSizes.map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              data-testid="checkbox"
              value={size}
              onClick={handleSelection}
            />
            <span className="checkmark">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
