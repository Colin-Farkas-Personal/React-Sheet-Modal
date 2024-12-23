/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
