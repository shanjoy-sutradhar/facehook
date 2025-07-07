import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../common/Field";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const submitForm = async (formData) => {
    try {
      //Make an api call
      //Will return tokens and logged in user information
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      //   console.log(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong ${error?.message}`,
      });
    }
  };
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "Fisrt Name is Required" })}
          className={`auth-input ${
            errors.firstName ? "border-red-500" : " border-gray-200"
          }`}
          type="text"
          name="firstName"
          id="firstName"
        />
      </Field>

      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName", { required: "Last Name is Required" })}
          className={`auth-input ${
            errors.lastName ? "border-red-500" : " border-gray-200"
          }`}
          type="text"
          name="lastName"
          id="lastName"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID is Required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : " border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
          autoComplete="username"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : " border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
        />
      </Field>

      {/* <div className="form-control">
        <label className="auth-label" for="confirmPassword">
          Retype Password
        </label>
        <input
          className="auth-input"
          name="confirmPassword"
          type="password"
          id="confirmPassword"
        />
      </div> */}

      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
