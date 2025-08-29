"use client"

import { useRegister } from "@/src/hooks/useRegister"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, UserPlus } from "lucide-react"

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isLoading,
    isError,
    error,
  } = useRegister()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md border-slate-200/60 shadow-xl backdrop-blur-sm bg-white/80">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary/10 p-3 rounded-2xl">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-foreground">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Join us today and get started
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("name")}
                placeholder="Full Name"
                className="w-full"
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="w-full"
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full"
              />
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>

            {isError && (
              <Alert variant="destructive">
                <AlertDescription>{(error as Error).message}</AlertDescription>
              </Alert>
            )}

            <div className="text-center pt-4 border-t border-border">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}