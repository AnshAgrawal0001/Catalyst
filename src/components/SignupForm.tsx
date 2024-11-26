"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface FormValues {
  fullName: string;
  mobileNumber: string;
  email: string;
  gender: "male" | "female" | "other";
  password: string;
}

const SignUpForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"])
      .required("Gender is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Add your logic to handle form submission here
    console.log(data);
    setIsSubmitting(false);
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-full p-0 bg-cover bg-center bg-no-repeat"
        
      
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black bg-opacity-0 shadow-md rounded px-8 pt-6 pb-8 h-full w-full"
      >
        <h2 className="text-2xl text-gray-100 font-bold mb-6 text-center">
          Sign Up
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-100 font-bold mb-2"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline ${
              errors.fullName ? "border-red-500" : ""
            }`}
            id="fullName"
            type="text"
            placeholder="E.g. Arya Stark"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs italic">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-100 font-bold mb-2"
            htmlFor="mobileNumber"
          >
            Mobile Number
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline ${
              errors.mobileNumber ? "border-red-500" : ""
            }`}
            id="mobileNumber"
            type="tel"
            placeholder="Eg. 9876543210"
            {...register("mobileNumber")}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs italic">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-100 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            id="email"
            type="email"
            placeholder="E.g. winter@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-100 font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline ${
              errors.gender ? "border-red-500" : ""
            }`}
            id="gender"
            {...register("gender")}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs italic">
              {errors.gender.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-100 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : ""
            }`}
            id="password"
            type="password"
            placeholder="E.g. Winter@123"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="relative m-auto mt-8 group px-8 py-4 font-bold text-lg text-gray-100 bg-gradient-to-r from-gray-800 to-gray-600 rounded-[12px] shadow-[0_4px_8px_rgba(0,0,0,0.6)] border-[3px] border-gray-500 hover:border-yellow-500 transition-all duration-300 hover:scale-110"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
