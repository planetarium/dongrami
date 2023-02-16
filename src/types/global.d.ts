declare global {
  interface Worker {
    postMessage<T>(message: T, transfer: Transferable[]): void;
    postMessage<T>(message: T, options?: StructuredSerializeOptions): void;
  }

  interface Window {
    postMessage<T>(
      message: T,
      targetOrigin: string,
      transfer?: Transferable[]
    ): void;
    postMessage<T>(message: T, options?: WindowPostMessageOptions): void;
  }
}

export {};
