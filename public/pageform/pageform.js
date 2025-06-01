document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const editorForm = document.getElementById('editor-form');
    const previewContent = document.getElementById('preview-content');
    const formInputs = document.querySelectorAll('.form-control');

    // Function to switch tabs
    function switchTab(tabId) {
        // Hide all tab panes
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Deactivate all tab buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Activate the selected tab
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // If switching to preview tab, update the preview content
        if (tabId === 'preview') {
            updatePreview();
        }
    }

    //Replace newlines and parse images and markdown text
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
    
    function updatePreview() {
        
        const title = parseHtmlText(document.getElementById('title').value);
        const header1 = parseHtmlText(document.getElementById('header1').value);
        const paragraph1 = parseHtmlText(document.getElementById('paragraph1').value);
        const header2 = parseHtmlText(document.getElementById('header2').value);
        const paragraph2 = parseHtmlText(document.getElementById('paragraph2').value);

        previewContent.innerHTML = `
            <h1>${title}</h1>
            <h2>${header1}</h2>
            <p>${paragraph1}</p>
            <h2>${header2}</h2>
            <p>${paragraph2}</p>
        `;
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Update preview when any input changes
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Handle form submission
    editorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            title: document.getElementById('title').value,
            header1: document.getElementById('header1').value,
            paragraph1: document.getElementById('paragraph1').value,
            header2: document.getElementById('header2').value,
            paragraph2: document.getElementById('paragraph2').value
        };
        
        // Send data to the server
        fetch('/api/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Page saved successfully!');
            const id = data.id; // Assuming the server returns the ID of the created page
            // Redirect to the new page or update the UI accordingly
            window.location.href = `/page/page.html?id=${id}`; // Redirect to the new page
            console.log('Success:', data);
        })
        .catch(error => {
            alert('Error saving page. Please try again.');
            console.error('Error:', error);
        });
    });

    // Initialize with default content
    updatePreview();
});
