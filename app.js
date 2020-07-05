const { App } = require('@slack/bolt'); 

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var message = {
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

app.message('hello', async({ say }) => {
  await say(message);
});

app.action('button', async({ body, ack, respond }) => {
  await ack();
  console.log(body);
  await respond('done!');
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('Bolt app is running');
})();
