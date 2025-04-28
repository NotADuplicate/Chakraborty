document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabContents.forEach(content => content.style.display = 'none');
            document.getElementById(button.dataset.tab).style.display = 'block';
        });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.name = 'password';
        passwordInput.placeholder = 'Enter password';
        form.appendChild(passwordInput);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const table = form.id.split('-')[0];

            try {
                const response = await fetch(`/api/add/${table}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showModal('Success', 'Row added successfully!');
                    form.reset();
                } else if (response.status === 403) {
                    console.log(response)
                    showModal('Invalid Password', 'Try again');
                } else {
                    showModal('Error', 'Error adding row.');
                }
            } catch (error) {
                console.error('Error:', error);
                showModal('Error', 'Error adding row.');
            }
        });
    });

    function showModal(title, message) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${title}</h2>
                <p>${message}</p>
                <button class="close-modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        const closeModalButton = modal.querySelector('.close-modal');
        closeModalButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
});