import Dexie, { type EntityTable } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
interface AudioFile {
  id: number;
  isUploaded?: boolean;
  blob: Blob;
  createdAt: Date;
}

const db = new Dexie("audio-recordings") as Dexie & {
  audioFiles: EntityTable<AudioFile, "id">;
};

db.version(1).stores({
  audioFiles: "++id, blobs, createdAt",
});

export const useIndexedDb = () => {
  const saveToIndexedDB = async (blob: Blob | null) => {
    if (!blob) return;
    const createdAt = new Date();
    const id = await db.audioFiles
      .add({
        blob,
        isUploaded: false,
        createdAt,
      })
      .catch((err: unknown) => console.log(err));

    return id;
  };

  const { audioFiles } = db;
  const allItems = useLiveQuery(() => audioFiles.toArray(), []);

  return { saveToIndexedDB, audioFiles, allItems };
};
