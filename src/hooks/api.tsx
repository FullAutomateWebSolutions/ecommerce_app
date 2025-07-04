import { UseMutationOptions } from "@tanstack/react-query";
import {   useGenericGet, useGenericPost } from "./useQuery";
import { FirebaseUserResponse } from "@/types/type";
// import { IFinalizadora } from "../types/IFinalizadora";

type UseGenericPostOptions<TData, TVariables> = UseMutationOptions<
  TData,
  unknown,
  TVariables
>;

type CreateVariables = Partial<FirebaseUserResponse[]>;

type IdisableUser = { uid: string, disabled: boolean };

interface DeleteUserRequest {
  uid: string;
}

interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export const useDisableUsers = (  options?: UseGenericPostOptions< CreateVariables,IdisableUser>) => {
  return useGenericPost<CreateVariables,IdisableUser>(
    "/api/disable-user",
    "users",
    options
  );
};
export const useDeleteUser = (
  options?: UseGenericPostOptions<DeleteUserResponse, DeleteUserRequest>
) => {
  return useGenericPost<DeleteUserResponse, DeleteUserRequest>(
    "/api/delete-user",
    "users",
    options
  );
};



export const useGetUsers = () => {
  return useGenericGet("/api/users", "users", {
    retry: 2,
    refetchOnWindowFocus: true,
  });
};

// export const usePostSettings = (
//   options?: UseGenericPostOptions<{}, CreateVariables>
// ) => {
//   return useGenericPost<IFinalizadora[], CreateVariables>("/api/disable-user","users",options);
// };
