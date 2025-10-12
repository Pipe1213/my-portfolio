// Simple resume parser: extracts raw text + basic fields from public/resume.pdf
// Usage: npm run parse:resume

import fs from 'node:fs';
import path from 'node:path';
import pdfParse from 'pdf-parse';

const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf');
if (!fs.existsSync(pdfPath)) {
  console.error('Error: public/resume.pdf not found');
  process.exit(1);
}

const buf = fs.readFileSync(pdfPath);
const { text } = await pdfParse(buf);

function firstNonEmpty(lines) {
  for (const l of lines) {
    const s = l.trim();
    if (s) return s;
  }
  return '';
}

const lines = text.split(/\r?\n/);
const raw = text;

// Heuristics
const emailMatch = raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
const linkedInMatch = raw.match(/https?:\/\/(?:www\.)?linkedin\.com\/[\w\-\/]+/i);
const githubMatch = raw.match(/https?:\/\/(?:www\.)?github\.com\/[\w\-\/]+/i);
const phoneMatch = raw.match(/\+?\d[\d\s().-]{7,}/);

// Name: assume first non-empty line is name
const name = firstNonEmpty(lines);

// Sections: naive splits
function captureSection(label) {
  const idx = lines.findIndex((l) => l.toLowerCase().includes(label));
  if (idx === -1) return '';
  const nextHeader = lines.slice(idx + 1).findIndex((l) => /^(experience|education|publications|projects|skills|languages|contact)/i.test(l.trim()));
  const end = nextHeader === -1 ? lines.length : idx + 1 + nextHeader;
  return lines.slice(idx, end).join('\n');
}

const experienceBlock = captureSection('experience');
const educationBlock = captureSection('education');
const publicationsBlock = captureSection('publications');
const skillsBlock = captureSection('skills');
const languagesBlock = captureSection('languages');

const out = {
  name,
  email: emailMatch?.[0] || '',
  github: githubMatch?.[0] || '',
  linkedin: linkedInMatch?.[0] || '',
  phone: phoneMatch?.[0] || '',
  sections: {
    experience: experienceBlock,
    education: educationBlock,
    publications: publicationsBlock,
    skills: skillsBlock,
    languages: languagesBlock,
  },
};

const outPath = path.join(process.cwd(), 'scripts', 'parsed-resume.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');

console.log('Parsed resume summary written to', outPath);
console.log('\nQuick summary:');
console.log(JSON.stringify(out, null, 2));

