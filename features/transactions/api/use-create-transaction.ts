import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; 
import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.transaction.$post>;
type RequestType = InferRequestType<typeof client.api.transaction.$post>;


export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (data) => {
            const response = await client.api.transaction.$post({
                json: data,
            });
            return response;
        },
        onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["transactions"],
    exact: false,
  });

  queryClient.invalidateQueries({
    queryKey: ["summary"],
  });

  toast.success("Transaction created successfully!");
},
        onError: () => {
            toast.error("Failed to create transaction. Please try again.");
        },
    });

    return mutation;
}    
