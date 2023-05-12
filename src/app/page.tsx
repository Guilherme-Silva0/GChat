import AuthForm from "@/components/AuthForm";
import ThemeButton from "@/components/ThemeButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="relative py-2 px-4 w-full bg-gray-100 flex justify-between shadow-lg items-center transition-all dark:bg-slate-800">
        <Image
          src="/images/logo.png"
          alt="Logo"
          height={300}
          width={300}
          className="w-14 -m-2"
        />
        <ThemeButton />
      </header>
      <main className="flex flex-col bg-gray-200 w-full min-h-full justify-center items-center transition-all dark:bg-slate-900">
        <AuthForm />
      </main>
    </>
  );
}
