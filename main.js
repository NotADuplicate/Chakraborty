/******************************************************
 * Rendering Functions
 ******************************************************/

/** Fetches and renders the News tab content */
async function renderNews() {
  const response = await fetch('/api/news');
  if (!response.ok) {
    console.error('Failed to fetch news data:', response.statusText);
    return '<p>Error loading news data.</p>';
  }
  const news = await response.json();
  let html = `<h2>News</h2><ul>`;
  console.log(news)
  news.forEach(item => {
    html += `<li>`;
    if (item.hyperlink) {
      html += ` - <a href="${item.hyperlink}" target="_blank"><strong>${item.title}</strong></a>`;
    }
    else {
      html += `<strong>${item.title}</strong>`;
    }
    if (item.date) {
      const dateObj = new Date(item.date);
      const options = { month: 'long', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      html += ` <em>(${formattedDate})</em>`;
    }
    if(item.content) {
      html += `<br> ${item.content}`;
    }

    html += `</li>`;
  });
  html += `</ul>`;
  return html;
}

/** Fetches and renders the Teaching tab content */
async function renderTeaching() {
  const response = await fetch('/api/teaching');
  if (!response.ok) {
    console.error('Failed to fetch teaching data:', response.statusText);
    return '<p>Error loading teaching data.</p>';
  }
  const courses = await response.json();
  let html = `<h2>Teaching</h2><ul>`;
  console.log("Courses:", courses)
  courses.forEach(course => {
    html += `<li>`;
    if (course.hyperlink) {
      html += ` - <a href="${course.hyperlink}" target="_blank">${course.course}</a>`;
    } else {
      html += `${course.course}`;
    }
    if (course.semester) {
      html += ` (${course.semester})`;
    }
    if(course.description) {
      html += `<br> ${course.description}`;
    }
    html += `</li>`;
  });
  html += `</ul>`;
  return html;
}

/** Fetches and renders the Students tab content */
async function renderStudents() {
  const response = await fetch('/api/students');
  if (!response.ok) {
    console.error('Failed to fetch students data:', response.statusText);
    return '<p>Error loading students data.</p>';
  }
  const students = await response.json();
  let html = `<h2>Students</h2>`;
  students.forEach(student => {
    html += `<div style="margin-bottom:20px;">`;
    if (student.picture) {
      html += `<img src="${student.picture}" alt="${student.name}" style="vertical-align:middle;width:60px;height:60px;border-radius:50%;margin-right:10px;">`;
    }
    if(student.hyperlink) {
      html += `<a href="${student.hyperlink}" target="_blank">${student.name}</a>`;
    } else {
      html += `<strong>${student.name}</strong>`;
    }
    if (student.description) {
      html += ` <br> ${student.description}`;
    }
    html += `</div>`;
  });
  return html;
}

/** Fetches and renders the Project tab content */
async function renderProject() {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    console.error('Failed to fetch projects data:', response.statusText);
    return '<p>Error loading projects data.</p>';
  }
  const projects = await response.json();
  let html = `<h2>Projects</h2><ul>`;
  projects.forEach(proj => {
    html += `<li>`;
    if (proj.hyperlink) {
      html += ` - <a href="${proj.hyperlink}" target="_blank">${proj.proj}</a>`;
    } else {
      html += `<strong>${proj.proj}</strong>`;
    }
    if(proj.description) {
      html += `<br> ${proj.description}`;
    }
    html += `</li>`;
  });
  html += `</ul>`;
  return html;
}

/** Fetches and renders the Papers tab content */
async function renderPapers() {
  const response = await fetch('/api/papers');
  if (!response.ok) {
    console.error('Failed to fetch papers data:', response.statusText);
    return '<p>Error loading papers data.</p>';
  }
  const papers = await response.json();
  let html = `<h2>Papers</h2><ul>`;
  papers.forEach(paper => {
    html += `<li>`;
    if (paper.hyperlink) {
      html += ` - <a href="${paper.hyperlink}" target="_blank">${paper.title}</a>`;
    } else {
      html += `<strong>${paper.title}</strong>`;
    }
    if(paper.content) {
      html += `<br> ${paper.content}`;
    }
    html += `</li>`;
  });
  html += `</ul>`;
  return html;
}

async function renderResearch() {
  const response = await fetch('/api/research');
  if (!response.ok) {
    console.error('Failed to fetch papers data:', response.statusText);
    return '<p>Error loading papers data.</p>';
  }
  const papers = await response.json();
  let html = `<h2>Research</h2><ul>`;
  papers.forEach(paper => {
    html += `<li>`;
    if (paper.hyperlink) {
      html += ` - <a href="${paper.hyperlink}" target="_blank">${paper.title}</a>`;
    } else {
      html += `<strong>${paper.title}</strong>`;
    }
    if(paper.content) {
      html += `<br> ${paper.content}`;
    }
    html += `</li>`;
  });
  html += `</ul>`;
  return html;
}

/** Fetches and renders the Group tab content with description and news cards */
async function renderGroup() {
  // Fetch news data for the right side
  const response = await fetch('/api/news');
  if (!response.ok) {
    console.error('Failed to fetch news data:', response.statusText);
    return '<p>Error loading news data.</p>';
  }
  const news = await response.json();
  
  // Create the flex container for the layout
  let html = `<h2>Research Group</h2>
  <div style="display: flex; flex-wrap: wrap; gap: 20px;">
    <!-- Left side description -->
    <div style="flex: 1; min-width: 300px;">
      <h3>About Our Group</h3>
      <p>Placeholder text</p>
    </div>
    
    <!-- Right side news cards -->
    <div style="flex: 2; min-width: 400px;">
      <h3>Group News and Updates</h3>
      <ul>`;
      
  // Add news items in the same format as the news tab
  news.forEach(item => {
    html += `<li>`;
    if (item.hyperlink) {
      html += ` - <a href="${item.hyperlink}" target="_blank"><strong>${item.title}</strong></a>`;
    }
    else {
      html += `<strong>${item.title}</strong>`;
    }
    if (item.date) {
      const dateObj = new Date(item.date);
      const options = { month: 'long', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      html += ` <em>(${formattedDate})</em>`;
    }
    if(item.content) {
      html += `<br> ${item.content}`;
    }

    html += `</li>`;
  });
  
  html += `</ul>
    </div>
  </div>`;
  
  return html;
}

/******************************************************
 * Tab Switching Logic
 ******************************************************/

async function showTab(tabName) {
  // Hide all tab contents
  const tabs = document.querySelectorAll('.tab-content, #home-content, .home-about');
  tabs.forEach(tab => tab.style.display = 'none');

  // Update header image based on tab
  const header = document.getElementById('page-header');
  if (tabName === 'home') {
    header.className = 'header-section header-banner'; // Use banner.png for home tab
  } else {
    header.className = 'header-section header-default'; // Use orange.png for other tabs
  }

  // Show the selected tab
  if (tabName === 'home') {
    document.getElementById('home-content').style.display = 'flex';
  } else {
    document.getElementById('tab-content').style.display = 'block';
    const contentDiv = document.getElementById('tab-content');
    let html = '';
    
    switch (tabName) {
      case 'news':
        html = await renderNews();
        break;
      case 'research':
        html = await renderResearch();
        break;
      case 'teaching':
        html = await renderTeaching();
        break;
      case 'students':
        html = await renderStudents();
        break;
      case 'project':
        html = await renderProject();
        break;
      case 'papers':
        html = await renderPapers();
        break;
      case 'group':
        html = await renderGroup();
        break;
      default:
        html = '<h2>Welcome!</h2><p>Select a tab to view content.</p>';
    }
  
    contentDiv.innerHTML = html;
  }
}
  
// Show the HOME tab by default on page load
window.onload = () => {
  showTab('group');
};

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("nav a");

  tabs.forEach(tab => {
    tab.addEventListener("click", function (event) {
      event.preventDefault();

      // Remove 'active' class from all tabs
      tabs.forEach(t => t.classList.remove("active"));

      // Add 'active' class to the clicked tab
      this.classList.add("active");
    });
  });
});