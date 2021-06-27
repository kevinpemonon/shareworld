declare namespace NsGeo {
  export interface IResultGeocodage {
    type: string;
    version: string;
    features: IGeocodage[],
    attribution: string;
    licence: string;
    query: string;
    limit: number
  }
  export interface IGeocodage {

    type: string,
    geometry: {
      type: string,
      coordinates: number[]
    },
    properties: {
      label: string,
      score: number,
      housenumber: string,
      id: string,
      name: string,
      postcode: string,
      citycode: string,
      x: number,
      y: number,
      city: string,
      context: string,
      type: string,
      importance: number,
      street: string
    }
  }
}

export default NsGeo;
