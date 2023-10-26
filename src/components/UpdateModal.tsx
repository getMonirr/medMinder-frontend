"use client";
import fetcher from "@/utils/fetcher";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
type Inputs = {
  medicationName: string;
  time: String;
  frequency: String;
};

const UpdateForm = ({
  id,
  closeModal,
}: {
  id: string;
  closeModal: Function;
}) => {
  const { data: session } = useSession();
  const { data: reminder, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders/${id}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const [h, m]: any = data.time.split(":");
    const time = (h % 12 ? h % 12 : 12) + ":" + m + (h >= 12 ? "PM" : "AM");
    data.time = time;
    // update the reminder data in the database
    const { data: result, status } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders/${id}`,
      data
    );
    console.log({ result, status });
    if (status === 200) {
      mutate(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders?email=${session?.user?.email}`,
        data
      );
      toast.success("Reminder updated successfully");
      closeModal();
    }
  };

  return (
    <>
      <div className="md:max-w-md w-full bg-pill-bg p-8 rounded-md shadow-2xl">
        <h2 className="text-2xl font-bold">Create Medication Reminder</h2>
        {reminder && (
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
                defaultValue={reminder?.medicationName}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Time</span>
              </label>
              <label className="label">
                <span className="label-text">
                  Previous Time: {reminder?.time}
                </span>
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
              <select
                className="select select-bordered"
                {...register("frequency")}
                defaultValue={reminder?.frequency}
              >
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
                  type="checkbox"
                  defaultChecked={reminder?.caregivers?.length > 0}
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
                Update Reminder
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UpdateForm;
