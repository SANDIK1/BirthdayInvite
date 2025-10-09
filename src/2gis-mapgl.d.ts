declare module '@2gis/mapgl' {
  interface IconOptions {
    href: string;
    size?: [number, number];
    anchor?: [number, number];
  }

  interface Icon {
    destroy(): void;
  }

  interface MarkerOptions {
    coordinates: [number, number];
    icon?: string | Icon;
    size?: [number, number];
    anchor?: [number, number];
    zIndex?: number;
    label?: {
      text: string;
      offset: [number, number];
      fontSize?: number;
      color?: string;
      haloColor?: string;
    };
  }

  interface Marker {
    setCoordinates(coordinates: [number, number]): void;
    destroy(): void;
  }

  interface Map {
    destroy(): void;
    setCenter(center: [number, number]): void;
    setZoom(zoom: number): void;
    setStyle(style: string): void;
  }
  
  interface MapOptions {
    center: [number, number];
    zoom: number;
    key: string;
    style?: string;
    pitch?: number;
    rotation?: number;
  }

  export function load(): Promise<{
    Map: new (
      container: HTMLElement,
      options: MapOptions
    ) => Map;
    Marker: new (map: Map, options: MarkerOptions) => Marker;
    Icon: new (options: IconOptions) => Icon;
  }>;
}

declare module '@2gis/mapgl/markers' {
  import { Map } from '@2gis/mapgl';

  interface MarkerOptions {
    coordinates: [number, number];
    icon?: string;
    size?: [number, number];
    anchor?: [number, number];
    zIndex?: number;
    label?: {
      text: string;
      offset: [number, number];
      fontSize?: number;
      color?: string;
      haloColor?: string;
    };
  }

  interface HtmlMarkerOptions {
    coordinates: [number, number];
    html: string;
    zIndex?: number;
  }

  export class Marker {
    constructor(map: Map, options: MarkerOptions);
    destroy(): void;
  }

  export class HtmlMarker {
    constructor(map: Map, options: HtmlMarkerOptions);
    destroy(): void;
  }
}
