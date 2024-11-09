[<- Go back to main page](README.md)

#### `property`

# backgroundInteractionEnabled

If true, allows interaction with the background when the sheet is open

```ts
backgroundInteractionEnabled: boolean;
```

Useful for when you need display a sheet and still need to let the user interact with the backdrop.

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
    <Sheet isPresented={isSheetOpen} onClose={closeSheet} backgroundInteractionEnabled />
  </div>
);
```
