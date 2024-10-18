declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_ORIGIN: string;
    }
  }
}

export {}
