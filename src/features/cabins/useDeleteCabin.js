import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (cabinId) => deleteCabinApi(cabinId),
    onSuccess: () => {
      toast.success("Cabin Deleted");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.success(err.message),
  });

  return { isDeleting, deleteCabin };
}
