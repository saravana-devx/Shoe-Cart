import telemetry from "@saravana.devx/telemetry";
import Constants from "expo-constants";
import { Platform } from "react-native";

let currentScreen = "/";

export function setCurrentScreen(screen: string) {
  currentScreen = screen;
}

export function initTelemetry() {
  // Native only: the web build is pre-rendered in Node, where the SDK's browser storage doesn't exist.
  if (Platform.OS === "web") return Promise.resolve();
  const version = Constants.expoConfig?.version ?? "1.0.0";
  return telemetry.init({
    apiBase: process.env.EXPO_PUBLIC_TELEMETRY_URL ?? "",
    platform: Platform.OS === "ios" ? "ios" : "android",
    appVersion: version,
    projectName: "shoecart",
    // Must match the release mapup uploads with: <project>-<version>+<build>
    release: `shoecart-${version}+${Constants.nativeBuildVersion ?? "1"}`,
    environment: __DEV__ ? "development" : "production",
    // On in release builds only. In dev it stays off unless EXPO_PUBLIC_TELEMETRY_FORCE=true,
    // which is for testing the telemetry wiring itself.
    enabled:
      !!process.env.EXPO_PUBLIC_TELEMETRY_URL &&
      (!__DEV__ || process.env.EXPO_PUBLIC_TELEMETRY_FORCE === "true"),
    getCurrentScreen: () => currentScreen,
  });
}

export default telemetry;
