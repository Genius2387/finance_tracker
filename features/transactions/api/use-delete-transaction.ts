import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType =
  InferResponseType<typeof client.api.transaction[":id"]["$delete"]>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    string // 👈 mutation variable type (id)
  >({
    mutationFn: async () => {
      const response = await client.api.transaction[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },

    onSuccess: (_, id) => {

      queryClient.invalidateQueries({
        queryKey: ["transaction", { id }],
      });


      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Transaction deleted!");
    },

    onError: () => {
      toast.error("Failed to delete transaction.");
    },
  });

  return mutation;
};