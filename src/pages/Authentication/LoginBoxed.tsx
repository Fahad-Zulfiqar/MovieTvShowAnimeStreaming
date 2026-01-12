import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { setCredentials } from "../../store/authSlice";
import { useAuthLogin } from "../../hooks/useAuthLogin";
// import { toast } from "react-toastify";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof schema>;

const LoginBoxed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Login Boxed"));
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useAuthLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: AuthFormData) => {
    // console.log("Form Data:", data);
    mutate(data, {
      onSuccess: (response) => {
        console.log("API Response:", response); // Log the entire response
        if (response) {
          const userInfo = {
            id: response._id,
            name: response.name,
            email: response.email,
          };
          console.log("hello");
          dispatch(setCredentials(userInfo)); // Store user info in Zustand without password
        } else {
          console.error("User info is undefined in the response");
        }
        navigate("/"); // Redirect to a different page after successful login
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });
  };

  // const submitForm = () => {
  //   navigate("/");
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center  bg-[url('/assets/images/Lock-screen.jpg')] dark:bg-[url('/assets/images/Lock-screen.jpg')]">
      <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
        <h2 className="font-bold text-2xl mb-3">Sign In</h2>
        <p className="mb-7">Enter your email and password to login</p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              // id="email"
              type="email"
              className="form-input"
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              // id="password"
              type="password"
              className="form-input"
              placeholder="Enter Password"
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
          <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block">
            <span>OR</span>
          </div>
        </div>
        <ul className="flex justify-center gap-2 sm:gap-5 mb-5">
          <li>
            <button
              type="button"
              className="btn flex gap-1 sm:gap-2 text-black shadow-none bg-white-dark/30 dark:border-[#253b5c] dark:hover:bg-[#1b2e4b] dark:bg-transparent dark:text-white hover:bg-white "
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 256 193"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <g>
                  <path
                    d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z"
                    fill="#34A853"
                  ></path>
                  <polygon
                    fill="#EA4335"
                    points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061"
                  ></polygon>
                  <path
                    d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z"
                    fill="#FBBC04"
                  ></path>
                  <path
                    d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z"
                    fill="#C5221F"
                  ></path>
                </g>
              </svg>
              Google
            </button>
          </li>
        </ul>
        <p className="text-center">
          Dont&apos;t have an account ?
          <Link
            to="/auth/boxed-signup"
            className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginBoxed;
