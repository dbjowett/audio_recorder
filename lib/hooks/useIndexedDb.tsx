import Dexie, { type EntityTable } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
export interface AudioFile {
  id: number;
  title: string;
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
        title: "Untitled",
        createdAt,
      })
      .catch((err: unknown) => console.log(err));

    return id;
  };

  const deleteById = (id: number) => {
    try {
      db.audioFiles.delete(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFile = (audioFile: AudioFile) => {
    db.audioFiles.update(audioFile.id, audioFile).then(function (updated) {
      if (updated) console.log("File was update");
      else console.log("Nothing was updated");
    });
  };

  const { audioFiles } = db;
  const allAudioFiles = useLiveQuery(() => audioFiles.toArray(), []);

  return { saveToIndexedDB, audioFiles, allAudioFiles, deleteById, updateFile };
};
