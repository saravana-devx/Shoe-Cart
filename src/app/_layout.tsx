import { store } from "@/redux/store";
import { initTelemetry, setCurrentScreen } from "@/telemetry";
import { TelemetryScreenTracker } from "@saravana.devx/telemetry/expo-router";
import { Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { Provider } from "react-redux";

initTelemetry();

export default function RootLayout() {
  const pathname = usePathname();
  useEffect(() => setCurrentScreen(pathname), [pathname]);

  return (
    <Provider store={store}>
      {Platform.OS !== "web" && <TelemetryScreenTracker />}
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
