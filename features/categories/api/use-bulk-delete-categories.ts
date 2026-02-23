 import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; 
import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>;


export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (data) => {
            const response = await client.api.categories["bulk-delete"]["$post"]({
                json: data,
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Categories deleted successfully!");
        },
        onError: () => {
            toast.error("Failed to delete categories. Please try again.");
        },

    });

    return mutation;
}    
