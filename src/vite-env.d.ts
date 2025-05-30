/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENABLE_3D_DEBUG: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}