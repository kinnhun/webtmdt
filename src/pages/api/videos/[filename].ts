import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;
  
  if (!filename || typeof filename !== 'string') {
    return res.status(400).send('Invalid filename');
  }

  const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).send('Video not found');
  }

  const stat = fs.statSync(filepath);
  const fileSize = stat.size;
  const range = req.headers.range;

  return new Promise((resolve, reject) => {
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filepath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
      file.on('end', () => resolve(null));
      file.on('error', (err) => {
        console.error(err);
        res.status(500).end();
        resolve(null);
      });
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      const file = fs.createReadStream(filepath);
      file.pipe(res);
      file.on('end', () => resolve(null));
      file.on('error', (err) => {
        console.error(err);
        res.status(500).end();
        resolve(null);
      });
    }
  });
}
