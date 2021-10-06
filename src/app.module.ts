import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlackService } from './slack.service';
import { ConfigModule } from '@nestjs/config';
const { App } = require('@slack/bolt');

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, SlackService],
})
export class AppModule {

  constructor(private slackService: SlackService) {

  }

  initSlack(receiver: any) {
    const boltApp = new App({
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      scopes: "",
      authorize: async ({ teamId, enterpriseId }) => {
        // const data = await this.workspaceRepository.findByTeamId(teamId);
        // return {
        //     botToken: data.accessToken,
        //     botId: data.userId
        // };
      },
      receiver,
    });
    this.slackService.initSlackCommand(boltApp);
  }
}
