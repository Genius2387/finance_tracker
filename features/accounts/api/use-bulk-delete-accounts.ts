import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; 
import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>;


export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (data) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({
                json: data,
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            toast.success("Account(s) deleted successfully!");
        },
        onError: () => {
            toast.error("Failed to delete account(s). Please try again.");
        },

    });

    return mutation;
}    
