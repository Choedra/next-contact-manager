import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { signup } from "../api/authApi";
import { RegisterInput, registerSchema } from "../components/auth/authValidation";

export function useRegister() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (token) => {
      setToken(token);
      router.push("/contacts");
    },
  });

  const onSubmit = (data: RegisterInput) => mutation.mutate(data);

  return {
    ...form,
    onSubmit,
    isLoading: mutation.status === "pending",
    isError: mutation.status === "error",
    error: mutation.error,
  };
}
