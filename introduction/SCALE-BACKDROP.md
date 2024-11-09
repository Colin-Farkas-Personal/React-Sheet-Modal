[<- Go back to main page](../README.md)

#### `property`

# scaleBackdrop

When included, adds the effect of scaling the backdrop when the sheet is open.

```ts
scaleBackdrop: srtring | boolean;
```

Specify the id of your app's root element. Setting the boolean value to `true` tells the sheet to look for the `id="root"` (this is usually the default id name for the root element).

> 💡 The backdrop effect will only be displayed when the sheet transitions to its max height (the large snap point).

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
    <Sheet isPresented={isSheetOpen} onClose={closeSheet} scaleBackdrop="my-root-element" />
  </div>
);
```
