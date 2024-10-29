import { defineStore } from "pinia";
import {
  getFirestore,
  updateDoc,
  where,
  getCountFromServer,
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";

export const useDBStore = defineStore("db", () => {
  const db = getFirestore();

  const tables = {
    users: collection(db, "users"),
    items: collection(db, "items"),
  };

  const create = async (tableCode, data) => {
    try {
      const docRef = await addDoc(tables[tableCode], data);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  const readById = async (tableCode, id) => {
    const snap = await getDoc(doc(tables[tableCode], id));

    if (snap.exists()) {
      let result = snap.data();
      result.id = snap.id;
      return result;
    }

    return null;
  };

  const read = async (tableCode, order, filter, limitBy) => {
    const tableRef = tables[tableCode];
    let q = null;
    if (!order && !filter) {
      q = query(tableRef, limit(limitBy));
    } else if (!order && filter) {
      q = query(tableRef, where(...filter), limit(limitBy));
    } else if (order && !filter) {
      q = query(tableRef, orderBy(...order), limit(limitBy));
    } else if (order && filter) {
      q = query(tableRef, orderBy(...order), where(...filter), limit(limitBy));
    }

    const querySnapshot = await getDocs(q);

    let result = {};
    querySnapshot.forEach((doc) => {
      result[doc.id] = doc.data();
      result[doc.id].id = doc.id;
    });

    return result;
  };

  const update = async (tableCode, id, data) => {
    return updateDoc(doc(tables[tableCode], id), data);
  };

  const getRowsCount = async (tableCode) => {
    const snapshot = await getCountFromServer(tables[tableCode]);
    return snapshot.data().count;
  };

  return {
    create,
    read,
    readById,
    update,
    getRowsCount,
  };
});
