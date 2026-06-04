import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return new Promise((resolve) => {
      const fileId = req.headers['x-file-id'] as string;
      const ext = req.headers['x-file-ext'] as string || 'mp4';
      const chunkIndex = parseInt(req.headers['x-chunk-index'] as string, 10);
      const totalChunks = parseInt(req.headers['x-total-chunks'] as string, 10);
      
      const filename = `video-${fileId}.${ext}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filepath = path.join(uploadDir, filename);
      
      // Open in write mode for first chunk, append mode for others
      const writeStream = fs.createWriteStream(filepath, { flags: chunkIndex === 0 ? 'w' : 'a' });

      req.pipe(writeStream);

      writeStream.on('finish', () => {
        if (chunkIndex === totalChunks - 1) {
          res.status(200).json({ url: `/api/videos/${filename}` });
        } else {
          res.status(200).json({ success: true });
        }
        resolve(null);
      });

      writeStream.on('error', (err) => {
        console.error('Write error:', err);
        res.status(500).json({ error: 'Failed to write chunk' });
        resolve(null);
      });

      req.on('error', (err) => {
        console.error('Request stream error:', err);
        res.status(500).json({ error: 'Failed to upload chunk' });
        resolve(null);
      });
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
