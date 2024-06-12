export interface Event {
  id: number;
  title: string;
  description: string;
  isAnonymous: boolean;
  createdAt: Date;
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
