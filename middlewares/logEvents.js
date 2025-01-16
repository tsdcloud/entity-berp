import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join('..', 'logs'))) {
            await fsPromises.mkdir(path.join('..', 'logs'));
        }

        await fsPromises.appendFile(path.join('..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'logs.txt')
    console.log(`${req.method}\t${req.url}\t${req.headers.origin}\t${req.body}`)
    next();
}

export {logEvents, logger};