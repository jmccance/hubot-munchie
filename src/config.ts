export interface Configuration {
  awsAccessKeyId: string,
  awsSecretAccessKey: string,
  awsRegion: string,
  botName: string,
  botAlias: string,
  clientId: string,
  clientSecret: string,
  latitude: number,
  longitude: number
}

export namespace Configuration {
  export function load(env: { [index: string]: string }): Configuration {
    return {
      awsAccessKeyId: env['MUNCHIE_AWS_ACCESS_KEY_ID'],
      awsSecretAccessKey: env['MUNCHIE_AWS_SECRET_ACCESS_KEY'],
      awsRegion: env['MUNCHIE_AWS_REGION'],
      botName: env['MUNCHIE_BOT_NAME'],
      botAlias: env['MUNCHIE_BOT_ALIAS'],
      clientId: env['MUNCHIE_FOURSQUARE_CLIENT_ID'],
      clientSecret: env['MUNCHIE_FOURSQUARE_CLIENT_SECRET'],
      latitude: Number(env['MUNCHIE_DEFAULT_LATITUDE']),
      longitude: Number(env['MUNCHIE_DEFAULT_LONGITUDE']),
    }
  }
}