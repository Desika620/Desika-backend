require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Sample database
let projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "A full-featured online store with cart functionality",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://tse3.mm.bing.net/th/id/OIP.w3fNsfpDq26WBH9l2zL1ZAHaHa?pid=Api&P=0&h=180"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing daily tasks",
    technologies: ["React", "Firebase"],
    imageUrl: "https://tse4.mm.bing.net/th/id/OIP.MAleQeDj2W5A7kkxCfLMjgHaFj?pid=Api&P=0&h=180"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase projects",
    technologies: ["React", "CSS3"],
    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.eHJ-agNInvo1qbbre79A4AHaHa?pid=Api&P=0&h=180"
  },
  {
    id: 4,
    title: "Weather Application",
    description: "Real-time weather information using API",
    technologies: ["JavaScript", "API"],
    imageUrl: "https://tse1.mm.bing.net/th/id/OIP.71Ch7CNcUpV81k8giE22cwHaHa?pid=Api&P=0&h=180"
  }
];

let messages = [];
let blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    date: "May 15, 2025",
    excerpt: "Learn how to use React Hooks to simplify your functional components.",
    content: "Full article content would go here...",
    category: "React"
  },
  {
    id: 2,
    title: "Building REST APIs with Express.js",
    date: "April 28, 2025",
    excerpt: "A comprehensive guide to creating RESTful APIs using Express.js.",
    content: "Full article content would go here...",
    category: "Node.js"
  }
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

app.post('/api/projects', (req, res) => {
  const project = {
    id: projects.length + 1,
    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies,
    imageUrl: req.body.imageUrl || "https://via.placeholder.com/600x400"
  };
  projects.push(project);
  res.status(201).json(project);
});

app.put('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ message: 'Project not found' });

  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;
  project.technologies = req.body.technologies || project.technologies;
  project.imageUrl = req.body.imageUrl || project.imageUrl;

  res.json(project);
});

app.delete('/api/projects/:id', (req, res) => {
  const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (projectIndex === -1) return res.status(404).json({ message: 'Project not found' });

  projects = projects.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'Project deleted' });
});

// Contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    date: new Date().toISOString()
  };

  messages.push(newMessage);
  res.status(201).json({ message: 'Thank you for your message!', data: newMessage });
});

// Blog
app.get('/api/blog', (req, res) => {
  res.json(blogPosts);
});

app.get('/api/blog/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// Default UI Route
app.get('/', (req, res) => {
  const projectCards = projects.map(project => `
    <div class="card">
      <img src="${project.imageUrl}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p><strong>Tech:</strong> ${project.technologies.join(', ')}</p>
    </div>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Projects</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f4f4f4;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        .btn-container {
          text-align: center;
          margin: 20px 0;
        }
        .btn {
          background-color: #007BFF;
          color: white;
          padding: 10px 20px;
          margin: 5px;
          border: none;
          border-radius: 5px;
          text-decoration: none;
          display: inline-block;
        }
        .btn:hover {
          background-color: #0056b3;
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          width: 300px;
        }
        .card img {
          width: 100%;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <h1>Project Portfolio</h1>

      <div class="btn-container">
        <a href="/api/projects" class="btn">📁 Lihat API Projects</a>
        <a href="/api/blog" class="btn">📰 Lihat API Blog</a>
        <a href="/api/contact" class="btn" onclick="alert('Gunakan POST request di Postman untuk kirim kontak!'); return false;">📧 API Contact</a>
      </div>

      <div class="container">
        ${projectCards}
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
