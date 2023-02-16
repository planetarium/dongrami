import type {
  WorkerResultHandler,
  WorkerResultMessage,
} from "../types/message";
import KEY_FILE_READ from "./KeyFileRead";

const WorkerResultHandler: Record<
  WorkerResultMessage["key"],
  WorkerResultHandler
> = {
  KEY_FILE_READ,
};
