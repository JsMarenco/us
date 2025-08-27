// Third-party dependencies
import type { ReactNode } from "react";

// Current project dependencies
import { ToastProvider } from "../../hooks/useToast";

export default function Providers({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
