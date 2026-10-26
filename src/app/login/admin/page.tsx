"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoginCover from "@/app/components/LoginCover";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signin } from "@/lib/api/authAPI";

const AdminPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISigninData>();

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: signin,
    mutationKey: ["signin"],
    onSuccess: (dataLogin) => {
   
      localStorage.setItem("token", dataLogin.token)
    },
  });

  console.log(error, "react query error")
  console.log(errors,"react hook form error")

  const onSubmit = async (data: ISigninData) => {
    login({
      ...data,
      role_type: "admin",
    });

  };

  return (
    <div className="flex">
      <LoginCover />
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
        <div className="w-full max-w-md animate-fade-in">
          <Link
            href={"/login"}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            Back to portal
          </Link>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-zinc-800">
              Admin Portal
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Sign in to manage the organization
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700 mb-2"
              >
                Email address
              </label>
              <input
                className="border border-gray-400  outline-indigo-600 rounded-sm w-full p-2 "
                id="email"
                type="email"
                placeholder="john@example.com"
                autoComplete="username"
                // value="admin@example.com"
                {...register("email", {
                  required: "Entering an email address is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "The email is not valid.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="border border-gray-400  outline-indigo-600 rounded-sm w-full p-2"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  type={isShowPassword ? "text" : "password"}
                  //   value="admin123"
                  {...register("password", {
                    required: "Entering password is required.",
                    minLength: {
                      value: 6,
                      message:
                        "The password must be at least 6 characters long.",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setIsShowPassword((prev) => !prev)}
                >
                  {isShowPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center"
            >
              {isSubmitting ? "Signing in ..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
