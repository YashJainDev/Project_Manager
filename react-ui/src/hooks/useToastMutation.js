import { useCallback, useRef } from "react";
import toast from "react-hot-toast";

export function useToastMutation(
  mutationFn,
  {
    loadingMessage = "Processing...",
    successMessage = "Action completed successfully!",
    errorMessage = "Something went wrong!",
    onSuccess,
    onError,
  } = {}
) {
  const toastIdRef = useRef(null);

  const wrappedMutation = useCallback(
    async (args) => {
      toastIdRef.current = toast.loading(loadingMessage);

      try {
        const result = await mutationFn(args).unwrap();
        toast.success(successMessage, { id: toastIdRef.current });
        onSuccess?.(result); // optional callback
        return result;
      } catch (err) {
        const fallbackError =
          err?.data?.message || err?.message || errorMessage;
        toast.error(fallbackError, { id: toastIdRef.current });
        onError?.(err); // optional callback
        throw err;
      }
    },
    [
      mutationFn,
      loadingMessage,
      successMessage,
      errorMessage,
      onSuccess,
      onError,
    ]
  );

  return wrappedMutation;
}
