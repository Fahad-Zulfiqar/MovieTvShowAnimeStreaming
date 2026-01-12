import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_URL } from "../constants";
import axios from "axios";

const useAuthDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (userId: string) =>
      axios.delete(`${USER_URL}/${userId}`).then((res) => res.data),
    onSuccess: () => {
      // Handle successful deletion
      console.log("User deleted successfully");

      // Invalidate queries related to users to refresh the data
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      // Handle error, e.g., show a notification
      console.error("User deletion failed:", error);
    },
  });
};

export { useAuthDeleteUser };
