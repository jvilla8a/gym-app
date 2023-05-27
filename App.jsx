import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./src/navigation/Navigation";
import ContextLayout from "./src/components/ContextLayout";
import useFonts from "./src/hooks/useFont";

export default function App() {
  const { fontsLoaded } = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ContextLayout>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ContextLayout>
  );
}
