import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      toast.success("Successfully updated user info");
      queryClient.setQueryData(["user"], user);
    },
    onError: () => {
      toast.error("There was an error updating user info");
    },
  });

  return {
    updateUser,
    isUpdating,
  };
}
