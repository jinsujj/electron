export {};

declare global {
  interface Window {
    api?: {
      hello: () => string;
    };
  }
}
