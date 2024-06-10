"use client";

import { useState } from "react";
import CreateEventModal from "./modal/CreateEvent";

const EventBar = () => {
  const [openNewEventModal, setOpenNewEventModal] = useState(false);
  return (
    <>
      {/** Event List Side Bar overlay */}
      <aside className="absolute top-24 left-5 w-1/4 min-h- bg-white shadow-lg z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="ml-2">
                <h2 className="text-lg font-bold">Event Name</h2>
                <p className="text-sm">Event Date</p>
              </div>
            </div>
            <button
              className="text-lg font-bold"
              onClick={() => setOpenNewEventModal(true)}
            >
              +
            </button>
          </div>
        </div>
      </aside>

      <CreateEventModal
        open={openNewEventModal}
        onClose={() => setOpenNewEventModal(false)}
      />
    </>
  );
};

export default EventBar;
