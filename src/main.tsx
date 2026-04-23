import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Capacitor } from "@capacitor/core";
import { App as CapApp } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";

// --- Native (Android/iOS) integration ----------------------------------
// All Capacitor calls are no-ops in the browser, so this is safe everywhere.
if (Capacitor.isNativePlatform()) {
  // 1. Brand-matched dark status bar
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  StatusBar.setBackgroundColor({ color: "#0d0d0d" }).catch(() => {});

  // 2. Hardware back button: navigate history back, exit app at root
  CapApp.addListener("backButton", ({ canGoBack }) => {
    if (canGoBack) {
      window.history.back();
    } else {
      CapApp.exitApp();
    }
  });

  // 3. Hide splash screen once React mounts
  setTimeout(() => SplashScreen.hide().catch(() => {}), 300);
}

createRoot(document.getElementById("root")!).render(<App />);
