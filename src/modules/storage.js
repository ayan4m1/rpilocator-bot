import { subHours } from 'date-fns';
import { existsSync } from 'fs';
import jsonfile from 'jsonfile';

const { readFile, writeFile } = jsonfile;

const path = './storage.json';

export const loadLastNotification = async () => {
  if (!existsSync(path)) {
    await writeFile(path, {
      lastNotification: subHours(new Date(), 1)
    });
  }

  const result = await readFile(path);

  return new Date(result?.lastNotification);
};

export const saveLastNotification = (lastNotification) =>
  writeFile(path, { lastNotification });
