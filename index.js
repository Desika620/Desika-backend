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
    imageUrl: "https://id.images.search.yahoo.com/images/view;_ylt=Awrx.avcHWVofmwbEnHNQwx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzU3NTQ1NDZlZmY1Mjg3NDBhMWU1NmQ5OGVkNDhlOGFiBGdwb3MDMwRpdANiaW5n?back=https%3A%2F%2Fid.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dlogo%2Becommerce%26ei%3DUTF-8%26type%3DE210ID91215G0%26fr%3Dmcafee%26fr2%3Dsa-gp-search%26tab%3Dorganic%26ri%3D3&w=980&h=980&imgurl=static.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F006%2F547%2F185%2Fnon_2x%2Fcreative-modern-abstract-ecommerce-logo-design-colorful-gradient-online-shopping-bag-logo-design-template-free-vector.jpg&rurl=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F6547185-creative-modern-abstract-ecommerce-logo-design-colorful-gradient-online-shopping-bag-logo-design-template&size=26KB&p=logo+ecommerce&oid=5754546eff528740a1e56d98ed48e8ab&fr2=sa-gp-search&fr=mcafee&tt=Creative+modern+abstract+ecommerce+logo+design%2C+colorful+gradient+...&b=0&ni=90&no=3&ts=&tab=organic&sigr=2JRen9v0WA0C&sigb=A93Xx.aapawm&sigi=UwjuGscbslbJ&sigt=liQLvT7xEGA6&.crumb=UhQLX666dcM&fr=mcafee&fr2=sa-gp-search&type=E210ID91215G0"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing daily tasks",
    technologies: ["React", "Firebase"],
    imageUrl: "https://id.images.search.yahoo.com/images/view;_ylt=Awrx.asQHmVoWawbwErNQwx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzIzNDE0ZTdiYmE0ZTA4NzhkODQxYzA3OWZkMzVmMmQzBGdwb3MDNARpdANiaW5n?back=https%3A%2F%2Fid.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dlogo%2Btask%2Bmanagement%26norw%3D1%26ei%3DUTF-8%26type%3DE210ID91215G0%26fr%3Dmcafee%26fr2%3Dsp-qrw-corr-top%26tab%3Dorganic%26ri%3D4&w=1600&h=1200&imgurl=cdn.dribbble.com%2Fusers%2F857299%2Fscreenshots%2F5279698%2Ftm-01_4x.jpg&rurl=https%3A%2F%2Fdribbble.com%2Fshots%2F5279698-Task-Manager-icon-logo-concept&size=68KB&p=logo+task+management&oid=23414e7bba4e0878d841c079fd35f2d3&fr2=sp-qrw-corr-top&fr=mcafee&tt=Task+Manager+icon%2Flogo+concept+by+Edi+Reifman+on+Dribbble&b=0&ni=90&no=4&ts=&tab=organic&norw=1&sigr=RJ9m7JFkO2xd&sigb=5B3zrW36ESqy&sigi=00Xt9kxib8Qr&sigt=gORRtSGfv.tn&.crumb=UhQLX666dcM&fr=mcafee&fr2=sp-qrw-corr-top&norw=1&type=E210ID91215G0"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase projects",
    technologies: ["React", "CSS3"],
    imageUrl: "https://id.images.search.yahoo.com/images/view;_ylt=Awrx.as.HmVo86EbhVTNQwx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzM0ZDdiNGIyYWUzZWJmNjIyMWFiN2NhOTNkNDU2ZjllBGdwb3MDNgRpdANiaW5n?back=https%3A%2F%2Fid.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dlogo%2Bportopolio%26ei%3DUTF-8%26type%3DE210ID91215G0%26fr%3Dmcafee%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26tab%3Dorganic%26ri%3D6&w=1920&h=1920&imgurl=static.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F020%2F816%2F485%2Foriginal%2Fportfolio-icon-for-your-website-mobile-presentation-and-logo-design-free-vector.jpg&rurl=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F20816485-portfolio-icon-for-your-website-mobile-presentation-and-logo-design&size=79KB&p=logo+portopolio&oid=34d7b4b2ae3ebf6221ab7ca93d456f9e&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=mcafee&tt=portfolio+icon+for+your+website%2C+mobile%2C+presentation%2C+and+logo+design+...&b=0&ni=90&no=6&ts=&tab=organic&sigr=N92OozGk0XQR&sigb=pEguYYiJBtmq&sigi=70WLtrWpfkl.&sigt=k5GCAHKOJJRR&.crumb=UhQLX666dcM&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&type=E210ID91215G0"
  },
  {
    id: 4,
    title: "Weather Application",
    description: "Real-time weather information using API",
    technologies: ["JavaScript", "API"],
    imageUrl: "https://id.images.search.yahoo.com/images/view;_ylt=Awr1QZzmGmVoTbQVjSfNQwx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzRlNTlkYTQ5ZWU4Y2U2NTE5MTM2MzNhOWViZmI5NDVhBGdwb3MDNARpdANiaW5n?back=https%3A%2F%2Fid.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dlogo%2BWeather%2BApplication%26ei%3DUTF-8%26type%3DE210ID91215G0%26fr%3Dmcafee%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26tab%3Dorganic%26ri%3D4&w=1024&h=1024&imgurl=i.pinimg.com%2Foriginals%2F06%2Fc4%2Ff7%2F06c4f70ec5931e2342e703e8a3f0a253.png&rurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F465700417716520918%2F&size=38KB&p=logo+Weather+Application&oid=4e59da49ee8ce651913633a9ebfb945a&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=mcafee&tt=Weather+App+Icon+%7C+Apple+weather+app%2C+App+store+icon%2C+Iphone+app+design&b=0&ni=90&no=4&ts=&tab=organic&sigr=1tQst4TnBIVy&sigb=aYWMzQ93s2_z&sigi=nVMusoU9GuYo&sigt=2xvBckAcDBh3&.crumb=UhQLX666dcM&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&type=E210ID91215G0"
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
