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
    imageUrl: "https://via.placeholder.com/600x400?text=E-commerce"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing daily tasks",
    technologies: ["React", "Firebase"],
    imageUrl: "https://via.placeholder.com/600x400?text=Task+App"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase projects",
    technologies: ["React", "CSS3"],
    imageUrl: "https://via.placeholder.com/600x400?text=Portfolio"
  },
  {
    id: 4,
    title: "Weather Application",
    description: "Real-time weather information using API",
    technologies: ["JavaScript", "API"],
    imageUrl: "https://via.placeholder.com/600x400?text=Weather+App"
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
// Projects
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

// Contact messages
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

// Blog posts
app.get('/api/blog', (req, res) => {
  res.json(blogPosts);
});

app.get('/api/blog/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
