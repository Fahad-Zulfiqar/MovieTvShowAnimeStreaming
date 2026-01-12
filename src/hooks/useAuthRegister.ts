import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_URL } from "../constants";
import axios from "axios";

interface Auth {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const useAuthRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<Auth, Error, Auth>({
    mutationFn: (data: Auth) =>
      axios.post<Auth>(`${USER_URL}/`, data).then((res) => res.data),
    onSuccess: (data) => {
      // Handle successful registration, e.g., store token, user info, etc.
      console.log("Registration successful:", data);

      // Optionally, you can invalidate queries related to users or perform other actions
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      // Handle error, e.g., show a notification
      console.error("Registration failed:", error);
    },
  });
};

export { useAuthRegister };
