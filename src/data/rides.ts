export interface RideEntry {
  id: string;
  routeName: string;
  distance?: string;
  date?: string;
  story: string;
  favoriteStop?: string;
  imageSrc?: string;
  coordinates?: { lat: number; lng: number }[];
}

// [YOU FILL] — add your actual riding routes and stories here
// Place route images in public/images/gallery/riding/
// For Leaflet map: provide coordinates array as polyline points

export const rides: RideEntry[] = [
  // Example:
  // {
  //   id: "mysuru-coorg",
  //   routeName: "Mysuru → Coorg",
  //   distance: "120 km",
  //   date: "2025-01-15",
  //   story: "[YOU FILL — your story about this ride]",
  //   favoriteStop: "[YOU FILL — favorite stop on this route]",
  //   imageSrc: "/vijaybiradar/images/gallery/riding/mysuru-coorg.jpg",
  //   coordinates: [
  //     { lat: 12.2958, lng: 76.6394 },
  //     { lat: 12.4244, lng: 75.7382 },
  //   ],
  // },
];
