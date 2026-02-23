import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; 
import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>;


export const useCreateCategory = () => {
  const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (data) => {
            const response = await client.api.categories.$post({
                json: data,
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category created successfully!");
        },
        onError: () => {
            toast.error("Failed to create category. Please try again.");
        },
    });

    return mutation;
}    
