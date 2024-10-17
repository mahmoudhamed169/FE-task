import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { LoginRequest, LoginResponse } from "../../../Interfaces/Interfaces";
import toast from "react-hot-toast";
import { apiClient, AUTHENTICATION_URLS } from "../../../Api/END-POINT";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post<LoginResponse>(
        AUTHENTICATION_URLS.login,
        data
      );

      const { Data, Message, Success } = response.data;

      if (Success) {
        localStorage.setItem("token", Data);
        toast.success("Login Successfully", {
          id: toastId,
        });
        navigate("/dashboard");
      } else {
        toast.error(Message || "An error occurred", {
          id: toastId,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<LoginResponse>;
      toast.error(axiosError.response?.data.Message || "An error occurred", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center flex-column text-center mt-5 gap-2">
        <h4>Login In</h4>
        <p>Enter your credentials to access your account</p>
      </div>

      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-muted">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="text-danger p-1">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label text-muted">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <span
              className="input-group-text"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-danger p-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-warning text-white w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? <ClipLoader size={20} color="#ffffff" /> : "Sign In"}
        </button>
      </form>
    </div>
  );
}
