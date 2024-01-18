export interface Item {
  extent: string;
  identifier: string;
  routeRecommendation: [{}];
  coordinates: {
    lat: number;
    long: number;
  };
  footer: string[];
  icon: string;
  isBlocked: string;
  description: string[];
  title: string;
  point: string;
  displayType: string;
  lorryParkingFeatureIcons: {
    icon: string;
    description: string;
    style: string;
  };
  future: boolean;
  subtitle: string;
}

export interface Webcam extends Item {
  operator: string;
  imageUrl: string;
  linkUrl: string;
}

export interface ExtendedItem {
  startTimestamp: string;
}

export interface Webcams {
  webcam: Webcam[];
}

export interface RoadWorks {
  roadworks: ExtendedItem[];
}

export interface ParkingLorries {
  parkingLorries: Item[];
}

export interface Warnings {
  warnings: ExtendedItem[];
}

export interface Closures {
  closures: ExtendedItem[];
}

export interface ElectricChargingStations {
  electricChargingStation: Item[];
}
