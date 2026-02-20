import { Download, Share, X, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Detects the user's platform for install instructions.
 */
function getPlatform(): 'ios' | 'android' | 'desktop' {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

/**
 * Check if app is already installed (standalone mode).
 */
function isAppInstalled(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true
  );
}

/**
 * PWA Install Banner
 *
 * Smart install prompt that:
 * - On Android/Chrome: Uses native beforeinstallprompt
 * - On iOS Safari: Shows manual instructions with visual guide
 * - On Desktop: Shows native prompt or manual instructions
 * - Dismisses and remembers user choice for 7 days
 * - Only shows if not already installed
 */
export default function InstallPrompt() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>(
    'desktop'
  );

  useEffect(() => {
    // Don't show if already installed
    if (isAppInstalled()) return;

    // Don't show if dismissed recently
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedAt < sevenDays) return;
    }

    setPlatform(getPlatform());

    // Listen for the native install prompt (Chrome/Android/Edge)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // On iOS, show banner after a short delay (no native prompt available)
    const plat = getPlatform();
    if (plat === 'ios') {
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handler);
      };
    }

    // On desktop without native prompt, show after delay
    const timer = setTimeout(() => {
      if (!deferredPrompt) setShowBanner(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Native install prompt (Chrome/Android/Edge)
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
        setShowModal(false);
      }
      setDeferredPrompt(null);
    } else {
      // Show step-by-step instructions modal
      setShowModal(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowModal(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Bottom Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
        <div className="mx-4 mb-4 rounded-2xl bg-white shadow-2xl border border-blue-100 p-4 flex items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">ABC</span>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm">
              Install ABC
            </p>
            <p className="text-xs text-gray-500 truncate">
              Add to home screen for quick access
            </p>
          </div>

          {/* Buttons */}
          <button
            onClick={handleInstallClick}
            className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity active:scale-95"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 animate-in fade-in duration-300"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-400 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                <Download size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Install ABC
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Use it like a real app on your device!
              </p>
            </div>

            {/* Instructions */}
            <div className="p-6">
              {platform === 'ios' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-center mb-4">
                    How to install on iPhone/iPad
                  </h3>
                  <Step
                    number={1}
                    icon={<Share size={20} className="text-blue-500" />}
                    text={
                      <>
                        Tap the{' '}
                        <strong className="text-blue-600">Share</strong> button
                        at the bottom of Safari
                      </>
                    }
                  />
                  <Step
                    number={2}
                    icon={<span className="text-2xl">➕</span>}
                    text={
                      <>
                        Scroll down and tap{' '}
                        <strong className="text-blue-600">
                          Add to Home Screen
                        </strong>
                      </>
                    }
                  />
                  <Step
                    number={3}
                    icon={<span className="text-2xl">✅</span>}
                    text={
                      <>
                        Tap <strong className="text-blue-600">Add</strong> to
                        confirm
                      </>
                    }
                  />
                </div>
              )}

              {platform === 'android' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-center mb-4">
                    How to install on Android
                  </h3>
                  <Step
                    number={1}
                    icon={
                      <MoreVertical size={20} className="text-blue-500" />
                    }
                    text={
                      <>
                        Tap the{' '}
                        <strong className="text-blue-600">menu (⋮)</strong>{' '}
                        button in Chrome
                      </>
                    }
                  />
                  <Step
                    number={2}
                    icon={<Download size={20} className="text-blue-500" />}
                    text={
                      <>
                        Tap{' '}
                        <strong className="text-blue-600">
                          Install app
                        </strong>{' '}
                        or{' '}
                        <strong className="text-blue-600">
                          Add to Home screen
                        </strong>
                      </>
                    }
                  />
                  <Step
                    number={3}
                    icon={<span className="text-2xl">✅</span>}
                    text={
                      <>
                        Tap <strong className="text-blue-600">Install</strong>{' '}
                        to confirm
                      </>
                    }
                  />
                </div>
              )}

              {platform === 'desktop' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-center mb-4">
                    How to install on your computer
                  </h3>
                  <Step
                    number={1}
                    icon={<Download size={20} className="text-blue-500" />}
                    text={
                      <>
                        Look for the{' '}
                        <strong className="text-blue-600">Install</strong> icon
                        in the address bar (Chrome/Edge)
                      </>
                    }
                  />
                  <Step
                    number={2}
                    icon={<span className="text-2xl">✅</span>}
                    text={
                      <>
                        Click{' '}
                        <strong className="text-blue-600">Install</strong> when
                        prompted
                      </>
                    }
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={handleDismiss}
                className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors active:scale-[0.98]"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Step component for the install instructions.
 */
function Step({
  number,
  icon,
  text,
}: {
  number: number;
  icon: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-400 mr-1">{number}.</span>{' '}
          {text}
        </p>
      </div>
    </div>
  );
}
