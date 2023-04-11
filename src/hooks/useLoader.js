import { useState } from "react";

const useLoader = () => {
  const [loading, setLoading] = useState(true);

  return [loading, setLoading];
};

export default useLoader;