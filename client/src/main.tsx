import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register Service Worker for PWA with auto-update support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Check for updates every 60 seconds
        setInterval(() => {
          registration.update();
        }, 60 * 1000);
      })
      .catch((error) => {
        console.warn("SW registration failed:", error);
      });
  });

  // Listen for SW update messages and auto-reload
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "SW_UPDATED") {
      console.log("New version available, reloading...");
      window.location.reload();
    }
  });
}
