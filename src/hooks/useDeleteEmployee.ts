import { deleteEmployee } from "@/api/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess: () => {
      toast.success("Employee deleted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: () => {
      toast.error("Failed to delete employee!");
    },
  });
};
