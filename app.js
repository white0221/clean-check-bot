const { App } = require('@slack/bolt'); 

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const NAMES = ['ROOM_A', 'ROOM_B', 'ROOM_C'];

const BASE_MESSAGE = { "blocks": [] };

function createMessage(names) {
  var message = BASE_MESSAGE;
  for (let name of names) {
    message.blocks.push(createSection(name));
  }
  return message
}

function createSection(text) {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": text
    },
    "accessory": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": "DONE",
        "emoji": true
      },
      "value": text,
      "style": "primary",
      "action_id": "button"
    }
  }
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

function messageUpdate(message, user, value) {
  for (let i in message.blocks) {
    if (('accessory' in message.blocks[i]) &&
      (message.blocks[i].accessory.value === value)) {
      message.blocks[i] = createDoneMessage(user, value);
    }
  }
  return message
};

app.message('hello', async({ say }) => {
  console.log('called');
  await say(createMessage(NAMES));
});

app.action('button', async({ body, ack, respond }) => {
  await ack();
  console.log('button clicked!');
  let message = { "blocks": body.message.blocks };
  await respond(messageUpdate(message, body.user.name, body.actions[0].value));
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running');
})();
