import { UseMutationOptions } from "@tanstack/react-query";
import { useGenericDelete, useGenericGet, useGenericPost } from "./useQuery";
import { FirebaseUserResponse } from "@/types/type";
// import { IFinalizadora } from "../types/IFinalizadora";

type UseGenericPostOptions<TData, TVariables> = UseMutationOptions<
  TData,
  unknown,
  TVariables
>;

type CreateVariables = Partial<FirebaseUserResponse[]>;
// type DeleteSettingDetail = { id: number };

// export const useDeleteSetting = (
//   options?: UseGenericPostOptions<DeleteSettingDetail, number>
// ) => {
//   return useGenericDelete("/finalizadora", "finalizadora", options);
// };

/**
 * Custom React hook to fetch user settings from the `/api/users` endpoint.
 *
 * Utilizes the `useGenericGet` hook with predefined options for retry and refetch behavior.
 *
 * @returns {QueryResult<FirebaseUserResponse[]>} An object containing the query state and an array of `FirebaseUserResponse` objects.
 */
export const useGetSettings = () => {
  return useGenericGet("/api/users", "users", {
    retry: 2,
    refetchOnWindowFocus: true,
  });
};

// export const usePostSettings = (
//   options?: UseGenericPostOptions<IFinalizadora[], CreateVariables>
// ) => {
//   return useGenericPost<IFinalizadora[], CreateVariables>("/finalizadora","finalizadora",options);
// };
