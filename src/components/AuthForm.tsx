"use client";
import { FacebookIcon } from "lucide-react";
import { FunctionComponent, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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

    if (variant === "REGISTER") {
      //AXIOS REGISTER
    }

    if (variant === "LOGIN") {
      //NEXTAUTH LOGIN
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className="mt-4 mx-5 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-gray-100 px-6 py-8 shadow-md rounded-xl transition-all dark:bg-slate-800 sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        </form>

        <fieldset className="mt-3 border-t text-center border-gray-400">
          <legend className="mx-auto px-3">Or</legend>
          <div className="flex gap-2 mt-3">
            <ButtonAuthSocial
              onClick={() => socialAction("google")}
              media="google"
              icon={"google"}
            />
            <ButtonAuthSocial
              onClick={() => socialAction("facebook")}
              media="facebook"
              icon={FacebookIcon}
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
            <span
              onClick={toggleVariant}
              className="text-sky-500 cursor-pointer hover:underline"
            >
              sign in
            </span>
          </Text>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
