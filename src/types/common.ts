export interface Location {
  country: string;
  city: string;
  locality: string;
  lat: number;
  lng: number;
}

export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}
