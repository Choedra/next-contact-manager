// src/hooks/useLogin.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { login } from "../api/authApi";
import { LoginInput, loginSchema } from "../components/auth/authValidation";

export function useLogin() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (token) => {
      setToken(token);
      router.push("/contacts");
    },
  });

  const onSubmit = (data: LoginInput) => mutation.mutate(data);

  return {
    ...form,
    onSubmit,
    isLoading: mutation.status === "pending",
    isError: mutation.status === "error",
    error: mutation.error,
  };
}
