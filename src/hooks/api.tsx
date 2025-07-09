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

type SetRolesRequest = {
  uid: string;
  roles: string[];
};

type SetRolesResponse = {
  success: boolean;
  message: string;
};

export const useSetRoles = (
  options?: UseGenericPostOptions<SetRolesResponse, SetRolesRequest>
) => {
  return useGenericPost<SetRolesResponse, SetRolesRequest>(
    "/api/set-roles",
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

type UpdatePhotoRequest = {
  uid: string;
  photoURL: string;
};

type UpdatePhotoResponse = {
  success: boolean;
  message: string;
  photoURL?: string;
};

export const useUpdatePhoto = (
  options?: UseGenericPostOptions<UpdatePhotoResponse, UpdatePhotoRequest>
) => {
  return useGenericPost<UpdatePhotoResponse, UpdatePhotoRequest>(
    "/api/update-photo",
    "users",
    options
  );
};


type ValidateEmailRequest = {
  email: string;
};

type ValidateEmailResponse = {
  valid: boolean;
  message?: string;
};

export const useValidateEmail = (
  options?: UseGenericPostOptions<ValidateEmailResponse, ValidateEmailRequest>
) => {
  return useGenericPost<ValidateEmailResponse, ValidateEmailRequest>(
    "/api/validate-email",
    "users",
    options
  );
};


type SendResetLinkRequest = {
  email: string;
};

type SendResetLinkResponse = {
  success: boolean;
  message: string;
};

export const useSendResetLink = (
  options?: UseGenericPostOptions<SendResetLinkResponse, SendResetLinkRequest>
) => {
  return useGenericPost<SendResetLinkResponse, SendResetLinkRequest>(
    "/api/send-reset-link",
    "users",
    options
  );
};
// export const usePostSettings = (
//   options?: UseGenericPostOptions<{}, CreateVariables>
// ) => {
//   return useGenericPost<IFinalizadora[], CreateVariables>("/api/disable-user","users",options);
// };
