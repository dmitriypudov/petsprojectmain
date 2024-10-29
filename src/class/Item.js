export { Item };
import { useDBStore } from "../stores/dbStore";
import { useStorageStore } from "../stores/storageStore.js";

class Item {
  id = null;
  dateCreated = new Date();
  title = null;
  description = null;
  user = null;
  markers = [];
  status = null;
  animal = null;

  static parse(obj) {
    let item = new Item();
    item.id = obj.id;
    item.title = obj.title;
    item.description = obj.description;
    item.user = obj.user;
    item.status = obj.status;
    item.animal = obj.animal;
    item.markers = obj.markers.map((e) => [e.lat, e.lng]);
    item.dateCreated = obj.dateCreated.toDate().toLocaleString("RU-ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    return item;
  }

  static async getById(id) {
    const dbResult = await useDBStore().readById("items", id);

    if (!dbResult) {
      return null;
    }

    return this.parse(dbResult);
  }

  static async getCollection(order = null, filter = null) {
    const collection = await useDBStore().read("items", order, filter);

    let result = {};
    for (let [key, value] of Object.entries(collection)) {
      result[key] = this.parse(value);
    }

    return result;
  }

  static async getCount() {
    return useDBStore().getRowsCount("items");
  }

  async update() {
    if (!this.id) {
      return null;
    }

    return useDBStore().update("items", this.id, {
      title: this.title,
      description: this.description,
      status: this.status,
    });
  }

  async uploadImage(image) {
    if (!this.id) {
      return null;
    }

    const name = self.crypto.randomUUID();
    return await useStorageStore().upload(`/items/${this.id}/${name}`, image);
  }

  async getImagesURLs() {
    if (!this.id) {
      return null;
    }

    return useStorageStore().getFilesUrls(`/items/${this.id}/`);
  }

  async create() {
    const dbResult = await useDBStore().create("items", {
      title: this.title,
      description: this.description,
      user: this.user,
      dateCreated: this.dateCreated,
      status: this.status,
      animal: this.animal,
      markers: this.markers,
    });

    if (dbResult) {
      this.id = dbResult;
    }

    return dbResult;
  }
}
