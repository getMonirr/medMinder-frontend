import AllReminders from "@/components/AllReminders";
import Banner from "@/components/Bannet";
import ScheduleTask from "@/components/ScheduleTask";

export default function Home() {
  return (
    <main>
      <Banner />
      <ScheduleTask />
      <AllReminders />
    </main>
  );
}
