import type {
  WorkerHandler,
  WorkerMessage,
  WorkerResultMessage,
} from "./types/message";

const KEY_FILE_READ: WorkerHandler = async (message) => {
  if (message.key !== "KEY_FILE_READ") {
    console.log(message.key);

    return;
  }

  var reader = new FileReader();
  reader.onload = function (e) {
    console.log(this.result); // this.result is the read file as an ArrayBuffer.
  };
  reader.onerror = function (e) {
    console.log(e);
  };
  reader.readAsArrayBuffer(message.data.file);

  self.postMessage<WorkerResultMessage>({
    key: "KEY_FILE_READ",
    data: {
      content: await message.data.file.text(),
    },
  });
};

const WorkerHandler: Record<WorkerMessage["key"], WorkerHandler> = {
  KEY_FILE_READ,
};

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  console.log("t");

  WorkerHandler[e.data.key](e.data);
};
