"use client";

import { useEffect, useState } from "react";
import { useKakaoLoader, Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const [initLocation, setInitLocation] = useState({
    lat: 33.5563,
    lng: 126.79581,
  });
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string,
  });

  useEffect(() => {
    // get real location from navigator.geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setInitLocation({
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
        center={{ lat: initLocation.lat, lng: initLocation.lng }}
        style={{ width: "100vw", height: "100vh" }}
      ></Map>
    </>
  );
};

export default KakaoMap;
