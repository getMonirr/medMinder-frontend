import schedule from "node-schedule";
import axios from "axios";
import moment from "moment";

interface Reminder {
  medicationName: string;
  time: string;
  caregivers: [string];
  frequency: string;
  _id: string;
}

const ScheduleTask = () => {
  const reminderSchedule = schedule.scheduleJob("* * * * *", async () => {
    const currentTime = moment(new Date()).format("h:mma").toUpperCase();
    try {
      const { data: dueReminders } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders?time=${currentTime}`
      );
      console.log(currentTime, dueReminders);
      if (dueReminders.length > 0) {
        // Trigger the notification route for each due reminder
        dueReminders.forEach(async (reminder: Reminder) => {
          if (reminder.frequency === "daily") {
            // Schedule a daily reminder
            const result = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders/notify`,
              { reminderId: reminder._id, caregivers: reminder.caregivers }
            );
            console.log({ daily: result });
          } else if (reminder.frequency === "weekly") {
            // Schedule weekly reminders on Sundays
            schedule.scheduleJob("0 0 * * 0", async () => {
              const result = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders/notify`,
                { reminderId: reminder._id, caregivers: reminder.caregivers }
              );
              console.log({ weekly: result });
            });
          }
        });
      }
    } catch (error) {
      console.error("Schedule Error :", error);
    }
  });

  return null;
};

export default ScheduleTask;

// const ScheduleTask = () => {
//   const reminderSchedule = schedule.scheduleJob("* * * * *", async () => {
//     const currentTime = moment(new Date()).format("h:mma").toUpperCase();
//     try {
//       const { data: dueReminders } = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders?time=${currentTime}`
//       );
//       console.log(currentTime, dueReminders);

//       if (dueReminders.length > 0) {
//         // Trigger the notification route for each due reminder
//         dueReminders.forEach((reminder: any) => {
//           axios.post(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders/notify`,
//             { reminderId: reminder._id, caregivers: reminder.caregivers }
//           );
//         });
//       }
//     } catch (error) {
//       console.error("Schedule Error :", error);
//     }
//   });

//   return null;
// };

// export default ScheduleTask;
