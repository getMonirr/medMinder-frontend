"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
type Inputs = {
  medicationName: string;
  time: String;
  frequency: String;
  careTaker: boolean;
};

const ReminderForm = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // time format
    const [h, m]: any = data.time.split(":");
    const time = (h % 12 ? h % 12 : 12) + ":" + m + (h >= 12 ? "PM" : "AM");
    data.time = time;

    // post a reminder to the server
    const caregivers = data.careTaker ? [session?.user?.email] : [];
    const newReminder = {
      ...data,
      caregivers,
      userEmail: session?.user?.email,
    };
    console.log({ newReminder });
    try {
      const { data: result, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders`,
        newReminder
      );
      if (status === 201) {
        reset();
        toast.success("Reminder created successfully");
      }
    } catch (error: any) {
      toast.error(error?.message || "something is wrong");
      console.log({ error });
    }
  };
  return (
    <div className="md:max-w-md w-full bg-pill-bg p-8 rounded-md shadow-2xl">
      <h2 className="text-2xl font-bold">Create Medication Reminder</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Medicine Name</span>
          </label>
          <input
            {...register("medicationName", { required: true })}
            type="text"
            placeholder="Enter Medicine Name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            {...register("time", { required: true })}
            type="time"
            placeholder="Enter time"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select your Frequency</span>
          </label>
          <select className="select select-bordered" {...register("frequency")}>
            <option disabled selected>
              Pick one
            </option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              {...register("careTaker")}
              type="checkbox"
              className="checkbox checkbox-primary"
            />
            <span className="label-text pl-4">
              Assign a CareGiver
              <span className="text-xs font-bold pl-3">
                caregiver notify you
              </span>
            </span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary bg-text-color hover:bg-teal-700 border-none">
            Create Reminder
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReminderForm;
