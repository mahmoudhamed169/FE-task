import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { apiClient, AUTHENTICATION_URLS } from "../../../Api/END-POINT";
import { AuthResponse, RegisterRequest } from "../../../Interfaces/Interfaces";
import { AxiosError } from "axios";

export default function Register() {
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
  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post<AuthResponse>(
        AUTHENTICATION_URLS.regitser,
        data
      );
      console.log(response.data);

      const { Success, Message } = response.data;

      if (Success) {
        toast.success(Message, {
          id: toastId,
        });
        navigate("/login");
      } else {
        toast.error(Message || "An error occurred", {
          id: toastId,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<AuthResponse>;
      toast.error(axiosError.response?.data.Message || "An error occurred", {
        id: toastId,
      });
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center flex-column text-center mt-5 gap-2">
        <h4>Register</h4>
        <p>Enter your credentials to access your account</p>
      </div>
      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-muted">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Name"
            {...register("Name", {
              required: "Name is required",
            })}
          />
          {errors.username && (
            <p className="text-danger p-1">{errors.Name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-muted">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            {...register("UserName", {
              required: "UserName is required",
            })}
          />
          {errors.username && (
            <p className="text-danger p-1">{errors.UserName.message}</p>
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
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-warning text-white w-25"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Sign Up"
            )}
          </button>
          <Link to={"/login"}>login</Link>
        </div>
      </form>
    </div>
  );
}
