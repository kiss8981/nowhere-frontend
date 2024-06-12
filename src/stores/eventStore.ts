import { create } from "zustand";
import { Event } from "@/types/Event";

interface EventStore {
  events: Event[];
  selectedEvent: Event | null;
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  selectEvent: (event: Event) => void;
}

export const useEventStore = create<EventStore>(set => ({
  events: [],
  selectedEvent: null,
  setEvents: events => set({ events }),
  addEvent: event =>
    set(state => ({
      events: [event, ...state.events].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })),
  selectEvent: event => set({ selectedEvent: event }),
}));

export const useAddEvent = () => {
  const { addEvent } = useEventStore();
  return addEvent;
};
