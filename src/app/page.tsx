import AuthForm from "@/components/AuthForm";
import Text from "@/components/Text";
import ThemeButton from "@/components/ThemeButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="py-2 px-4 w-full bg-gray-100 flex justify-between shadow-xl items-center transition-all dark:bg-slate-800">
        <Image
          src="/images/logo.png"
          alt="Logo"
          height={300}
          width={300}
          className="w-14 -m-2"
        />
        <ThemeButton />
      </header>
      <main className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-200 transition-all dark:bg-slate-900">
        <div className="-mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <Text
            paragraph
            className=" text-center text-2xl font-bold tracking-tight"
          >
            Sign in to your account!
          </Text>
          <AuthForm />
        </div>
      </main>
    </>
  );
}
