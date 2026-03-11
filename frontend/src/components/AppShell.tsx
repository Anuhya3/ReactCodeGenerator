import { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffe9d5,_transparent_45%),radial-gradient(circle_at_20%_20%,_#e0f2fe,_transparent_45%)]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        {children}
      </div>
    </div>
  );
}
