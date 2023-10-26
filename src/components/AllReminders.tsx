"use client";
import RootLayout from "@/components/shared/RootLayout";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { useState } from "react";
import UpdateForm from "./UpdateModal";
import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import axios from "axios";

const AllReminders = () => {
  const { data: session } = useSession();
  const { data: reminders, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders?email=${session?.user?.email}`,
    fetcher
  );
  const [selectedReminder, setSelectedReminder] = useState<any>(null);

  const openModal = (reminder: any) => {
    setSelectedReminder(reminder);
  };

  const closeModal = () => {
    setSelectedReminder(null);
  };
  // Define a function to delete a reminder
  const deleteReminder = async (reminderId: string) => {
    Swal.fire({
      title: "Do you want to delete the reminder?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send a DELETE request to your API to delete the reminder
          const { status } = await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders/${reminderId}`
          );

          if (status === 204) {
            Swal.fire("Successfully Delete", "", "success");
            mutate(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders?email=${session?.user?.email}`,
              (data: any) => {
                return data.filter((item: any) => item._id !== reminderId);
              },
              false
            );
          }
        } catch (error) {
          console.error("Error deleting reminder:", error);
        }
      } else if (result.isDenied) {
        Swal.fire("You cancel the delete", "", "info");
      }
    });
  };
  return (
    <>
      <RootLayout>
        <div className="py-16">
          <h2 className="text-xl font-bold border-b-2 p-2">My All Reminder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-8">
            {(reminders &&
              Array.isArray(reminders) &&
              reminders?.length > 0 &&
              reminders.map(({ medicationName, frequency, time, _id }) => (
                <>
                  <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title pb-3">{medicationName}</h2>
                      <p>
                        <span className="font-bold">Time:</span> {time}
                      </p>
                      <p>
                        <span className="font-bold">Frequency:</span>{" "}
                        {frequency}
                      </p>
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-sm btn-circle btn-outline group hover:bg-[#ff4e00] group hover:border-none"
                          onClick={() => deleteReminder(_id)}
                        >
                          <FaTrashAlt className="text-[#ff4e00] group-hover:text-white" />
                        </button>
                        <button
                          onClick={() =>
                            openModal({ medicationName, frequency, time, _id })
                          }
                          className="btn btn-sm btn-circle btn-outline group   hover:bg-text-color group hover:border-none"
                        >
                          <FaEdit className="text-text-color group-hover:text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))) || <p>You do not have any reminders</p>}
          </div>
          {selectedReminder && (
            <Modal isOpen={true} setIsOpen={closeModal}>
              <UpdateForm closeModal={closeModal} id={selectedReminder._id} />
            </Modal>
          )}
        </div>
      </RootLayout>
    </>
  );
};

export default AllReminders;
