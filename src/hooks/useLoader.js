import { useContext } from "react";

import Context from "../utils/context";

const useLoader = () => {
  if (!Context) return null;
  const { loader, setLoader } = useContext(Context);

  return { loader, setLoader };
};

export default useLoader;
