import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success("An user is created successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { signUp, isLoading };
}

export default useSignUp;
