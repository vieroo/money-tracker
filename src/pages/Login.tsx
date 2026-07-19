import { Link, Navigate } from "react-router-dom";
import { LogIn, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "#hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormData, type LoginFormData } from "../types/auth";
import { toast } from "sonner";
import { isAuthApiError } from "@supabase/supabase-js";

export function LoginPage() {
  const { login } = useAuth();

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data.email, data.password);

      <Navigate to="/dashboard" />;
    } catch (error) {
      if (isAuthApiError(error)) {
        toast.error(error.message);
      }
    }
  }

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormData),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 rounded-2xl shadow-sm">
        <CardHeader className="flex flex-col items-center pt-8 mb-2">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
            <Wallet className="text-secondary-foreground" size={24} />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
            Bem vindo de volta!
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Informe seus dados para acessar o centro de controle financeiro.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="ml-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="rounded-xl h-9 px-3"
                required
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="password">Senha</Label>
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-xl h-9 px-3"
                required
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mx-auto mt-6 rounded-xl h-9 text-sm gap-2 px-12 flex cursor-pointer"
            >
              Entrar
              <LogIn size={18} />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8">
          <div className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="font-medium text-foreground cursor-pointer"
            >
              Criar conta
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
