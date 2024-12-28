function ColorSelector() {
  return (
    <div className="item-color-selector">
      <div className="item-color-selector-label">
        <span>Selected color</span>
        <span>Gold-White</span>
      </div>
      <span className="item-color-selector-colors">
        <span className="color color-1" />
        <span className="color color-2" />
        <span className="color color-3" />
      </span>
    </div>
  );
}

export default ColorSelector;
