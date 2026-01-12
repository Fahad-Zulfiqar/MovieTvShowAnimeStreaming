import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { USER_URL } from "../constants";

const useAuthLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => axios.post(`${USER_URL}/logout`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};

export default useAuthLogout;
