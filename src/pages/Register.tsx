import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Loader2, Wallet } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormData, type RegisterFormData } from "../types/auth";
import { useAuth } from "#hooks/useAuth";

export function RegisterPage() {
  const { register } = useAuth();

  async function onSubmit(data: RegisterFormData) {
    try {
      await register(data.name, data.email, data.password);
      <Navigate to="/login" />;
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return;
    }
  }

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormData),
    defaultValues: {
      name: "",
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
            Criar conta
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Junte-se ao FinTrack Pro para dominar suas finanças.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="ml-1" htmlFor="name">
                Nome Completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="João da Silva"
                className="rounded-xl h-9 px-3"
                {...form.register("name")}
                required
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="ml-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="rounded-xl h-9 px-3"
                {...form.register("email")}
                required
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="ml-1" htmlFor="password">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha forte"
                className="rounded-xl h-9 px-3"
                {...form.register("password")}
                required
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
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Criar Conta <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8">
          <div className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-medium text-foreground hover:underline"
            >
              Entrar
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
