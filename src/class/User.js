export { User };
import { useDBStore } from "../stores/dbStore";

class User {
  id = null;
  name = null;
  lastName = null;
  phone = null;
  email = null;
  favorites = [];
  auth = null;

  static parse(obj) {
    let user = new User();
    user.id = obj.id;
    user.name = obj.name;
    user.lastName = obj.lastName;
    user.phone = obj.phone;
    user.email = obj.email;
    user.favorites = obj.favorites;
    user.auth = obj.auth;

    return user;
  }

  static async getById(id) {
    const dbResult = await useDBStore().read("users", null, ["auth", "==", id]);

    if (!dbResult) {
      return null;
    }

    return this.parse(Object.values(dbResult)[0]);
  }

  async update() {
    const dbResult = await useDBStore().update("users", this.id, {
      name: this.name,
      lastName: this.lastName,
      favorites: this.favorites,
    });

    return dbResult;
  }

  static async getCount() {
    return useDBStore().getRowsCount("users");
  }

  async create() {
    const dbResult = await useDBStore().create("users", {
      name: this.name,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      favorites: this.favorites,
      auth: this.auth,
    });

    if (dbResult) {
      this.id = dbResult;
    }

    return dbResult;
  }
}
