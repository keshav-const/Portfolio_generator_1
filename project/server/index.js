import express from 'express';
import cors from 'cors';
import archiver from 'archiver';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Template generators
const generateHTML = (portfolioData, template) => {
  const templateStyles = {
    minimalist: `
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
      .header { border-bottom: 1px solid #e5e7eb; padding: 64px 0; text-align: center; }
      .name { font-size: 3rem; font-weight: 300; margin-bottom: 16px; }
      .bio { font-size: 1.25rem; color: #6b7280; margin-bottom: 32px; }
      .social-links { display: flex; justify-content: center; gap: 24px; }
      .social-links a { color: #6b7280; transition: color 0.2s; }
      .social-links a:hover { color: #111827; }
      .section { padding: 64px 0; }
      .section h2 { font-size: 2rem; font-weight: 300; text-align: center; margin-bottom: 48px; }
      .skills { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-bottom: 48px; }
      .skill { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #f3f4f6; border-radius: 20px; }
      .skill img { width: 20px; height: 20px; }
      .experience { margin-bottom: 48px; }
      .experience h3 { font-size: 1.5rem; font-weight: 500; margin-bottom: 8px; }
      .experience .company { color: #6366f1; font-weight: 500; margin-bottom: 4px; }
      .experience .duration { color: #6b7280; font-size: 0.875rem; margin-bottom: 8px; }
      .achievement { margin-bottom: 48px; }
      .achievement h3 { font-size: 1.5rem; font-weight: 500; margin-bottom: 8px; }
      .achievement p { color: #6b7280; line-height: 1.7; }
      .project { border-bottom: 1px solid #f3f4f6; padding-bottom: 48px; margin-bottom: 48px; }
      .project:last-child { border-bottom: none; }
      .project h3 { font-size: 1.5rem; font-weight: 500; margin-bottom: 16px; }
      .project p { color: #6b7280; line-height: 1.7; margin-bottom: 16px; }
      .project-links { display: flex; gap: 16px; margin-bottom: 16px; }
      .project-links a { color: #6366f1; text-decoration: none; font-weight: 500; }
      .project-links a:hover { text-decoration: underline; }
      .technologies { display: flex; flex-wrap: wrap; gap: 8px; }
      .tech { background: #f3f4f6; color: #374151; padding: 4px 12px; border-radius: 20px; font-size: 0.875rem; }
    `,
    devfolio: `
      body { 
        font-family: 'Monaco', 'Menlo', monospace; 
        background: linear-gradient(135deg, #f0fdf4 0%, #ecfeff 100%);
        margin: 0;
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
      .header { padding: 80px 0; }
      .terminal { background: #1f2937; color: #10b981; padding: 24px; border-radius: 8px; font-family: monospace; margin-bottom: 32px; }
      .name { font-size: 3.5rem; font-weight: bold; margin-bottom: 16px; }
      .bio { font-size: 1.125rem; color: #6b7280; margin-bottom: 32px; }
      .buttons { display: flex; gap: 16px; flex-wrap: wrap; }
      .button { 
        display: inline-flex; 
        align-items: center; 
        gap: 8px; 
        padding: 12px 16px; 
        background: rgba(255,255,255,0.8); 
        border-radius: 8px; 
        text-decoration: none; 
        color: #374151;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.2s;
      }
      .button:hover { 
        background: white; 
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .section { padding: 80px 0; }
      .section h2 { font-size: 2.5rem; font-weight: bold; margin-bottom: 48px; }
      .skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 48px; }
      .skill { 
        display: flex; 
        align-items: center; 
        gap: 12px; 
        padding: 16px; 
        background: rgba(255,255,255,0.8); 
        border-radius: 12px; 
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .skill img { width: 24px; height: 24px; }
      .experience { 
        background: rgba(255,255,255,0.8); 
        padding: 24px; 
        border-radius: 12px; 
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        margin-bottom: 24px;
      }
      .achievement { 
        background: rgba(255,255,255,0.8); 
        padding: 24px; 
        border-radius: 12px; 
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        margin-bottom: 24px;
      }
      .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 32px; }
      .project-card { 
        background: rgba(255,255,255,0.8); 
        padding: 24px; 
        border-radius: 12px; 
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(8px);
      }
      .project-card h3 { font-size: 1.25rem; font-weight: bold; margin-bottom: 12px; }
      .project-card p { color: #6b7280; line-height: 1.6; margin-bottom: 16px; }
      .project-links { display: flex; gap: 16px; margin-bottom: 16px; }
      .project-links a { color: #6366f1; text-decoration: none; font-weight: 500; }
      .project-links a:hover { text-decoration: underline; }
      .technologies { display: flex; flex-wrap: wrap; gap: 8px; }
      .tech { 
        background: linear-gradient(to right, #dcfce7, #dbeafe); 
        color: #374151; 
        padding: 4px 12px; 
        border-radius: 6px; 
        font-size: 0.75rem; 
        font-weight: 500;
      }
    `,
    creative: `
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        background: linear-gradient(135deg, #fdf4ff 0%, #fef7ed 100%);
        margin: 0;
        overflow-x: hidden;
      }
      .bg-decorations {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
      }
      .decoration-1 { 
        position: absolute; 
        top: 80px; 
        left: 80px; 
        width: 300px; 
        height: 300px; 
        background: rgba(168, 85, 247, 0.2); 
        border-radius: 50%; 
        filter: blur(60px);
      }
      .decoration-2 { 
        position: absolute; 
        bottom: 80px; 
        right: 80px; 
        width: 400px; 
        height: 400px; 
        background: rgba(236, 72, 153, 0.2); 
        border-radius: 50%; 
        filter: blur(60px);
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
      .header { padding: 80px 0 64px; text-align: center; }
      .name { 
        font-size: 4rem; 
        font-weight: bold; 
        margin-bottom: 24px; 
        background: linear-gradient(to right, #7c3aed, #ec4899, #f97316);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .bio { font-size: 1.25rem; color: #374151; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto; }
      .buttons { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
      .button { 
        display: inline-flex; 
        align-items: center; 
        gap: 8px; 
        padding: 16px 24px; 
        background: rgba(255,255,255,0.7); 
        backdrop-filter: blur(12px);
        border-radius: 50px; 
        text-decoration: none; 
        color: #374151;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        border: 1px solid rgba(255,255,255,0.2);
      }
      .button:hover { 
        transform: translateY(-2px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      }
      .section { padding: 80px 0; }
      .section h2 { 
        font-size: 3rem; 
        font-weight: bold; 
        margin-bottom: 64px; 
        background: linear-gradient(to right, #7c3aed, #ec4899);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 64px; }
      .skill { 
        display: flex; 
        align-items: center; 
        gap: 12px; 
        padding: 20px; 
        background: rgba(255,255,255,0.8); 
        backdrop-filter: blur(12px);
        border-radius: 24px; 
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
        transition: all 0.3s;
      }
      .skill:hover {
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
      }
      .skill img { width: 28px; height: 28px; }
      .experience { 
        background: rgba(255,255,255,0.8); 
        backdrop-filter: blur(12px);
        padding: 32px; 
        border-radius: 24px; 
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
        margin-bottom: 32px;
        transition: all 0.3s;
      }
      .experience:hover {
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
      }
      .achievement { 
        background: rgba(255,255,255,0.8); 
        backdrop-filter: blur(12px);
        padding: 32px; 
        border-radius: 24px; 
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
        margin-bottom: 32px;
        transition: all 0.3s;
      }
      .achievement:hover {
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
      }
      .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 32px; }
      .project-card { 
        background: rgba(255,255,255,0.8); 
        backdrop-filter: blur(12px);
        padding: 32px; 
        border-radius: 24px; 
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
        transition: all 0.3s;
      }
      .project-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
      }
      .project-card h3 { font-size: 1.5rem; font-weight: bold; margin-bottom: 16px; }
      .project-card p { color: #6b7280; line-height: 1.7; margin-bottom: 24px; }
      .project-links { display: flex; gap: 16px; margin-bottom: 16px; }
      .project-links a { color: #7c3aed; text-decoration: none; font-weight: 500; }
      .project-links a:hover { text-decoration: underline; }
      .technologies { display: flex; flex-wrap: wrap; gap: 8px; }
      .tech { 
        padding: 6px 16px; 
        border-radius: 50px; 
        font-size: 0.875rem; 
        font-weight: 500;
      }
      .tech:nth-child(3n+1) { background: #f3e8ff; color: #7c3aed; }
      .tech:nth-child(3n+2) { background: #fce7f3; color: #ec4899; }
      .tech:nth-child(3n+3) { background: #fed7aa; color: #ea580c; }
    `,
    darkmode: `
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        background: #111827;
        color: white;
        margin: 0;
      }
      .grid-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        background-image: 
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 20px 20px;
        pointer-events: none;
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
      .header { padding: 80px 0 64px; }
      .name { font-size: 4rem; font-weight: bold; margin-bottom: 24px; }
      .cursor { color: #10b981; }
      .bio { font-size: 1.25rem; color: #d1d5db; margin-bottom: 32px; max-width: 700px; }
      .buttons { display: flex; gap: 16px; flex-wrap: wrap; }
      .button { 
        display: inline-flex; 
        align-items: center; 
        gap: 8px; 
        padding: 12px 24px; 
        background: #1f2937; 
        border: 1px solid #374151;
        border-radius: 8px; 
        text-decoration: none; 
        color: white;
        transition: all 0.3s;
      }
      .button:hover { 
        border-color: #10b981;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
      }
      .section { padding: 64px 0; }
      .section h2 { font-size: 2.5rem; font-weight: bold; margin-bottom: 48px; }
      .skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 48px; }
      .skill { 
        display: flex; 
        align-items: center; 
        gap: 12px; 
        padding: 16px; 
        background: rgba(31, 41, 55, 0.8); 
        backdrop-filter: blur(8px);
        border: 1px solid #374151;
        border-radius: 12px; 
        transition: all 0.3s;
      }
      .skill:hover {
        border-color: #6b7280;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      .skill img { width: 24px; height: 24px; }
      .experience { 
        background: rgba(31, 41, 55, 0.8); 
        backdrop-filter: blur(8px);
        border: 1px solid #374151;
        padding: 24px; 
        border-radius: 12px; 
        margin-bottom: 24px;
        transition: all 0.3s;
      }
      .experience:hover {
        border-color: #6b7280;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      .achievement { 
        background: rgba(31, 41, 55, 0.8); 
        backdrop-filter: blur(8px);
        border: 1px solid #374151;
        padding: 24px; 
        border-radius: 12px; 
        margin-bottom: 24px;
        transition: all 0.3s;
      }
      .achievement:hover {
        border-color: #6b7280;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 32px; }
      .project-card { 
        background: rgba(31, 41, 55, 0.8); 
        backdrop-filter: blur(8px);
        border: 1px solid #374151;
        padding: 24px; 
        border-radius: 12px; 
        transition: all 0.3s;
      }
      .project-card:hover {
        border-color: #6b7280;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      .project-card h3 { font-size: 1.25rem; font-weight: bold; margin-bottom: 12px; color: #10b981; }
      .project-card p { color: #d1d5db; line-height: 1.6; margin-bottom: 16px; }
      .project-links { display: flex; gap: 16px; margin-bottom: 16px; }
      .project-links a { color: #10b981; text-decoration: none; font-weight: 500; }
      .project-links a:hover { text-decoration: underline; }
      .technologies { display: flex; flex-wrap: wrap; gap: 8px; }
      .tech { 
        padding: 4px 12px; 
        border-radius: 50px; 
        font-size: 0.75rem; 
        font-weight: 500;
        border: 1px solid;
      }
      .tech:nth-child(3n+1) { background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); color: #10b981; }
      .tech:nth-child(3n+2) { background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.2); color: #3b82f6; }
      .tech:nth-child(3n+3) { background: rgba(168, 85, 247, 0.1); border-color: rgba(168, 85, 247, 0.2); color: #a855f7; }
    `,
    modern: `
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        background: linear-gradient(135deg, #ecfeff 0%, #dbeafe 50%, #e0e7ff 100%);
        margin: 0;
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
      .header { padding: 80px 0; }
      .header-card { 
        background: rgba(255,255,255,0.7); 
        backdrop-filter: blur(12px);
        border-radius: 24px; 
        padding: 48px; 
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
      }
      .name { 
        font-size: 4rem; 
        font-weight: bold; 
        margin-bottom: 24px; 
        background: linear-gradient(to right, #0891b2, #3b82f6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .bio { font-size: 1.25rem; color: #6b7280; margin-bottom: 32px; line-height: 1.7; }
      .buttons { display: flex; gap: 16px; flex-wrap: wrap; }
      .button { 
        display: inline-flex; 
        align-items: center; 
        gap: 8px; 
        padding: 12px 24px; 
        border-radius: 12px; 
        text-decoration: none; 
        font-weight: 500;
        transition: all 0.3s;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      }
      .button-primary { 
        background: linear-gradient(to right, #06b6d4, #3b82f6);
        color: white;
      }
      .button-secondary { 
        background: rgba(255,255,255,0.5); 
        backdrop-filter: blur(8px);
        color: #374151;
        border: 1px solid rgba(255,255,255,0.3);
      }
      .button:hover { 
        transform: scale(1.05);
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
      }
      .section { padding: 80px 0; }
      .section h2 { 
        font-size: 3rem; 
        font-weight: bold; 
        text-align: center; 
        margin-bottom: 16px;
        background: linear-gradient(to right, #0891b2, #3b82f6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .section p { text-align: center; font-size: 1.25rem; color: #6b7280; margin-bottom: 64px; }
      .skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 64px; }
      .skill { 
        display: flex; 
        align-items: center; 
        gap: 16px; 
        padding: 24px; 
        background: rgba(255,255,255,0.7); 
        backdrop-filter: blur(12px);
        border-radius: 16px; 
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
        transition: all 0.3s;
      }
      .skill:hover {
        transform: scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      }
      .skill img { width: 32px; height: 32px; }
      .experience { 
        background: rgba(255,255,255,0.7); 
        backdrop-filter: blur(12px);
        border-radius: 16px; 
        padding: 32px; 
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
        margin-bottom: 32px;
        transition: all 0.3s;
      }
      .experience:hover {
        transform: scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      }
      .achievement { 
        background: rgba(255,255,255,0.7); 
        backdrop-filter: blur(12px);
        border-radius: 16px; 
        padding: 32px; 
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
        margin-bottom: 32px;
        transition: all 0.3s;
      }
      .achievement:hover {
        transform: scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      }
      .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 32px; }
      .project-card { 
        background: rgba(255,255,255,0.7); 
        backdrop-filter: blur(12px);
        border-radius: 16px; 
        padding: 32px; 
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255,255,255,0.2);
        transition: all 0.3s;
      }
      .project-card:hover {
        transform: scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      }
      .project-card h3 { font-size: 1.5rem; font-weight: bold; margin-bottom: 8px; color: #0891b2; }
      .project-card p { color: #6b7280; line-height: 1.6; margin-bottom: 24px; }
      .project-links { display: flex; gap: 16px; margin-bottom: 16px; }
      .project-links a { color: #0891b2; text-decoration: none; font-weight: 500; }
      .project-links a:hover { text-decoration: underline; }
      .technologies { display: flex; flex-wrap: wrap; gap: 8px; }
      .tech { 
        padding: 8px 16px; 
        border-radius: 12px; 
        font-size: 0.875rem; 
        font-weight: 500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }
      .tech:nth-child(3n+1) { background: linear-gradient(to right, #cffafe, #a5f3fc); color: #0891b2; }
      .tech:nth-child(3n+2) { background: linear-gradient(to right, #dbeafe, #bfdbfe); color: #3b82f6; }
      .tech:nth-child(3n+3) { background: linear-gradient(to right, #e0e7ff, #c7d2fe); color: #6366f1; }
    `
  };

  const socialIcons = {
    email: '✉️',
    phone: '📞',
    github: '🔗',
    linkedin: '💼',
    twitter: '🐦',
    instagram: '📷'
  };

  // Skill icons mapping
  const skillIcons = {
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    'Sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
    'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Adobe XD': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
  };

  const getSkillIcon = (skillName) => {
    return skillIcons[skillName.trim()] || null;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.personal.name || 'Portfolio'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        a { text-decoration: none; }
        ${templateStyles[template] || templateStyles.minimalist}
    </style>
</head>
<body>
    ${template === 'creative' ? `
    <div class="bg-decorations">
        <div class="decoration-1"></div>
        <div class="decoration-2"></div>
    </div>
    ` : ''}
    
    ${template === 'darkmode' ? '<div class="grid-bg"></div>' : ''}
    
    <div class="container">
        <header class="header">
            ${template === 'modern' ? '<div class="header-card">' : ''}
            
            ${template === 'devfolio' ? `
            <div class="terminal">
                <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                    <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%;"></div>
                    <div style="width: 12px; height: 12px; background: #eab308; border-radius: 50%;"></div>
                    <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></div>
                </div>
                <div><span style="color: #3b82f6;">const</span> <span style="color: #eab308;">developer</span> = {</div>
                <div style="margin-left: 16px;">name: <span style="color: #f97316;">"${portfolioData.personal.name || 'Your Name'}"</span>,</div>
                <div style="margin-left: 16px;">bio: <span style="color: #f97316;">"${portfolioData.personal.bio || 'Your bio here...'}"</span></div>
                <div>}</div>
            </div>
            ` : ''}
            
            <h1 class="name">
                ${portfolioData.personal.name || 'Your Name'}
                ${template === 'darkmode' ? '<span class="cursor">_</span>' : ''}
            </h1>
            <p class="bio">${portfolioData.personal.bio || 'Your professional bio will appear here...'}</p>
            
            <div class="buttons">
                ${portfolioData.contact.email ? `
                <a href="mailto:${portfolioData.contact.email}" class="button ${template === 'modern' ? 'button-primary' : ''}">
                    ${socialIcons.email} ${template === 'modern' ? "Let's Connect" : 'Email'}
                </a>
                ` : ''}
                
                ${portfolioData.personal.github ? `
                <a href="${portfolioData.personal.github}" target="_blank" class="button ${template === 'modern' ? 'button-secondary' : ''}">
                    ${socialIcons.github} GitHub
                </a>
                ` : ''}
                
                ${portfolioData.social.linkedin ? `
                <a href="${portfolioData.social.linkedin}" target="_blank" class="button ${template === 'modern' ? 'button-secondary' : ''}">
                    ${socialIcons.linkedin} LinkedIn
                </a>
                ` : ''}
                
                ${portfolioData.resume ? `
                <a href="./resume.pdf" download class="button ${template === 'modern' ? 'button-secondary' : ''}">
                    📄 Resume
                </a>
                ` : ''}
            </div>
            
            ${template === 'modern' ? '</div>' : ''}
        </header>

        ${portfolioData.skills && portfolioData.skills.length > 0 ? `
        <section class="section">
            <h2>Skills & Expertise</h2>
            ${template === 'modern' ? '<p>Technologies and tools I work with</p>' : ''}
            <div class="skills">
                ${portfolioData.skills.map(skill => `
                <div class="skill">
                    ${getSkillIcon(skill.name) ? `<img src="${getSkillIcon(skill.name)}" alt="${skill.name}" />` : ''}
                    <div>
                        <div style="font-weight: 600;">${skill.name}</div>
                    </div>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${portfolioData.experience && portfolioData.experience.length > 0 ? `
        <section class="section">
            <h2>Work Experience</h2>
            ${template === 'modern' ? '<p>My professional journey and achievements</p>' : ''}
            ${portfolioData.experience.map(exp => `
            <div class="experience">
                <h3>${exp.position}</h3>
                <div class="company">${exp.company}</div>
                <div class="duration">${exp.duration}${exp.location ? ` • ${exp.location}` : ''}</div>
                <p style="margin-top: 12px; line-height: 1.6;">${exp.description}</p>
            </div>
            `).join('')}
        </section>
        ` : ''}

        ${portfolioData.achievements && portfolioData.achievements.length > 0 ? `
        <section class="section">
            <h2>Achievements</h2>
            ${template === 'modern' ? '<p>Recognition and accomplishments</p>' : ''}
            ${portfolioData.achievements.map(achievement => `
            <div class="achievement">
                <h3>${achievement.title}</h3>
                <p style="margin-top: 12px; line-height: 1.6;">${achievement.description}</p>
            </div>
            `).join('')}
        </section>
        ` : ''}

        <section class="section">
            <h2>${template === 'minimalist' ? 'Selected Work' : template === 'creative' ? 'Featured Work' : template === 'modern' ? 'Featured Projects' : 'Projects'}</h2>
            ${template === 'modern' ? '<p>Explore my latest work and creative solutions</p>' : ''}
            
            <div class="${template === 'devfolio' || template === 'creative' || template === 'darkmode' || template === 'modern' ? 'project-grid' : ''}">
                ${portfolioData.projects && portfolioData.projects.length > 0 ? portfolioData.projects.map(project => `
                <div class="${template === 'devfolio' || template === 'creative' || template === 'darkmode' || template === 'modern' ? 'project-card' : 'project'}">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.repo}" target="_blank">🔗 GitHub</a>
                        ${project.demo ? `<a href="${project.demo}" target="_blank">🌐 Live Demo</a>` : ''}
                    </div>
                    <div class="technologies">
                        ${(project.technologies || []).map(tech => `<span class="tech">${tech}</span>`).join('')}
                    </div>
                </div>
                `).join('') : `
                <div style="text-align: center; color: #6b7280; padding: 64px 0;">
                    <p>Your projects will appear here...</p>
                </div>
                `}
            </div>
        </section>
    </div>
</body>
</html>
  `;
};

// API Routes
app.post('/api/preview', (req, res) => {
  try {
    const { portfolioData, template } = req.body;
    const html = generateHTML(portfolioData, template);
    res.json({ html });
  } catch (error) {
    console.error('Preview generation error:', error);
    res.status(500).json({ error: 'Failed to generate preview' });
  }
});

app.post('/api/download', upload.single('resume'), (req, res) => {
  try {
    const portfolioData = JSON.parse(req.body.portfolioData);
    const template = req.body.template;
    
    if (!portfolioData || !portfolioData.personal || !portfolioData.personal.name || !portfolioData.contact || !portfolioData.contact.email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const html = generateHTML(portfolioData, template);
    const filename = `${portfolioData.personal.name.replace(/\s+/g, '_')}_Portfolio.zip`;

    // Set headers before creating archive
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache');

    const archive = archiver('zip', { 
      zlib: { level: 9 },
      forceLocalTime: true
    });
    
    // Handle archive errors
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to create archive' });
      }
    });

    // Handle archive warnings
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Archive warning:', err);
      } else {
        console.error('Archive error:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Archive creation failed' });
        }
      }
    });

    // Pipe archive data to response
    archive.pipe(res);

    // Add HTML file
    archive.append(html, { name: 'index.html' });

    // Add resume if provided
    if (req.file) {
      archive.append(req.file.buffer, { name: 'resume.pdf' });
    }

    // Add README
    const readme = `# ${portfolioData.personal.name}'s Portfolio

This portfolio was generated using the Portfolio Generator.

## Files Included:
- index.html - Your complete portfolio website
${req.file ? '- resume.pdf - Your resume file' : ''}
- README.md - This file

## How to Use:
1. Open index.html in any web browser to view your portfolio
2. Upload the files to any web hosting service to make it live
3. Customize the HTML/CSS as needed

## Template: ${template}

Generated on: ${new Date().toLocaleDateString()}

## Sections Included:
- Personal Information
- Contact Details
- Social Media Links
${portfolioData.skills && portfolioData.skills.length > 0 ? '- Skills & Expertise' : ''}
${portfolioData.experience && portfolioData.experience.length > 0 ? '- Work Experience' : ''}
${portfolioData.achievements && portfolioData.achievements.length > 0 ? '- Achievements' : ''}
${req.file ? '- Resume Download' : ''}
- Projects Portfolio

Enjoy your new portfolio!
`;

    archive.append(readme, { name: 'README.md' });
    
    // Finalize the archive
    archive.finalize();

  } catch (error) {
    console.error('Download error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate download' });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});