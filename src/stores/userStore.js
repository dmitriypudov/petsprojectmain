import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { User } from "../class/User";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  deleteUser,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const useUserStore = defineStore("user", () => {
  const auth = getAuth();
  let user = ref(auth.currentUser);
  let userNative = ref(new User());

  const isLoggedIn = computed(() => user.value !== null);

  onAuthStateChanged(auth, async (login) => {
    if (login) {
      user.value = login;
      userNative.value = await User.getById(getUserId());
    } else {
      user.value = null;
    }
  });

  const init = async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (login) => {
        if (login) {
          user.value = login;
          userNative.value = await User.getById(getUserId());
        } else {
          user.value = null;
        }
        resolve();
      });
    });
  };

  const createUser = async (email, password) => {
    try {
      await auth.setPersistence(browserLocalPersistence);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;

      return true;
    } catch (error) {
      return error.message;
    }
  };

  const login = async (email, password) => {
    try {
      await auth.setPersistence(browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;

      return true;
    } catch (error) {
      return error.message;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return error.message;
    }
  };

  const getUserId = () => user.value?.uid;

  const deleteAccount = async () => {
    if (user.value) {
      await deleteUser(user.value);
    }
  };

  return { init, createUser, login, logout, getUserId, deleteAccount, isLoggedIn, user, userNative };
});
