"use client";
import ToasterContext from "@/context/ToasterContext";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class">
      <ToasterContext />
      {children}
    </ThemeProvider>
  );
}
