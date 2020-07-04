const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var MESSAGE = {
  "blocks": [
  {
    "type": "divider"
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "ROOM A"
    },
    "accessory": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": "掃除完了",
      },
      "style": "primary",
      "value": "room_a"
    }
  },
  {
    "type": "divider"
  }
  ]
}

app.message('hello', async({ message, say }) => {
  await say(MESSAGE);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('Bolt app is running');
})();

