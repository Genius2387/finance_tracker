import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const result = await response.json();

      console.log("Accounts API Result:", result);

      return result.data ?? result;
    },
  });
};