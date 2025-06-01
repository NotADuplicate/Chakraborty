const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database (will create database.db if it doesn't exist)
const dbPath = path.resolve(__dirname, './server/database.db');
console.log("Running setup")
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create and populate tables
db.serialize(() => {
  // Create table for News
  db.run(`CREATE TABLE IF NOT EXISTS News (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    hyperlink TEXT,
    content TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    image TEXT
  )`);
  
  // Create table for Teaching
  db.run(`CREATE TABLE IF NOT EXISTS Teaching (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course TEXT NOT NULL,
    description TEXT,
    semester TEXT NOT NULL, 
    hyperlink TEXT
  )`);

  // Create table for Members
  db.run(`CREATE TABLE IF NOT EXISTS Members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    picture TEXT,
    hyperlink TEXT
  )`);

  // Create table for Projects
  db.run(`CREATE TABLE IF NOT EXISTS Projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proj TEXT NOT NULL,
    description TEXT,
    hyperlink TEXT
  )`);

  // Create table for Research*/
  db.run(`CREATE TABLE IF NOT EXISTS Research (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    hyperlink TEXT,
    content TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    image TEXT
  )`);
    
  db.run(`CREATE TABLE IF NOT EXISTS Publications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    hyperlink TEXT,
    content TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS Pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      header1 TEXT,
      paragraph1 TEXT NOT NULL,
      header2 TEXT,
      paragraph2 TEXT
    )`);

    dummyData();
});


function dummyData() {
    db.run(`INSERT INTO Publications (title,hyperlink, content) VALUES 
      ("Autonomy-driven Emerging Directions in Software-defined Vehicles", NULL, "Unmesh Bordoloi, Samarjit Chakraborty, Markus Jochim, Prachi Joshi, Arvind Raghuraman, and S. Ramesh. Design, Automation and Test in Europe"),
      ("Safety-Aware Implementation of Control Tasks via Scheduling with Period Boosting and Compressing", "https://www.cs.unc.edu/%7Esamarjit/papers/RTCSA2023.pdf", "Shengjie Xu, Bineet Ghosh, Clara Hobbs, P.S. Thiagarajan, Prachi Joshi, and Samarjit Chakraborty. 29th IEEE International Conference on Embedded and Real-Time Computing Systems and Applications (RTCSA)")
      `);

        db.run(`INSERT INTO Research (title,hyperlink, content, image) VALUES 
    ("Autonomy-driven Emerging Directions in Software-defined Vehicles", NULL, "Unmesh Bordoloi, Samarjit Chakraborty, Markus Jochim, Prachi Joshi, Arvind Raghuraman, and S. Ramesh. Design, Automation and Test in Europe", 'https://cdn-icons-png.freepik.com/512/5531/5531967.png'),
    ("Safety-Aware Implementation of Control Tasks via Scheduling with Period Boosting and Compressing", "https://www.cs.unc.edu/%7Esamarjit/papers/RTCSA2023.pdf", "Shengjie Xu, Bineet Ghosh, Clara Hobbs, P.S. Thiagarajan, Prachi Joshi, and Samarjit Chakraborty. 29th IEEE International Conference on Embedded and Real-Time Computing Systems and Applications (RTCSA)", 'https://cdn-icons-png.freepik.com/512/5531/5531967.png')
    `);

      db.run(`INSERT INTO Projects (proj, description, hyperlink) VALUES 
    ('Automotive Cyber-Physical Systems', "Funded by NSF, ongoing", "https://tarheels.live/designautocps/"),
    ('Timing Analysis for Service-Oriented Communication Architectures', "General Motors research contract (ongoing)", NULL)`);

      db.run(`INSERT INTO Members (name, description, picture, hyperlink) VALUES 
    ('Clara Hobbs', '(co-supervised with Jim Anderson)', 'https://wpvip.edutopia.org/wp-content/uploads/2022/10/shutterstock_1958383675-crop.jpg', "google.com"),
    ('Bob', NULL, 'https://i0.wp.com/rollercoasteryears.com/wp-content/uploads/Thrive-During-Finals-.jpg?fit=1000%2C667&ssl=1', NULL)`);

      db.run(`INSERT INTO Teaching (course, semester, hyperlink, description) VALUES 
    ('Class 1',  "Fall 2023", "https://tarheels.live/pips/", "Physical Intelligent Systems"),
    ('Class 2',  "Fall 2023", NULL, NULL),
    ('Class 3',  "Fall 2023", NULL, NULL)`);

      db.run(`INSERT INTO News (title, content, hyperlink, image) VALUES 
    ('Research Panel at DAC', 'Achieving Verifiable Autonomy: Is Design Automation the Golden Key?', 'https://60dac.conference-program.com/presentation/?id=PANEL106&sess=sess216', 'https://www.cs.unc.edu/~cpk/data/thumbnails/1cm-metalens.PNG'),
    ('Enrico Fraccaroli joins us as a Postdoctoral Researcher from the University of Verona', NULL, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7twygTQ7hjg6zYb0FW_t6EJf4LJ8wpObgA&s'),
    ('Shengjie Xu and Sharmin Aktar start their PhD', NULL, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6oKywSiJlGRMjzdYD-MXGItNrBQm45O2Iw&s')`);
}

// Close the database connection
db.close((err) => {
  if (err) {
    console.error("Error closing database:", err.message);
  } else {
    console.log("Database setup complete.");
  }
});