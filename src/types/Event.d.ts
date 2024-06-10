export interface Event {
  title: string;
  description: string;
  isAnonymous: boolean;
  user: {
    name: string;
  };
  location: {
    latitude: number;
    longitude: number;
    address: string | null;
    addressOfplace: string | null;
  };
}
