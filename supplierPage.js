const btn = document.getElementById("button");
const formCreateSupplier = document.getElementById('formCreateSupplier');
const formUpdateSupplier = document.getElementById('formUpdateSupplier');
const formUsingID = document.getElementById('formUsingID');

async function createSupplier() {
    const formData = new FormData(formCreateSupplier);
    const dataObject = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/suppliers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataObject)
    });

    const jsonData = await response.json();

    if (!response.ok) {
        alert(jsonData.message || 'Erro ao criar fornecedor');
        return;
    }

    alert(`Fornecedor ${jsonData.name} criado.`);
}

async function showAllSuppliers() {
    document.getElementById('displaySupplier').innerHTML = '';
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/suppliers', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const jsonData = await response.json();

    if (!response.ok) {
        alert(jsonData.message || 'Erro ao buscar fornecedores');
        return;
    }

    jsonData.forEach(supplier => {
        const markup = `
        <ul>
            <h3>${supplier.name}</h3>
            <li>${supplier.email}</li>
            <li>${supplier.phone}</li>
            <li>${supplier.address}</li>
        </ul><br><br>
        `;
        document.getElementById('displaySupplier')
            .insertAdjacentHTML('beforeend', markup);
    });
}

async function showSupplierById(id) {
    document.getElementById('displaySupplier').innerHTML = '';
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/suppliers/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const supplier = await response.json();

    if (!response.ok) {
        alert(supplier.message || 'Erro ao buscar fornecedor');
        return;
    }

    const markup = `
    <ul>
        <h3>${supplier.name}</h3>
        <li>${supplier.email}</li>
        <li>${supplier.phone}</li>
        <li>${supplier.address}</li>
    </ul><br><br>
    `;

    document.getElementById('displaySupplier')
        .insertAdjacentHTML('beforeend', markup);
}

async function deleteSupplierById(id) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/suppliers/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const jsonData = await response.json();

    if (!response.ok) {
        alert(jsonData.message || 'Erro ao deletar');
        return;
    }

    alert(`Fornecedor ${jsonData.name} deletado.`);
}

async function updateSupplierById(id) {
    const formData = new FormData(formUpdateSupplier);
    const dataObject = Object.fromEntries(formData.entries());
    delete dataObject.id;

    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/suppliers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataObject)
    });

    const jsonData = await response.json();

    if (!response.ok) {
        alert(jsonData.message || 'Erro ao atualizar');
        return;
    }

    alert(`Fornecedor ${jsonData.name} atualizado.`);
}

btn.addEventListener("click", showAllSuppliers);

formCreateSupplier.addEventListener('submit', (e) => {
    e.preventDefault();
    createSupplier();
});

formUpdateSupplier.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = new FormData(formUpdateSupplier).get('id');
    updateSupplierById(id);
});

formUsingID.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = new FormData(formUsingID).get('formSearch');
    const value = document.getElementById('formOptions').value;

    if (value === "searchByID") {
        showSupplierById(id);
    } else if (value === "deleteByID") {
        deleteSupplierById(id);
    }
});
