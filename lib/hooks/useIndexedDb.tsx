import Dexie, { type EntityTable } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
export interface AudioFile {
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

  const deleteById = (id: number) => {
    try {
      db.audioFiles.delete(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFile = (audioFile: AudioFile) => {
    console.log(audioFile);
    db.audioFiles.update(audioFile.id, audioFile).then(function (updated) {
      if (updated) console.log("File was update");
      else console.log("Nothing was updated");
    });
  };
  // db.transaction('rw', db.emails, function () {
  // Add an email:
  //   db.emails.add({
  //     subject: "Testing full-text search",
  //     from: "david@abc.com",
  //     to: ["test@abc.com"],
  //     message: "Here is my very long message that I want to write"
  //   });

  //   // Search for emails:
  //   db.emails.where("messageWords")
  //     .startsWithIgnoreCase("v")
  //     .distinct()
  //     .toArray(function (a) {
  //       alert("Found " + a.length + " emails containing a word starting with 'v'");
  //     });
  // }).catch(function (e) {
  //   alert(e.stack || e);
  // });

  const { audioFiles } = db;
  const allItems = useLiveQuery(() => audioFiles.toArray(), []);

  return { saveToIndexedDB, audioFiles, allItems, deleteById, updateFile };
};
