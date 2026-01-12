import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_URL } from "../constants";
import axios from "axios";

interface Auth {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const useAuthProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Auth, Error, Auth>({
    mutationFn: (data: Auth) =>
      axios.put<Auth>(`${USER_URL}/profile`, data).then((res) => res.data),
    onSuccess: (data) => {
      // Handle successful login, e.g., store token, user info, etc.
      console.log("update successfully:", data);

      queryClient.invalidateQueries({ queryKey: ["users", data] });
    },
    onError: (error) => {
      // Handle error, e.g., show a notification
      console.error("updation failed:", error);
    },
  });
};

export { useAuthProfile };
