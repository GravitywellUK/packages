# @gravitywelluk/npm-slack

Node script to send Slack notifications on successful NPM releases

## Usage

```
npm-slack $SLACK_WEBHOOK_URL
```

Takes a single parameter specifying the Slack webhook URL

## Payload

```json
{
  package: "@gravitywelluk/package",
  version: "1.0.0"
}
```