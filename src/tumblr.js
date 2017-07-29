import promisify from 'es6-promisify';
import tumblr from 'tumblr.js';

const api = new tumblr.Client({
  consumer_key: process.env.TUMBLR_CONSUMER_KEY,
  consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
});

export default {
  blogPosts: (...args) =>
    promisify(api.blogPosts)(...args).then(data => data.posts),
};
