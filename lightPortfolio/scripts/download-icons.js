const fs = require('fs');
const https = require('https');
const path = require('path');

const icons = {
  typescript: "typescript",
  javascript: "javascript",
  java: "java",
  python: "python",
  react: "react",
  nodejs: "nodedotjs",
  express: "express",
  django: "django",
  tailwind: "tailwindcss",
  mongodb: "mongodb",
  postgresql: "postgresql",
  aws: "amazonaws",
  docker: "docker",
  jenkins: "jenkins",
  github: "github",
  ghactions: "githubactions"
};

const dir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

Object.entries(icons).forEach(([key, name]) => {
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${name}.svg`;
  const dest = path.join(dir, `${key}.svg`);
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      console.log(`Downloaded ${key}.svg`);
    } else {
      console.error(`Failed to download ${key}: ${response.statusCode}`);
    }
  }).on('error', err => {
    console.error(`Error downloading ${key}:`, err.message);
  });
});
