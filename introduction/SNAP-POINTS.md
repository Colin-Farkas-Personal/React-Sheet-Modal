[<- Go back to main page](../README.md)

#### `property`

# snapPoints

Sets the available snapping points for the sheet.

```ts
snapPoints: SnapPoint[];
```

An array of snap points for the sheet, where the first height dictates the default opened height for the sheet. If you add more than one detent, the sheet can be resized between the points.

```tsx
const [isSheetOpen, setIsSheetOpen] = useState(false);

function openSheet() {
  setIsSheetOpen(true);
}
function closeSheet() {
  setIsSheetOpen(false);
}

return (
  <div>
    <button onClick={openSheet}>Open sheet</button>
    <Sheet
      isPresented={isSheetOpen}
      onClose={closeSheet}
      snapPoints={[SnapPoint.medium, SnapPoint.large]}
    />
  </div>
);
```

#### `type`

# SnapPoint

Specifies the individual heights for the snap points.

```ts
type SnapPoint: 'large' | 'medium' | number;
```

By default, sheets support the `large` snap point. Adding the `medium` snap point allows the sheet to snap between both heights. Specifying only medium prevents the sheet from expanding to full height.

It is also possible possible to add custom heights in `number`, specifying the height in pixels.

#### Union types

> 💡
> For the preexisting height intervals you can use either the SnapPoint object, or just the string literal.

`SnapPoint.large` - `"large"`

The default height for a sheet if no other has been specified. The snap point for a sheet at full height of the small viewport height.

---

`SnapPoint.medium` - `"medium"`

The height for a sheet at aproximatly half the height of the viewport.

---

`number`

A number specifying the snap point height in pixels.

---

`SnapPoint.fitContent` - `fit-content`

Sets the height to adjust to the content of the sheet.
