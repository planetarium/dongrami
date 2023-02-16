import { WorkerResultHandler } from "../types/message";

const handle: WorkerResultHandler = async (message) => {
  if (message.key !== "KEY_FILE_READ") {
    return;
  }

  console.log(message.data.content);
};

export default handle;
