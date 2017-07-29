import telegram from './telegram';
import tumblr from './tumblr';
import { db, count } from './database';


const getUnread = async (blog) => {
  let repeat = true;
  let offset = 0;
  let posts = [];

  while (repeat) {
    const fresh = await tumblr.blogPosts(blog, { offset });
    repeat = fresh.length && (0 === count(fresh.slice(-1)[0].id));
    posts = posts.concat(fresh);
    offset += 20;
  }

  return posts.reverse();
};


const skipExisting = posts => posts.filter(p => 0 === count(p.id));


const savePosts = (posts) => {
  let storage = db.get('posts');
  for (const p of posts)
    storage = storage.push({ id: p.id });
  storage.write();
};


const sendToChannel = async (posts) => {
  const channel = process.env.TELEGRAM_CHANNEL;

  for (const post of posts) {
    const photos = post.photos.map(img => img.original_size.url);
    for (const url of photos)
      await telegram.sendPhoto(channel, url);
  }

  return posts;
};


getUnread(process.env.TUMBLR_BLOG)
  .then(skipExisting)
  .then(sendToChannel)
  .then(savePosts);
