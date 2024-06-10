import { create } from "zustand";
import { Event } from "@/types/Event";

interface EventStore {
  events: Event[];
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
}

export const useEventStore = create<EventStore>(set => ({
  events: [],
  setEvents: events => set({ events }),
  addEvent: event => set(state => ({ events: [...state.events, event] })),
}));

export const useAddEvent = () => {
  const { addEvent } = useEventStore();
  return addEvent;
};
