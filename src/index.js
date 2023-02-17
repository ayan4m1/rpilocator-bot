import { XMLParser } from 'fast-xml-parser';
import { isBefore, parse } from 'date-fns';

import { polling as config } from './modules/config.js';
import { getLogger } from './modules/logging.js';
import { sendNotification } from './modules/mail.js';
import {
  loadLastNotification,
  saveLastNotification
} from './modules/storage.js';

const log = getLogger('app');
const parser = new XMLParser();

const poll = async () => {
  try {
    log.info('Checking for stock...');

    const response = await fetch('https://rpilocator.com/feed/');

    if (response.status !== 200) {
      throw new Error(`Got HTTP ${response.status} from RSS URL!`);
    }

    const text = await response.text();
    let {
      rss: {
        channel: { item: items }
      }
    } = parser.parse(text);

    if (!items.length) {
      throw new Error('No items in RSS response!');
    }

    if (config.categories.length) {
      items = items.filter((item) =>
        config.categories.every((category) => item.category.includes(category))
      );
    }

    if (!items.length) {
      throw new Error('No matching items in RSS response!');
    }

    const lastNotification = await loadLastNotification();

    items = items.filter((item) => {
      const publishDate = parse(
        item.pubDate.substring(item.pubDate.indexOf(', ') + 2),
        "dd MMM yyyy HH:mm:ss 'GMT'",
        new Date()
      );

      return (
        !isBefore(lastNotification, publishDate) &&
        lastNotification.getTime() !== publishDate.getTime()
      );
    });

    if (!items.length) {
      throw new Error('No un-notified items in RSS response!');
    }

    for (const item of items) {
      const publishDate = parse(
        item.pubDate.substring(item.pubDate.indexOf(', ') + 2),
        "dd MMM yyyy HH:mm:ss 'GMT'",
        new Date()
      );

      await saveLastNotification(publishDate);

      log.info(`Notifying about ${item.title}!`);

      await sendNotification(item);
    }
  } catch (error) {
    log.error(error.message);
    log.error(error.stack);
  }
};

poll();
setInterval(poll, config.interval);
