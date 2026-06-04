import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    return new Promise((resolve) => {
      let body = '';
      req.on('data', chunk => body += chunk.toString());
      req.on('end', () => {
        try {
          const { url } = JSON.parse(body);
          if (url && url.startsWith('/api/videos/')) {
            const file = url.split('/').pop();
            const filepath = path.join(process.cwd(), 'public', 'uploads', file);
            if (fs.existsSync(filepath)) {
              fs.unlinkSync(filepath);
            }
          }
          res.status(200).json({ success: true });
          resolve(null);
        } catch (e) {
          res.status(400).json({ error: 'Invalid body' });
          resolve(null);
        }
      });
    });
  }

  if (req.method === 'POST') {
    return new Promise((resolve) => {
      const ext = req.headers['x-file-ext'] || 'mp4';
      const newFilename = `video-${Date.now()}.${ext}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filepath = path.join(uploadDir, newFilename);
      const writeStream = fs.createWriteStream(filepath);

      req.pipe(writeStream);

      writeStream.on('finish', () => {
        res.status(200).json({ url: `/api/videos/${newFilename}` });
        resolve(null);
      });

      writeStream.on('error', (err) => {
        console.error('File write error:', err);
        res.status(500).json({ error: 'Failed to write file' });
        resolve(null);
      });

      req.on('error', (err) => {
        console.error('Request stream error:', err);
        res.status(500).json({ error: 'Failed to upload file' });
        resolve(null);
      });
    });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
