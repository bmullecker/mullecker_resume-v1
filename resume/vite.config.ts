import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-resume-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const versionsPath = path.resolve(__dirname, 'src/versions.json');

          // GET /api/versions — read versions store from disk
          if (req.method === 'GET' && req.url === '/api/versions') {
            try {
              if (fs.existsSync(versionsPath)) {
                const content = fs.readFileSync(versionsPath, 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(content);
              } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'versions.json not found' }));
              }
            } catch (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: String(error) }));
            }
            return;
          }

          // POST /api/versions — persist full versions store to disk
          if (req.method === 'POST' && req.url === '/api/versions') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const store = JSON.parse(body);
                fs.writeFileSync(versionsPath, JSON.stringify(store, null, 2), 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: String(error) }));
              }
            });
            return;
          }

          // POST /api/save-resume — write active version data back to data.ts
          if (req.method === 'POST' && req.url === '/api/save-resume') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'src/data.ts');
                const fileContent = `export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  date: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  major: string;
  school: string;
  year: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
}

export const resumeData: ResumeData = ${JSON.stringify(data, null, 2)};
`;
                fs.writeFileSync(filePath, fileContent, 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                console.error('Error saving resume data:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: String(error) }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
})
