"use client";
import axios from "axios";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "./Button";
import ButtonAuthSocial from "./ButtonAuthSocial";
import Input from "./Input";
import Text from "./Text";

type Variant = "LOGIN" | "REGISTER";

const AuthForm: FunctionComponent = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    if (variant === "REGISTER") setVariant("LOGIN");
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .catch(() => toast.error("Somenthing  went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="-mt-6 w-6/12 flex justify-around items-center bg-gray-50 px-2 py-6 rounded-2xl shadow-xl transition-all dark:bg-slate-800 2xl:w-5/12 max-md:flex-col max-lg:w-9/12 max-[600px]:w-11/12 max-[600px]:block">
      <Image
        src="/login-animate.svg"
        alt="login animate image"
        height={500}
        width={500}
        className="-m-10 w-6/12 mx-auto max-[600px]:w-9/12 max-[390px]:hidden"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex m-auto flex-col gap-3 items-center max-[600px]:w-10/12"
      >
        <Text
          paragraph
          className="text-center text-2xl font-bold tracking-tight max-md:mt-3"
        >
          {variant === "REGISTER"
            ? "Create an account!"
            : "Log in your account!"}
        </Text>
        {variant === "REGISTER" && (
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
          {variant === "LOGIN" ? "Login" : "Sign in"}
        </Button>
        <fieldset className="w-full border-t text-center border-gray-400">
          <legend className="mx-auto px-3">Or</legend>
          <div className="flex gap-2 mt-3">
            <ButtonAuthSocial
              onClick={() => socialAction("google")}
              media="google"
              icon={"google"}
            />
            <ButtonAuthSocial
              onClick={() => socialAction("github")}
              media="github"
              icon={GithubIcon}
            />
          </div>
        </fieldset>
        {variant === "LOGIN" ? (
          <Text className="text-center mt-3">
            Don&apos;t have an account?{" "}
            <span
              onClick={toggleVariant}
              className="text-sky-500 cursor-pointer hover:underline"
            >
              Log in
            </span>
          </Text>
        ) : (
          <Text className="text-center mt-3">
            Already have an account?{" "}
            <Link
              onClick={(e) => {
                e.preventDefault();
                toggleVariant();
              }}
              className="text-sky-500 py-2 cursor-pointer hover:underline"
              href=""
            >
              sign in
            </Link>
          </Text>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
