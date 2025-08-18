import { CEmotion } from "@/services/EmotionService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const EmotionService = new CEmotion();

export function useEmotion() {
  const queryClient = useQueryClient();
   const list = useQuery({
     queryKey: ["Emotions"],
     queryFn: () => EmotionService.getAll(),
   });
 

  const create = useMutation({
    mutationFn: EmotionService.created,
    retryDelay: 5000,
    onSuccess: () => {
      queryClient.isFetching({ queryKey: ["Emotions"] });
      // queryClient.resetQueries()
    },
  });
   const update = useMutation({
    mutationFn: EmotionService.update,
    retryDelay: 5000,
    onSuccess: () => {
      queryClient.isFetching({ queryKey: ["Emotions"] });
      // queryClient.resetQueries()
    },
  });
   const deleter = useMutation({
    mutationFn: EmotionService.delete,
    retryDelay: 5000,
    onSuccess: () => {
      queryClient.isFetching({ queryKey: ["Emotions"] });
      // queryClient.resetQueries()
    },
  });

  return { list,create,update,deleter };
}
