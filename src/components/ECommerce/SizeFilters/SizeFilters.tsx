import "./styles.css";
export default function SizeFilters() {
  const availableSizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];

  return (
    <div className="size-filter">
      <div className="size-text">
        <p>Sizes :</p>
      </div>
      <div className="size-chips">
        {availableSizes.map((size) => (
          <label>
            <input type="checkbox" data-testid="checkbox" value={size} />
            <span className="checkmark">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
