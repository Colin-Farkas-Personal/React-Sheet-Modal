# React Sheet Modal

![Library Illustration](./images/reactLibraryIllustration.png 'Main Illustration')

`A Sheet Modal for ReactJs`

| ⭐️ Easy integration | 🛠️ Configurable | ⚡️ Zero Dependencies |
| -------------------- | --------------- | --------------------- |

A ReactJs library for displaying a sheet modal. A type of modal that is displayed from the bottom of the viewport and helps the user perform a scoped task that is closely related to their current context.

## How to install

Install the component using npm:

```node
npm install react-sheet-modal
```

## Table of contents

- [How to install](#how-to-install)
- [How to use](#how-to-use)
- [Properties](#properties)

## How to use

The **Sheet.tsx** component is similarily structured to its SwiftUI counterpart and is easily implemented with ones project.

In its simplest form the sheet takes in two properties. _isPresented_ - A boolean, whether the sheet is displayed. And _onClose_ - A callback function for closing the sheet. To these properties you pass a state variable that sets whether to show or hide the sheet.

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
    <Sheet isPresented={isSheetOpen} onClose={closeSheet} />
  </div>
);
```

## 🎛️ Properties

Use the available properties to customize the look and behaviour of the sheet.

### ` isPresented` `(required)`

##### `boolean`

Determines whether the sheet is displayed

---

### `onClose` `(required)`

##### `() => void`

Callback function that is called when the sheet is closed

---

### [`snapPoints`](SNAP-POINTS.md#snap-point)

##### `SnapPoint[]`

Sets the available snapping points for the sheet

---

### `showGrabber`

##### `boolean`

Determines whether to show a grabber at the top of the sheet

---

### `scaleBackdrop`

##### `string | boolean`

When included, adds the effect of scaling the backdrop when the sheet is open

---

### `backgroundInteractionEnabled`

##### `boolean`

If true, allows interaction with the background when the sheet is open

---

### `preventCloseOnResize`

##### `boolean`

If true, prevents the sheet from closing when the sheet is resized

---

### `backgroundColor`

##### `CSSProperties['backgroundColor']`

Sets the background color of the sheet

---

### `borderRadius`

##### `string`

Sets the roundness of the corners of the sheet

---

### `className`

##### `string`

Add a custom styling class to the sheet

---

### `style`

##### `CSSProperties`

Overwrite the style attribute of the sheet

---

### `children`

##### `ReactNode`

Content to be displayed inside the sheet.
