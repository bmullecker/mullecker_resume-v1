import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req: any, res: any) {
    // Path to your JSON file
    const filePath = path.join(process.cwd(), 'versions.json');

    if (req.method === 'POST') {
        try {
            await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Write failed' });
        }
    }

    if (req.method === 'GET') {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return res.status(200).json(JSON.parse(data));
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Read failed' });
        }
    }
}