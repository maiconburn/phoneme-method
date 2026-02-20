import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from '@/pages/Home';
import LetterSounds from '@/pages/LetterSounds';
import BuildAWord from '@/pages/BuildAWord';
import VoiceTester from '@/pages/VoiceTester';
import NotFound from '@/pages/NotFound';
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import InstallPrompt from "./components/InstallPrompt";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAudioInit } from "./hooks/useAudioInit";


function Router() {
  // Initialize audio context on app load
  useAudioInit();

  return (
    <Switch>
      <Route path={"\\"} component={Home} />
      <Route path="/letter-sounds" component={LetterSounds} />
      <Route path="/build-a-word" component={BuildAWord} />
      <Route path="/voice-tester" component={VoiceTester} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <InstallPrompt />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
