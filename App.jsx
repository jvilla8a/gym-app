import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./src/navigation/Navigation";
import ContextLayout from "./src/components/ContextLayout";

export default function App() {
  return (
    <ContextLayout>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ContextLayout>
  );
}
