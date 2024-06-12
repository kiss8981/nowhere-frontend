"use client";

import { useEffect, useState } from "react";
import CreateEventModal from "./modal/CreateEvent";
import { fetcher } from "@/apis/fetcher";
import { useEventStore } from "@/stores/eventStore";
import { Event } from "@/types/Event";
import dayjs from "dayjs";
import { classNames } from "@/utils/utils";

const EventBar = () => {
  const [openNewEventModal, setOpenNewEventModal] = useState(false);
  const { events, addEvent, selectedEvent, selectEvent } = useEventStore();

  useEffect(() => {
    if (selectedEvent) {
      selectEvent(selectedEvent);
    }
  }, [selectedEvent]);

  return (
    <>
      {/** Event List Side Bar overlay */}
      <aside className="absolute top-24 left-5 min-w-80 w-1/5 h-[calc(100%_-_130px)] bg-white shadow-lg z-10 overflow-y-auto flex flex-col rounded-lg no-scrollbar">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 z-50 bg-white">
          <h1 className="text-lg font-semibold">지금 여기!</h1>
          <button
            className="p-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setOpenNewEventModal(true)}
          >
            지금 이벤트 만들기
          </button>
        </div>
        {events.map((event, index) => (
          <button
            className={classNames(
              "p-4 w-full border-b border-gray-200 hover:bg-gray-100 cursor-pointer z-10",
              selectedEvent?.id === event.id ? "bg-gray-100" : ""
            )}
            key={index}
            onClick={() => selectEvent(event)}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-sm font-light text-gray-500">
                  {event.description}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm">{event.user.name}</span>
              </div>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-between mt-2">
              <div className="flex flex-row items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icon/pin-location-icon.svg"
                  alt="location icon"
                  className="w-4 h-4 mr-2"
                />
                <span className="text-sm">{event.location.address}</span>
              </div>
              <div className="flex flex-row items-center">
                <span className="text-sm font-light text-gray-500">
                  {dayjs(event.createdAt).format("HH시 mm분")}
                </span>
              </div>
            </div>
          </button>
        ))}
      </aside>

      <CreateEventModal
        open={openNewEventModal}
        onClose={() => setOpenNewEventModal(false)}
      />
    </>
  );
};

export default EventBar;
