import React, { useState } from "react";

import Context from "../utils/context";

const ContextLayout = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        loader,
        setLoader,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextLayout;
