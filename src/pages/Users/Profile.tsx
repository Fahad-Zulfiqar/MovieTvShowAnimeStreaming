// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuthDeleteUser } from "../../hooks/useAuthDeleteUser";
import type { IRootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuthProfile } from "../../hooks/useAuthProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCredentials } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { useUserSeasonEpisodes } from "../../hooks/useUserSeasonEpisodes";
import Dropdown from "../../components/Dropdown";
import { baseImage } from "../../constants";

const schema = z.object({
  name: z.string({ message: "name is required" }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof schema>;

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Account Setting"));
  });
  const [tabs, setTabs] = useState<string>("home");
  const toggleTabs = (name: string) => {
    setTabs(name);
  };

  const Auth = useSelector((state: IRootState) => state.auth.userInfo);
  const { data: episodes } = useUserSeasonEpisodes(Auth.id);

  const { mutate: deleteUser } = useAuthDeleteUser();
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    if (Auth && Auth.id) {
      if (
        window.confirm(
          "Are you sure you want to delete your account? This action cannot be undone."
        )
      ) {
        deleteUser(Auth.id);
        navigate("/auth/boxed-signin");
      }
    } else {
      console.error("User ID is not available.");
    }
  };

  const { mutate, isPending: pending } = useAuthProfile();

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
            password: response.password,
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

  return (
    <div>
      <div className="pt-5">
        {/* <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">
            Settings
          </h5>
        </div> */}
        <div>
          <ul className="sm:flex flex justify-center  font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
            <li className="inline-block">
              <button
                onClick={() => toggleTabs("home")}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${
                  tabs === "home" ? "!border-primary text-primary" : ""
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="6"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <ellipse
                    opacity="0.5"
                    cx="12"
                    cy="17"
                    rx="7"
                    ry="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Profile
              </button>
            </li>
            <li className="inline-block">
              <button
                onClick={() => toggleTabs("payment-details")}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${
                  tabs === "payment-details"
                    ? "!border-primary text-primary"
                    : ""
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <polygon points="10,8 10,16 16,12" fill="currentColor" />
                  <path
                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Watching History
              </button>
            </li>

            <li className="inline-block">
              <button
                onClick={() => toggleTabs("danger-zone")}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${
                  tabs === "danger-zone" ? "!border-primary text-primary" : ""
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="red" />
                  <path
                    d="M12 8V12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 16H12.01"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Danger Zone
              </button>
            </li>
          </ul>
        </div>
        {tabs === "home" ? (
          <div>
            <form
              className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h6 className="text-lg font-bold mb-5">General Information</h6>
              <div className="flex flex-col sm:flex-row">
                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                  <img
                    src="/assets//images/Lock-screen.jpg"
                    alt="img"
                    className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                  />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                      {...register("name")}
                      id="name"
                      type="text"
                      placeholder="Enter user name"
                      className="form-input"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="Enter user email"
                      className="form-input"
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      {...register("password")}
                      id="password"
                      type="password"
                      className="form-input"
                      placeholder="Enter Password"
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password.message}</p>
                    )}
                  </div>

                  {/* <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      id="confirm-password"
                      type="password"
                      className="form-input"
                      placeholder="Enter Confirm Password"
                    />
                  </div> */}

                  <div className="sm:col-span-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={pending}
                    >
                      {pending ? "Save In..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
        {/* grid  grid-cols-1 lg:grid-cols-2 gap-5 */}
        {tabs === "payment-details" ? (
          <div className="mb-5">
            <div className="flex justify-center mx-auto">
              {/* <h1 className="flex text-2xl"> */}
              {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 mr-5"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <polygon points="10,8 10,16 16,12" fill="currentColor" />
                  <path
                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg> */}
              {/* <h1>Watching History</h1> */}
              {/* </h1> */}
            </div>
            <ul className="flex flex-wrap gap-2">
              {episodes?.map((episode) => (
                <div
                  key={`${episode.show_id}-${episode.episode_number}`} // Use a combination of show_id and episode_number for uniqueness
                  className="relative border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)] min-w-[150px] max-w-[200px]"
                >
                  <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                    <Link
                      to={
                        episode.season_number
                          ? `/watch/tv/${episode.show_id}/${episode.season_number}/${episode.episode_number}`
                          : `/watch/movie/${episode.movie_id}`
                      }
                    >
                      <img
                        src={
                          episode.still_path
                            ? `${baseImage}${episode.still_path}`
                            : episode.media_type !== "tv"
                            ? `${baseImage}${episode.poster_path}` // Assuming episodes have an image property
                            : "/assets/placeholder.png"
                        }
                        alt={episode.name}
                        className="object-cover h-40 w-full"
                      />
                      <div className="flex space-x-16 absolute bottom-1 ">
                        <p className="text-xs bg-dark rounded text-white px-1 ltr:ml-2 rtl:ml-2">
                          {episode.name && episode.name.length > 0
                            ? episode.name.length > 6
                              ? `${episode.name.slice(0, 10)}...`
                              : episode.name
                            : episode.media_type !== "tv"
                            ? episode.original_title &&
                              episode.original_title.length > 0
                              ? episode.original_title.length > 6
                                ? `${episode.original_title.slice(0, 10)}...`
                                : episode.original_title
                              : "Unknown Title"
                            : "Unknown Title"}
                        </p>
                        {episode.season_number && (
                          <p className=" text-xs bg-dark rounded text-success px-1  ltr:ml-2 rtl:ml-2">
                            {`S${episode.season_number}E${episode.episode_number}`}
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                  <div className="dropdown absolute top-4 right-0">
                    <Dropdown
                      placement="bottom-start"
                      btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
                      button={
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="rotate-90 opacity-70 cursor-pointer"
                        >
                          <circle
                            cx="5"
                            cy="12"
                            r="2"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                          />
                          <circle
                            opacity="0.5"
                            cx="12"
                            cy="12"
                            r="2"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="19"
                            cy="12"
                            r="2"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                          />
                        </svg>
                      }
                    >
                      <ul className="!min-w-[170px]">
                        <li>
                          <button
                            type="button"
                            // onClick={() => handleDeleteItem(episode.id)}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {tabs === "danger-zone" ? (
          <div className="switch">
            {Auth ? (
              <div className="flex justify-center">
                <div className="panel space-y-5">
                  <h5 className="font-semibold text-lg mb-4">Delete Account</h5>
                  <p>
                    Once you delete the account, there is no going back. Please
                    be certain.
                  </p>
                  <button
                    className="btn btn-danger btn-delete-account"
                    onClick={handleDeleteAccount}
                  >
                    Delete my account
                  </button>
                </div>
              </div>
            ) : (
              <p>Please log in to see your profile.</p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
