import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IRootState } from "../../store";
import { setPageTitle } from "../../store/themeConfigSlice";

const schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UnlockFormData = z.infer<typeof schema>;

const UnlockBox = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Unlock Box"));
  });
  const navigate = useNavigate();

  const Auth = useSelector((state: IRootState) => state.auth.userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UnlockFormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: UnlockFormData) => {
    const correctPassword = "123456";

    if (data.password === correctPassword) {
      navigate("/");
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/Lock-screen.jpg')] dark:bg-[url('/assets/images/Lock-screen.jpg')]">
      <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
        <div className="flex items-center mb-10">
          <div className="ltr:mr-4 rtl:ml-4">
            <img
              src="/assets/images/Lock-screen.jpg"
              className="w-16 h-16 object-cover rounded-full"
              alt="images"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-2xl">{Auth.name}</h4>
            <p>Enter your password to unlock your ID</p>
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            UNLOCK
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnlockBox;
