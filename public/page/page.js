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

    function parseHtmlText(text) {
        // 1) parse code blocks
        let html = text
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            // 2) images
            .replace(/\[\[(.*?)\]\]/g, '<img src="$1" alt="Image" style="max-width:100%;">')
            // 3) links
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
            // 4) bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // 5) strikethrough
            .replace(/~~(.*?)~~/g, '<del>$1</del>')
            // 6) italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 7) lists: group lines starting with '>' into <ul>
        const lines = html.split('\n');
        let inList = false, out = [];
        lines.forEach(line => {
            if (/^>/.test(line)) {
                if (!inList) { out.push('<ul>'); inList = true; }
                out.push('<li>'+ line.replace(/^>\s?/, '') +'</li>');
            } else {
                if (inList) { out.push('</ul>'); inList = false; }
                out.push(line);
            }
        });
        if (inList) out.push('</ul>');

        // 8) convert remaining newlines to <br>
        return out.join('\n').replace(/\n/g, '<br>');
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
    document.getElementById('paragraph1').innerHTML = parseHtmlText(pageData.paragraph1);
    
    document.getElementById('header2').textContent = pageData.header2;
    document.getElementById('paragraph2').innerHTML = parseHtmlText(pageData.paragraph2);
    
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
