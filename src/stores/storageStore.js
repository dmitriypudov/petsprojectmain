import { defineStore } from "pinia";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export const useStorageStore = defineStore("storage", () => {
  const storage = getStorage();

  const upload = async (path, file) => {
    try {
      await uploadBytes(ref(storage, path), file);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getFilesUrls = async (path) => {
    const list = await listAll(ref(storage, path));

    let urls = [];
    for (const ref of list.items) {
      urls.push(await getDownloadURL(ref));
    }

    return urls;
  };

  return { upload, getFilesUrls };
});
