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

  return (
    <Chat
      embedded
      initialMessage="Olá! Vou criar um plano de treino personalizado para você. Me conta: qual é o seu objetivo principal (ganhar massa, emagrecer, condicionamento), quantos dias por semana consegue treinar e qual é o seu nível de experiência?"
    />
  );
}
