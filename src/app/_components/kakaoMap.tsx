"use client";

import { useSocket } from "@/components/provider/SocketProvider";
import { useAddEvent, useEventStore } from "@/stores/eventStore";
import { useEffect, useState } from "react";
import { useKakaoLoader, Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const { socket } = useSocket();
  const { events, addEvent } = useEventStore();
  const [initLocation, setInitLocation] = useState({
    lat: 33.5563,
    lng: 126.79581,
  });
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string,
    libraries: ["services"],
  });

  useEffect(() => {
    // get real location from navigator.geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setInitLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("CREATE_EVENT", event => {
        addEvent(event);
      });
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
        center={{ lat: initLocation.lat, lng: initLocation.lng }}
        style={{ width: "100%", height: "100vh" }}
      >
        {events.map((event, index) => (
          <MapMarker
            key={index}
            position={{
              lat: event.location.latitude,
              lng: event.location.longitude,
            }}
            onClick={() => {
              console.log("click");
            }}
          >
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </MapMarker>
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
