"use client";
import AuthContext from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthContext>
      <ThemeProvider attribute="class">
        <ToasterContext />
        {children}
      </ThemeProvider>
    </AuthContext>
  );
}
