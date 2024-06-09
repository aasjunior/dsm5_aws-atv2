const URL = 'https://z18riuuvbk.execute-api.us-east-1.amazonaws.com/dev'

document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var data = {
        FirstName: document.getElementById('FirstName').value,
        LastName: document.getElementById('LastName').value,
        BirthDate: document.getElementById('BirthDate').value,
        Gender: document.querySelector('input[name="Gender"]:checked').value
    };

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.statusCode === 200) {
            // Define o texto do corpo do modal
            document.querySelector('#responseModal .modal-body').textContent = data.body;
            // Exibe o modal
            var responseModal = new bootstrap.Modal(document.getElementById('responseModal'));
            responseModal.show();
        }
    })
    .catch((error) => {
        console.error('Erro:', error);
    });

    // Limpa o formulário quando o modal é fechado
    document.getElementById('responseModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById('patientForm').reset();
    });
});
