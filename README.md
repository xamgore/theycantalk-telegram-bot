<img align="center" width="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Tumblr_Logo.svg/500px-Tumblr_Logo.svg.png">&nbsp;&nbsp;`———>`&nbsp;&nbsp;
<img align="center" width="24" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/768px-Telegram_logo.svg.png">

## tumblr to telegram translator

This project is needed to automatically take news from a tumblr blog and send them to Telegram's channel.

### How it works

The algorithm is simple:
- send a request and pick up blog posts from tumblr
- skip news that were previously sent
- send the remaining ones to the telegram channel

### How to build

There is the `.env.example` file in the project root. Rename it to `.env`, change variables inside, then download all dependencies by `npm i`, and run the app with `npm start` command. Yarn is also supported.

To add a task to cron run `crontab -e`, then add the line:

```
*/30 * * * *   cd /home/xamgore/tumblr-to-telegram/ && /usr/local/bin/node ./index.js
```
