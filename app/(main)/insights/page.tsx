import {auth} from "@/auth";
import {redirect} from "next/navigation";
import ThoughtsChartArea from "@/app/(main)/insights/thoughts-chart-area";

async function Page() {
  const session = await auth();

  if (!session.user) redirect('/sign-in')
  return (
    <>
      <h1>Insights</h1>
      <ThoughtsChartArea />
    </>
  );
}

export default Page;