import { WorkerMessage } from '../types/message';

export function readKeyFile(worker: Worker | null, file: File | null) {
  if (!worker || !file) {
    return;
  }

  worker.postMessage<WorkerMessage>({
    key: 'KEY_FILE_READ',
    data: { file },
  });
}
