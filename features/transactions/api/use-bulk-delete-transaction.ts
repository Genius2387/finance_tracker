import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; 
import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.transaction["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transaction["bulk-delete"]["$post"]>;


export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (data) => {
            const response = await client.api.transaction["bulk-delete"]["$post"]({
                json: data,
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            toast.success("Transaction deleted successfully!");
        },
        onError: () => {
            toast.error("Failed to delete transaction. Please try again.");
        },

    });

    return mutation;
}    
