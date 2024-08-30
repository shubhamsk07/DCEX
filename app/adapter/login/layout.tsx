// app/redirect/layout.tsx
import { ReactNode } from 'react';

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;  // Render only the page content for /redirect routes
}
