'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Load from '@/components/Load'
import Text from '@/components/Text'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { GithubIcon } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import ButtonAuthSocial from './ButtonAuthSocial'

type Variant = 'LOGIN' | 'REGISTER'

const schema = z.object({
  name: z.string().trim().nonempty('All inputs are required'),
  email: z
    .string()
    .trim()
    .email('Invalid email')
    .nonempty('All inputs are required'),
  password: z
    .string()
    .trim()
    .nonempty('All inputs are required')
    .min(8, 'Password must be at least 8 caracters long'),
})

export type FormProps = z.infer<typeof schema>

const AuthForm: FunctionComponent = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const navigation = useRouter()

  useEffect(() => {
    if (session?.status === 'authenticated') {
      navigation.push('/users')
    }
  }, [session?.status, navigation])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: variant === 'REGISTER' ? zodResolver(schema) : undefined,
    mode: 'onSubmit',
  })

  useEffect(() => {
    errors &&
      Object.keys(errors).map((fieldName) =>
        toast.error(errors[fieldName as keyof FormProps]?.message ?? null),
      )
  }, [errors])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    if (variant === 'REGISTER') setVariant('LOGIN')
  }, [variant])

  const onSubmit = (data: FormProps) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', { email: data.email, password: data.password }),
        )
        .catch((err: AxiosError) =>
          toast.error((err.response?.data as string) ?? null),
        )
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!')
          }

          if (callback?.ok && !callback?.error) {
            toast.success('Logged in!')
            navigation.push('/users')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!')
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="-mt-20 flex w-6/12 items-center justify-around rounded-2xl bg-gray-50 px-2 py-6 shadow-xl transition-all dark:bg-slate-800 max-lg:w-9/12 max-md:flex-col max-[600px]:block max-[600px]:w-11/12 max-[390px]:-mt-0 2xl:w-5/12">
      <Image
        src="/login-animate.svg"
        alt="login animate image"
        height={500}
        width={500}
        className="-m-10 mx-auto w-6/12 max-[600px]:w-9/12 max-[390px]:hidden"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex flex-col items-center gap-3 max-[600px]:w-10/12"
      >
        <Text
          paragraph
          className="text-center text-2xl font-bold tracking-tight max-md:mt-3"
        >
          {variant === 'REGISTER'
            ? 'Create an account!'
            : 'Log in your account!'}
        </Text>
        {variant === 'REGISTER' && (
          <Input
            id="name"
            type="text"
            label="name"
            disabled={isLoading}
            errors={errors}
            register={register}
          />
        )}

        <Input
          id="email"
          type="email"
          label="E-Mail"
          disabled={isLoading}
          errors={errors}
          register={register}
        />

        <Input
          id="password"
          type="password"
          label="password"
          disabled={isLoading}
          errors={errors}
          register={register}
        />

        <Button disable={isLoading} fullWidth type="submit">
          {isLoading ? <Load /> : variant === 'LOGIN' ? 'Login' : 'Sign in'}
        </Button>
        <fieldset className="w-full border-t border-gray-400 text-center">
          <legend className="mx-auto px-3">Or</legend>
          <div className="mt-3 flex gap-2">
            <ButtonAuthSocial
              onClick={() => socialAction('google')}
              media="google"
              icon={'google'}
            />
            <ButtonAuthSocial
              onClick={() => socialAction('github')}
              media="github"
              icon={GithubIcon}
            />
          </div>
        </fieldset>
        {variant === 'LOGIN' ? (
          <Text className="mt-3 text-center">
            Don&apos;t have an account?{' '}
            <span
              onClick={toggleVariant}
              className="cursor-pointer text-sky-500 hover:underline"
            >
              Register
            </span>
          </Text>
        ) : (
          <Text className="mt-3 text-center">
            Already have an account?{' '}
            <Link
              onClick={(e) => {
                e.preventDefault()
                toggleVariant()
              }}
              className="cursor-pointer py-2 text-sky-500 hover:underline"
              href=""
            >
              Login
            </Link>
          </Text>
        )}
      </form>
    </div>
  )
}

export default AuthForm
