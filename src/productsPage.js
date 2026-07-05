const btn = document.getElementById("button");
const header = document.getElementById("header");

async function createProd() {

    const formData = new FormData(formCreateProd);
    const dataObject = Object.fromEntries(formData.entries());
    
    console.log('Body da requisição:', JSON.stringify(dataObject, null, 2));

    const response = await fetch('http://localhost:3000/products', {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataObject)
    })

    try {

        const jsonData = await response.json();
    
        try {

            console.log('Resposta do servidor:', jsonData);
            alert(`O produto ${jsonData.name} foi criado com sucesso.`)
        }

        catch (err) {

            console.error('Erro na requisição', err);
            alert(`Erro na requisição.`);
        }
    }

    catch (err) {

        console.error('Erro na requisição', err);
        alert(`Erro na requisição.`);
    }
    
}

async function showAllProducts() {
   
    document.getElementById('displayProd').innerHTML = '';

    try {

        const response = await fetch('http://localhost:3000/products', {

                method: 'GET'
            });
        
        try {

            const jsonData = await response.json();

            try {

                if (jsonData.message) {

                    console.error('Erro:', jsonData);
                    alert(`Erro: ${jsonData.message}`);
                }

                else {

                    console.log("Resposta do servidor:", jsonData);
                    jsonData.forEach(user => {

                        if (user.low_stock) {

                            const markup = 
                            `<ul id="item">
                                <h3 id="itemName">${user.name}</h3>
                                <p id=lowStock>PRODUTO ABAIXO DA QUANTIDADE MÍNIMA</p>
                                <li id="itemDescription">Descrição: ${user.description}</li>
                                <li id="itemPrice">Preço: ${user.price}</li>
                                <li id="itemQuant">Quantidade: ${user.quantity}</li>
                                <li id=itemMinQuant">Quantidade Mínima: ${user.min_quantity}</li>
                                <li id=itemSupplierID">ID do Fornecedor: ${user.supplier_id}</li>                
                            </ul><br><br>`;

                            document.getElementById('displayProd').insertAdjacentHTML('beforeend', markup);
                        }

                        else {

                            const markup = 
                            `<ul id="item">
                                <h3 id="itemName">${user.name}</h3>
                                <li id="itemDescription">Descrição: ${user.description}</li>
                                <li id="itemPrice">Preço: ${user.price}</li>
                                <li id="itemQuant">Quantidade: ${user.quantity}</li>
                                <li id=itemMinQuant">Quantidade Mínima: ${user.min_quantity}</li>
                                <li id=itemSupplierID">ID do Fornecedor: ${user.supplier_id}</li>                
                            </ul><br><br>`;

                            document.getElementById('displayProd').insertAdjacentHTML('beforeend', markup);
                        }
                    });
                }
            }

            catch(err) {

            console.error('Erro na requisição:', err);
            alert(`Erro na requisição.`);
        }
        }
        
        catch(err) {

            console.error('Erro na requisição:', err);
            alert(`Erro na requisição.`);
        }
        
    }
    
    catch(err) {

        console.error('Erro na requisição:', err);
        alert(`Erro na requisição.`);
    }
}

async function showByProductId(id) {

    document.getElementById('displayProd').innerHTML = '';

    const idString = String(id);
    const url = new URL('http://localhost:3000/products/');
    const urlWithID = new URL(idString, url);

    const response = await fetch(urlWithID, {

            method: 'GET'
        });
    
    try { 

        const jsonData = await response.json();

        try {
            
            if (jsonData.message) {

                alert(`Erro: ${jsonData.message}.`);
            }

            else {

                const markup = 

                `<ul id="item">
                    <h3 id="itemName">${jsonData.name}</h3>
                    <li id="itemDescription">Descrição: ${jsonData.description}</li>
                    <li id="itemPrice">Preço: ${jsonData.price}</li>
                    <li id="itemQuant">Quantidade: ${jsonData.quantity}</li>
                    <li id=itemMinQuant">Quantidade Mínima: ${jsonData.min_quantity}</li>
                    <li id=itemSupplierID">ID do Fornecedor: ${jsonData.supplier_id}</li>                
                </ul><br><br>`;

                document.getElementById('displayProd').insertAdjacentHTML('beforeend', markup);
            }
        }

        catch(err) {

            console.error('Erro na requisição:', err);
            alert(`Erro na requisição.`);
        }
        
    }
    
    catch(err) {

        console.error('Erro na requisição:', err);
        alert(`Erro na requisição.`);
    }
}


async function deleteProductByID(id) {

    const idString = String(id);
    const url = new URL('http://localhost:3000/products/');
    const urlWithID = new URL(idString, url);

    try {

        const response = await fetch(urlWithID, {

                method: 'DELETE'
            });

        const jsonData = await response.json();

        try {

            if (jsonData.message) {

                alert(`Erro: ${jsonData.message}.`);
            }

            else {

                alert(`Produto ${jsonData.name} deletado.`);
            }
            
        }

        catch(err) {

            console.log('Erro na requisição:', err);
            alert(`Erro: ${err}`);
        }
    }
    
    catch(err) {

        alert(`Erro: ${err}`);
    }
}

async function updateProductByID(id) {

    const idString = String(id);
    const url = new URL('http://localhost:3000/products/');
    const urlWithID = new URL(idString, url);

    try {

        const formData = new FormData(formUpdProd);
        const dataObject = Object.fromEntries(formData.entries());
        
        console.log('Body da requisição:', JSON.stringify(dataObject, null, 2));

        const response = await fetch(urlWithID, {

                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(dataObject)
            });
        
        try {

            const jsonData = await response.json();

            try {

                if (jsonData.message) {

                    console.error('Erro:', jsonData);
                    alert(`Erro: ${jsonData.message}.`);
                }

                else {

                    console.log("Resposta do servidor:", jsonData);
                    alert(`Produto ${jsonData.name} atualizado com sucesso.`);
                }
            }

            catch(err) {

            console.error('Erro na requisição', err);
            alert(`Erro: ${err}`);
            }
        }
        
        catch(err) {

            console.error('Erro na requisição', err);
            alert(`Erro: ${err}`);
        }
    }
    
    catch(err) {

        console.error('Erro na requisição:', err);
        alert(`Erro: ${err}`);
    }
}

btn.addEventListener("click", () => {

    showAllProducts();
});

const formCreateProd = document.getElementById('formCreateProduct');
const formUsingID = document.getElementById('formUsingID');
const formUpdProd = document.getElementById('formUpdProduct');

formCreateProd.addEventListener('submit', (e) => {

    e.preventDefault();

    createProd();
});

formUpdProd.addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(formUpdProd);
    const id = formData.get('id');

    updateProductByID(id);
});

formUsingID.addEventListener('submit', (e) =>{

    e.preventDefault();

    const formData = new FormData(formUsingID);
    const id = formData.get('formSearch');
    
    const select = document.getElementById('formOptions');
    const value = select.value;

    if (value === "searchByID") {

        console.log(id);
        showByProductId(id);
    }

    else if (value === "deleteByID") {

        console.log(id);
        deleteProductByID(id);
    }

    else {

        alert('Erro: Opção inválida.');
    }
});
