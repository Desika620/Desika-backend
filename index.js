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
    imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e-commerce-logo%2Conline-store-shop-logo%2Cbag-design-template-848d51dbceb92348109f7489de7759b7_screen.jpg?ts=1738531980"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing daily tasks",
    technologies: ["React", "Firebase"],
    imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e-commerce-logo%2Conline-store-shop-logo%2Cbag-design-template-848d51dbceb92348109f7489de7759b7_screen.jpg?ts=1738531980"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase projects",
    technologies: ["React", "CSS3"],
    imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e-commerce-logo%2Conline-store-shop-logo%2Cbag-design-template-848d51dbceb92348109f7489de7759b7_screen.jpg?ts=1738531980"
  },
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

// Landing page UI - PINK THEME
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to My Portfolio API</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #ff69b4, #ff1493);
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          padding: 20px;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 10px;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 30px;
        }

        .btn {
          background-color: #fff;
          color: #ff1493;
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn:hover {
          background-color: #ffe6f0;
        }

        footer {
          position: absolute;
          bottom: 20px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 2rem;
          }
          p {
            font-size: 1rem;
          }
        }
      </style>
    </head>
    <body>
      <h1>🎀 Portfolio API</h1>
      <p>Welcome to the pink-themed API for projects, blogs, and messages</p>
      <a class="btn" href="/api/projects">View Projects</a>

      <footer>&copy; ${new Date().getFullYear()} Bagus Adi Suratno</footer>
    </body>
    </html>
  `);
});

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

// Start server
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
