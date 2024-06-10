import React, { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";

interface LocationSelectProps {
  onSelectLocation: (
    latitude: number,
    longitude: number,
    address: string,
    addressOfplace: string
  ) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  onSelectLocation,
}) => {
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [viewPosition, setViewPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setViewPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (position && window.kakao.maps.services.Geocoder) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(position.lng, position.lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address =
            result[0].road_address?.address_name ||
            result[0].address.address_name ||
            "";
          onSelectLocation(position.lat, position.lng, address, "");
        }
      });
    }
  }, [position]);
  return (
    <div className="w-full h-64 mt-4 relative">
      <Map // 지도를 표시할 Container
        center={viewPosition}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        level={3} // 지도의 확대 레벨
        onClick={(target, mouseEvent) => {
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
        }}
      >
        <MapMarker // 마커를 표시할 위치
          onDragEnd={marker => {
            setPosition({
              lat: marker.getPosition().getLat(),
              lng: marker.getPosition().getLng(),
            });
          }}
          draggable={true}
          position={position}
          image={{
            src: "/icon/pin-location-icon.svg",
            size: {
              width: 25,
              height: 25,
            },
          }}
        />
        <CustomOverlayMap position={position} yAnchor={1.5}>
          <div className="bg-white p-2 rounded-md">
            <h3 className="text-sm font-semibold">위치를 선택해주세요</h3>
            <p className="text-xs text-gray-500">
              지도를 클릭하여 위치를 선택해주세요
            </p>
          </div>
        </CustomOverlayMap>
      </Map>

      <button
        className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md z-50"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(position => {
            setPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setViewPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon/gps-location-icon.svg"
          alt="location"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};

export default LocationSelect;
