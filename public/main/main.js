/** Fetches and renders the News tab content */
async function renderNews() {
  const response = await fetch('/api/news');
  if (!response.ok) {
    console.error('Failed to fetch news data:', response.statusText);
    return '<p>Error loading news data.</p>';
  }
  const news = await response.json();
  let html = `<ul>`;
  console.log(news)
  news.forEach(item => {
    html += `<li>`;
    html += `<div style="margin-bottom:20px;">`;
    if (item.image) {
      html += `<img src="${item.image}" alt="${item.title}" style="vertical-align:middle;width:60px;height:60px;border-radius:50%;margin-right:10px;">`;
    }
    if(item.hyperlink) {
      html += `<a href="${item.hyperlink}" target="_blank">${item.title}</a>`;
    } else {
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
  let html = `<ul>`;
  console.log("Courses:", courses)
  courses.forEach(course => {
    html += `<li>`;
    if (course.hyperlink) {
      html += `<a href="${course.hyperlink}" target="_blank">${course.course}</a>`;
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

/** Fetches and renders the renderMembers tab content */
async function renderMembers() {
  const response = await fetch('/api/members');
  if (!response.ok) {
    console.error('Failed to fetch members data:', response.statusText);
    return '<p>Error loading members data.</p>';
  }
  const members = await response.json();
  let html = `<ul>`;
  members.forEach(member => {
    html += `<li>`;
    html += `<div style="margin-bottom:20px;">`;
    if (member.picture) {
      html += `<img src="${member.picture}" alt="${member.name}" style="vertical-align:middle;width:60px;height:60px;border-radius:50%;margin-right:10px;">`;
    }
    if(member.hyperlink) {
      html += `<a href="${member.hyperlink}" target="_blank">${member.name}</a>`;
    } else {
      html += `<strong>${member.name}</strong>`;
    }
    if (member.description) {
      html += ` <br> ${member.description}`;
    }
    html += `</div>`;
    html += `</li>`;
  });
  html += `</ul>`;
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
  let html = `<ul>`;
  projects.forEach(proj => {
    html += `<li>`;
    if (proj.hyperlink) {
      html += `<a href="${proj.hyperlink}" target="_blank">${proj.proj}</a>`;
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

/** Fetches and renders the Publications tab content */
async function renderPublications() {
  const response = await fetch('/api/publications');
  if (!response.ok) {
    console.error('Failed to fetch publications data:', response.statusText);
    return '<p>Error loading publications data.</p>';
  }
  const publications = await response.json();
  let html = `<ul>`;
  publications.forEach(publication => {
    html += `<li>`;
    if (publication.hyperlink) {
      html += `<a href="${publication.hyperlink}" target="_blank">${publication.title}</a>`;
    } else {
      html += `<strong>${publication.title}</strong>`;
    }
    if(publication.content) {
      html += `<br> ${publication.content}`;
    }
    html += `</li>`;
  });
  html += `</ul>`;
  return html;
}

async function renderResearch() {
  const response = await fetch('/api/research');
  if (!response.ok) {
    console.error('Failed to fetch research data:', response.statusText);
    return '<p>Error loading research data.</p>';
  }
  const research = await response.json();
  let html = `<ul>`;
  research.forEach(paper => {
    html += `<li>`;
    html += `<div style="margin-bottom:20px;">`;
    if (paper.image) {
      html += `<img src="${paper.image}" alt="${paper.title}" style="vertical-align:middle;width:60px;height:60px;border-radius:50%;margin-right:10px;">`;
    }
    if(paper.hyperlink) {
      html += `<a href="${paper.hyperlink}" target="_blank">${paper.title}</a>`;
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
  let html = `
  <div style="display: flex; flex-wrap: wrap; gap: 20px;">
    <div style="flex: 1; min-width: 60%;">
      <h3>About Our Group</h3>
      <p>Placeholder text</p>
    </div>
    
    <div style="flex: 2; min-width: 25%;">
      <h3>Group News and Updates</h3>
      <ul>`;
    const tabContent = document.getElementById('tab-content');
    tabContent.classList.add('home-tab');
      
  // Add news items in the same format as the news tab
  let i = 0;
  news.forEach(item => {
    if(i < 3) {
      html += `<li>`;
      if (item.hyperlink) {
        html += `<a href="${item.hyperlink}"><strong>${item.title}</strong></a>`;
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
      i++;
    }
  });
  
  html += `</ul>
      <button onclick="showTab('news')" class="see-more-btn" style="margin-top: 10px;">See more</button>
    </div>
  </div>`;
  
  return html;
}

//Tab switching functionality
async function showTab(tabName) {
  //Change page title
  console.log("Tab Name:", tabName);
  pageTitle = document.getElementById('page-title');
  if(tabName === 'home') {
    pageTitle.textContent = 'Design Automation for X (DAX) Research Group';
  }
  else {
    pageTitle.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);
  }

  // Show the selected tab
    document.getElementById('tab-content').style.display = 'block';
    const contentDiv = document.getElementById('tab-content');
    let html = '';
    console.log("Tab Name:", tabName);
    contentDiv.classList.remove('home-tab');
    switch (tabName) {
      case 'home':
        contentDiv.classList.add('home-tab');
        html = await renderGroup();
        break;
      case 'news':
        html = await renderNews();
        break;
      case 'research':
        html = await renderResearch();
        break;
      case 'teaching':
        html = await renderTeaching();
        break;
      case 'members':
        html = await renderMembers();
        break;
      case 'project':
        html = await renderProject();
        break;
      case 'publications':
        html = await renderPublications();
        break;
      default:
        html = '<h2>Welcome!</h2><p>Select a tab to view content.</p>';
    }
    contentDiv.innerHTML = html;
  
}
  
// Show the HOME (group) tab by default on page load
window.onload = () => {
  const hometab = document.getElementById('tab-home');
  if (hometab) {
    hometab.classList.add("active");
  }
  showTab('home');
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