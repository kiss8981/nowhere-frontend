"use client";

import { useSocket } from "@/components/provider/SocketProvider";
import { useAddEvent, useEventStore } from "@/stores/eventStore";
import { useEffect, useState } from "react";
import {
  useKakaoLoader,
  Map,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const { socket } = useSocket();
  const { events, addEvent, selectedEvent, selectEvent } = useEventStore();
  const [location, setLocation] = useState({
    lat: 33.5563,
    lng: 126.79581,
  });
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string,
    libraries: ["services"],
  });

  useEffect(() => {
    if (selectedEvent) {
      setLocation({
        lat: selectedEvent.location.latitude,
        lng: selectedEvent.location.longitude,
      });
    }
  }, [selectedEvent]);

  useEffect(() => {
    // get real location from navigator.geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full loader"></div>
      </div>
    );

  return (
    <>
      <Map
        center={{ lat: location.lat, lng: location.lng }}
        style={{ width: "100%", height: "100vh" }}
      >
        {events.map((event, index) => (
          <>
            <MapMarker
              key={index}
              position={{
                lat: event.location.latitude,
                lng: event.location.longitude,
              }}
              onClick={() => {
                selectEvent(event);
              }}
            />
            <CustomOverlayMap
              position={{
                lat: event.location.latitude,
                lng: event.location.longitude,
              }}
              key={index}
              yAnchor={1.7}
            >
              <div
                className="bg-white p-2 rounded-lg shadow-lg"
                onClick={() => {
                  selectEvent(event);
                }}
              >
                <h1 className="text-lg font-semibold">{event.title}</h1>
                <p className="text-sm font-light text-gray-500">
                  {event.description}
                </p>
              </div>
            </CustomOverlayMap>
          </>
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
