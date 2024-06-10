import { Event } from "./Event";

export type SOCKET_RESPONSE_PARAMS = {
  CREATE_EVENT: Event;
};

export interface SocketEvent {
  CREATE_EVENT: (data: SOCKET_RESPONSE_PARAMS["CREATE_EVENT"]) => void;
}
