import { useContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import Context from "../utils/context";
import { auth } from "../utils/firebase";
import { createUser } from "../api/user";

const useAuth = () => {
  if (!Context) return null;
  const { user, setUser, setLoader } = useContext(Context);
  const navigation = useNavigation();

  onAuthStateChanged(auth, (currrentUser) => {
    setUser(currrentUser);
  });

  const signIn = async (values) => {
    setLoader(true);
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Train");
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const signUp = async (values) => {
    setLoader(true);
    try {
      const { email, password, name, lastname } = values;
      const request = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: `${name} ${lastname}`,
      });

      await createUser(request.user.uid, {
        email,
        name,
        lastname,
      });

      return request.user.id;
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return { user, signIn, signUp };
};

export default useAuth;
