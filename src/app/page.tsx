import ThemeButton from '@/components/ThemeButton'
import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
    <>
      <header className="relative flex w-full items-center justify-between bg-gray-100 px-4 py-2 shadow-lg transition-all dark:bg-slate-800">
        <Image
          src="/images/logo.png"
          alt="Logo"
          height={56}
          width={56}
          className="-m-2 drop-shadow-lg"
        />
        <ThemeButton />
      </header>
      <main className="flex min-h-full w-full flex-col items-center justify-center bg-gray-200 transition-all dark:bg-slate-900">
        <AuthForm />
      </main>
    </>
  )
}
