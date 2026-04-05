import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "../_lib/auth-client";
import { getHomeData } from "../_lib/api/fetch-generated";
import dayjs from "dayjs";
import { Chat } from "../_components/chat";

export default async function ChatPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const homeData = await getHomeData(dayjs().format("YYYY-MM-DD"));

  if (homeData.status === 200 && homeData.data.activeWorkoutPlanId) {
    redirect("/");
  }

  const firstName = session.data.user.name?.split(" ")[0] ?? "atleta";

  return (
    <Chat
      embedded
      greeting={`Olá, ${firstName}! Sou o seu Coach AI e vou criar um plano de treino totalmente personalizado para você.\n\nMe conta algumas coisas:\n- Qual é o seu objetivo principal? (ganhar massa, emagrecer, melhorar o condicionamento)\n- Quantos dias por semana consegue treinar?\n- Qual é o seu nível de experiência? (iniciante, intermediário, avançado)`}
    />
  );
}
