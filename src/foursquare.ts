import axios from 'axios'


export class Foursquare {
  config: Foursquare.Configuration

  constructor(config: Foursquare.Configuration) {
    this.config = config
  }

  async exploreVenues(
    req: Foursquare.ExploreVenuesRequest
  ): Promise<Foursquare.ExploreVenuesResponse> {
    const res = await axios.get(
      'https://api.foursquare.com/v2/venues/explore',
      {
        params: {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          ll: `${req.latitude},${req.longitude}`,
          query: req.query,
          v: '20170801',
          openNow: req.openNow ? 1 : null
        }
      }
    )

    return res.data
  }
}

export namespace Foursquare {
  export interface Configuration {
    clientId: string,
    clientSecret: string
  }

  export interface ExploreVenuesRequest {
    latitude: number,
    longitude: number,
    query: string,
    openNow: boolean
  }

  export interface ExploreVenuesResponse {
    response: {
      groups: Array<{
        items: Array<{ venue: Venue }>
      }>
    }
  }

  export interface Venue {
    name: string
  }
}
