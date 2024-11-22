import { createContext, createRef, ReactNode, RefObject, useContext, useState } from 'react';

type TElementContext = {
  sheetOverlayRef: RefObject<HTMLSpanElement>;
  sheetElementRef: RefObject<HTMLDivElement>;
  sheetBaseInnerRef: RefObject<HTMLDivElement>;
};

const elementContextDefault = {
  sheetOverlayRef: createRef(),
  sheetElementRef: createRef(),
  sheetBaseInnerRef: createRef(),
} as TElementContext;

const ElementContext = createContext<TElementContext>(elementContextDefault);

function elementContextProvider({ children }: { children: ReactNode }) {

  return <ElementContext.Provider value={elementContextDefault}>{children}</ElementContext.Provider>;
}

const useElementContext = () => useContext(ElementContext);


export { ElementContext, elementContextProvider, useElementContext };
