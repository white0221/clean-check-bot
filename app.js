const { App } = require('@slack/bolt'); 

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var MESSAGE = {
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "INNOVATION & TECHNOLOGY"
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "DONE",
          "emoji": true
        },
        "value": "innovation_technology",
        "style": "primary",
        "action_id": "button"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "TOKYO & REAL"
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "DONE",
          "emoji": true
        },
        "value": "tokyo_real",
        "style": "primary",
        "action_id": "button"
      }
    }
  ]
}

function createDoneMessage(user, room) {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*" + room + "* の掃除完了！ by *" + user + "*"
    }
  }
}

function messageUpdate(user, value) {
  console.log(value);
  var message = MESSAGE;
  for (let i in message.blocks) {
    console.log(message.blocks[i]);
    if (message.blocks[i].accessory.value === value) {
      message.blocks[i] = createDoneMessage('ryo', value);
    }
  }
  return message
};

app.message('hello', async({ say }) => {
  await say(MESSAGE);
});

app.action('button', async({ body, ack, respond }) => {
  await ack();
  console.log(body);
  let mes = messageUpdate(body.user.name, body.actions[0].value)
  await respond(mes);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running');
})();
