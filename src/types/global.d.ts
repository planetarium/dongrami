declare global {
  interface Worker {
    postMessage<T>(message: T, transfer: Transferable[]): void;
    postMessage<T>(message: T, options?: StructuredSerializeOptions): void;
  }
}

export {};
