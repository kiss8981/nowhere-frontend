"use client";

import { useState } from "react";
import EventBar from "./EventBar";
import KakaoMap from "./kakaoMap";
import { Event } from "@/types/Event";

const EventComponent = () => {
  return (
    <>
      <EventBar />
      <KakaoMap />
    </>
  );
};

export default EventComponent;
