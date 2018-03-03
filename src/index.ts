import { LexRuntime } from 'aws-sdk'
import { Foursquare } from './foursquare'
import { Configuration } from './config';

const config = Configuration.load(process.env);

const lex = new LexRuntime({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion,
})

const foursquare = new Foursquare(config)

export = function (robot: Hubot.Robot): void {
  robot.respond(/(.*)/, async (res: Hubot.Response) => {
    const lexResponse = await lex.postText({
      botName: config.botName,
      botAlias: config.botAlias,
      userId: `hubot-${res.message.user.id}`,
      inputText: res.match[1],
    }).promise()

    if (lexResponse.intentName === 'WhereCanIGetLunch') {
      const resp = 
        await foursquare.exploreVenues({
          query: 'quick lunch',
          latitude: config.latitude,
          longitude: config.longitude,
          openNow: true,
        })

      const recommendations = 
        resp.response.groups[0].items.map((i) => i.venue.name)

      const recommendation = res.random(recommendations)

      res.reply(`How about ${recommendation}?`)
    }
  })
}
