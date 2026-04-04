"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Algo deu errado
        </h1>
        <p className="font-heading text-sm text-muted-foreground">
          Ocorreu um erro ao carregar os dados. Tenta novamente.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.push("/auth")}>
          Sair
        </Button>
        <Button onClick={reset}>Tentar novamente</Button>
      </div>
    </div>
  );
}
