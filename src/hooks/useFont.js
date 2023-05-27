import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const useFont = () => {
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../../assets/fonts/BebasNeue.ttf"),
    FiraT: require("../../assets/fonts/FiraThin.ttf"),
    FiraL: require("../../assets/fonts/FiraLight.ttf"),
    FiraR: require("../../assets/fonts/FiraRegular.ttf"),
    FiraM: require("../../assets/fonts/FiraMedium.ttf"),
    FiraB: require("../../assets/fonts/FiraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { fontsLoaded, onLayoutRootView };
};

export default useFont;
