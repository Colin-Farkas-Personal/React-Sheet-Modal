# Watching for changes in the library component (Sheet)
- Currently I use a npm package "vite-plugin-restart" to listen to changes in the library and restart the dev server.

I prefer a clean project with less dependencies. I would like to find a solution that works with Vite without using a plugin. 

# Dist folder and Transpiled modules
- When changes are made to files inside of the library that are not of typescript and then building (eg. npm run build), the default behaviour of vite is to transpile only a main.css and main.js file in the dist folder. 

Generally you make changes in code located in typescript files. But when when you update any non-typescript file it becomes a twostep process for something that should be automatically handled. Another accompanying problem is that when the type module (*.d.ts) is missing, trying to import the symlink component results in a typescript error

"Could not find a declaration file for module 'react-sheet-modal'. '/Users/colinfarkas/Code/personal/SheetReact/dist/main.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-sheet-modal` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-sheet-modal';`ts(7016)"