import api from '@/axios/axios';
import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';

interface IPropUseGenericGet {
  endpoint: string;
  queryKey: string;
  options?: UseMutationOptions;
}

interface IPropUseGenericPost<T = any> {
  endpoint: string;
  queryKey: string;
  options?: object;
  onSuccessCallback?: (data: T) => void;
}

// GET genérico (ok)
export const useGenericGet = ({ endpoint, queryKey, options = {} }: IPropUseGenericGet) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => api.get(endpoint).then((res) => res.data),
    ...options,
  });
};

// POST genérico
export const useGenericPost = ({ endpoint, queryKey, options = {}, onSuccessCallback }: IPropUseGenericPost) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => api.post(endpoint, body).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    ...options,
  });
};
