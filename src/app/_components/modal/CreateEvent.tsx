import { Event } from "@/types/Event";
import { useRef, useState } from "react";
import LocationSelect from "./LocationSelect";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateEventModal = ({ open, onClose }: CreateEventModalProps) => {
  const [openAddressDetail, setOpenAddressDetail] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isAnonymous: false,
    latitude: 0,
    longitude: 0,
    address: "",
    addressOfPlace: "",
  });
  const outsideRef = useRef(null);
  useOutsideClick({
    ref: outsideRef,
    handler: () => {
      setOpenAddressDetail(false);
    },
  });

  const handleLocationSelect = (
    latitude: number,
    longitude: number,
    address: string,
    addressOfplace: string
  ) => {
    setFormData(prev => ({
      ...prev,
      latitude,
      longitude,
      address,
      addressOfPlace: addressOfplace,
    }));
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl mb-4">Create Post</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={e => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={e => {
                    setFormData({ ...formData, description: e.target.value });
                  }}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={e => [
                    setFormData({ ...formData, isAnonymous: e.target.checked }),
                  ]}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm font-medium text-gray-700">
                  Anonymous
                </label>
              </div>
              <div className="flex flex-col">
                <LocationSelect onSelectLocation={handleLocationSelect} />
                <div className="mt-2 text-sm font-medium text-gray-500 flex flex-row flex-wrap relative">
                  <motion.div
                    ref={outsideRef}
                    initial={{ opacity: 0, y: -5, display: "none" }}
                    variants={{
                      enter: {
                        opacity: 1,
                        y: 0,
                        display: "block",
                      },
                      exit: {
                        y: -5,
                        opacity: 0,
                        transition: {
                          duration: 0.3,
                        },
                        transitionEnd: {
                          display: "none",
                        },
                      },
                    }}
                    animate={openAddressDetail ? "enter" : "exit"}
                    className="absolute top-5 w-64 p-4 bg-white shadow-md rounded-lg"
                  >
                    <input
                      type="text"
                      placeholder="자세한 위치를 입력해주세요"
                      className="p-2 border border-gray-300 rounded-md w-full"
                      onChange={e => {
                        setFormData({
                          ...formData,
                          addressOfPlace: e.target.value,
                        });
                      }}
                    />
                  </motion.div>
                  {formData.address}{" "}
                  <button
                    type="button"
                    className="text-blue-500 flex items-center space-x-1 ml-1"
                    onClick={() => setOpenAddressDetail(true)}
                  >
                    자세한 위치
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {}}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEventModal;
