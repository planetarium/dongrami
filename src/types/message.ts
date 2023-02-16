export type WorkerMessage = {
  key: "KEY_FILE_READ";
  data: {
    file: File;
  };
};

export type WorkerResultMessage = {
  key: "KEY_FILE_READ";
  data: {
    content: string;
  };
};

export type WorkerHandler = (message: WorkerMessage) => void;
export type WorkerResultHandler = (message: WorkerResultMessage) => void;
