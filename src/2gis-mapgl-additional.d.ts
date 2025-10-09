declare module '@2gis/mapgl/directory-api' {
  interface DirectoryApiOptions {
    apiKey: string;
  }

  interface DirectoryApi {
    get(type: string, id: string, options: any): Promise<any>;
  }

  export function useDirectoryApi(options: DirectoryApiOptions): DirectoryApi;
}

declare module '@2gis/mapgl/clusters' {
  import { Map } from '@2gis/mapgl';

  interface ClusterOptions {
    radius?: number;
    minZoom?: number;
    maxZoom?: number;
  }

  export class Clusters {
    constructor(map: Map, options?: ClusterOptions);
    destroy(): void;
  }
}
