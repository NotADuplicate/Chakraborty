document.addEventListener('DOMContentLoaded', () => {
    // Extract the page ID from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const pageId = params.get('id');
    
    // Check if page ID was provided
    if (!pageId) {
        showError('No page ID specified. Please provide a valid page ID.');
        return;
    }
    
    // Fetch the page data from the server
    fetchPageData(pageId);
});

function parseHtml(text) {
    return text.replace(/\n/g,'<br>').replace(/\[\[(.*?)\]\]/g, '<img src="$1" alt="Image" style="max-width: 100%;">');
}

async function fetchPageData(pageId) {
    try {
        const response = await fetch(`/api/pages/${pageId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                showError('Page not found. The requested page does not exist.');
            } else {
                showError('Error loading page content. Please try again later.');
            }
            return;
        }
        
        const pageData = await response.json();
        displayPageContent(pageData);
    } catch (error) {
        console.error('Error fetching page data:', error);
        showError('Error loading page content. Please try again later.');
    }
}

function displayPageContent(pageData) {
    // Update page title (both in the document and the browser tab)
    document.title = pageData.title;
    document.getElementById('page-title').textContent = pageData.title;
    
    // Update section content
    document.getElementById('header1').textContent = pageData.header1;
    document.getElementById('paragraph1').innerHTML = parseHtml(pageData.paragraph1);
    
    document.getElementById('header2').textContent = pageData.header2;
    document.getElementById('paragraph2').innerHTML = parseHtml(pageData.paragraph2);
    
    // Hide loading indicator and show content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('page-content').style.display = 'block';
}

function showError(message) {
    document.getElementById('loading').style.display = 'none';
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}
