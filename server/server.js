const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 5500;
const PASSWORD = "securepassword"; // Replace with your desired password

// Connect to SQLite database
console.log(__dirname) //shows where this file is located, useful for debugging
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Serve static files (HTML, CSS, JS) from the project directory
app.use(express.static(path.join(__dirname, '../public')));

// Middleware to parse JSON request bodies
app.use(express.json());

// Add GET route for "/" to serve the main.html file. This is what causes the main page to load when you visit the root URL.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'main', 'main.html'));
});

// Get News data
app.get('/api/news', (req, res) => {
  db.all("SELECT * FROM News ORDER by DATE desc", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error retrieving news data" });
      return;
    }
    res.json(rows);
  });
});

// Get Teaching data
app.get('/api/teaching', (req, res) => {
  db.all("SELECT * FROM Teaching", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error retrieving teaching data" });
      return;
    }
    res.json(rows);
  });
});

// Get Students data, on the frontend this is called "Members"
app.get('/api/members', (req, res) => {
  db.all("SELECT * FROM Members", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error retrieving students data" });
      return;
    }
    res.json(rows);
  });
});

// Get Projects data
app.get('/api/projects', (req, res) => {
  db.all("SELECT * FROM Projects", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error retrieving projects data" });
      return;
    }
    res.json(rows);
  });
});

// Get Papers data, on the frontend this is called "Publications"
app.get('/api/publications', (req, res) => {
  db.all("SELECT * FROM Publications", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error retrieving papers data" });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/research', (req, res) => {
  db.all("SELECT * FROM Research", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error retrieving research data" });
      return;
    }
    res.json(rows);
  });
});

// Endpoint to add a new row to a table
app.post('/api/add/:table', (req, res) => {
  const table = req.params.table;
  const { password, ...data } = req.body;

  // Check if the password is correct
  if (password !== PASSWORD) {
    return res.status(403).json({ error: 'Invalid password' });
  }

  // Dynamically construct query based on table and data
  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

  db.run(query, values, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    res.json({ success: true, id: this.lastID });
  });
});

// Endpoint to add a new page
app.post('/api/pages', (req, res) => {
  const { title, header1, paragraph1, header2, paragraph2 } = req.body;
  
  // Validate input
  if (!title || !header1 || !paragraph1) {
      return res.status(400).json({ error: 'Title and 1st header and paragraph are required' });
  }
  
  // Insert new page into database
  const sql = `INSERT INTO Pages (title, header1, paragraph1, header2, paragraph2) 
              VALUES (?, ?, ?, ?, ?)`;
  
  db.run(sql, [title, header1, paragraph1, header2, paragraph2], function(err) {
      if (err) {
          console.log('Error inserting page', err.message);
          return res.status(500).json({ error: 'Failed to save page' });
      }
      
      console.log(`A new page has been added with ID: ${this.lastID}`);
      res.status(201).json({ 
          id: this.lastID,
          message: 'Page saved successfully' 
      });
  });
});

// Get a specific page by ID
app.get('/api/pages/:id', (req, res) => {
  const pageId = req.params.id;
  
  db.get("SELECT * FROM Pages WHERE id = ?", [pageId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error retrieving page data" });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: "Page not found" });
      return;
    }
    
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});