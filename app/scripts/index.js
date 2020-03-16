let contacts = []
let editId;

const editContact = ({ id }) => {
  const XHR = new XMLHttpRequest();

  const nome = document.getElementById('editNome').value;
  const canal = document.getElementById('editCanal').value;
  const valor = document.getElementById('editValor').value;
  const obs = document.getElementById('editObs').value;

  XHR.addEventListener("load", function(event) {
    fetchContacts();
  });

  XHR.addEventListener("error", function( event ) {
    alert( 'Erro ao editar contato.' );
  });

  XHR.open( "PUT", `http://localhost:3000/${id}` );

  XHR.send(
    JSON.stringify({
    nome,
    canal,
    valor,
    obs
  }));
  setEditModalVisible();

}

const deleteContact = ({ id }) => {
  const XHR = new XMLHttpRequest();
  
  XHR.addEventListener("load", function(event) {
    fetchContacts();
  });
  XHR.addEventListener("error", function( event ) {
    alert( 'Erro ao deletar contato.' );
  } );
  XHR.open( "DELETE", `http://localhost:3000/${id}` );
  XHR.send();
}

const fetchContacts = async () => {
  const XHR = new XMLHttpRequest();

    XHR.onreadystatechange = () => {
    if (XHR.readyState == XMLHttpRequest.DONE) {
      contacts = Array.from(JSON.parse(XHR.responseText));
      insertContacts();
    }
  };
  
  XHR.addEventListener("error", ( event ) => {
    alert( 'Erro ao buscar os contatos.' );
  } );
  XHR.open( "get", "http://localhost:3000", true);
  XHR.send();
}

toggleBlur = () => {
  const content = document.getElementsByClassName('fixed-content')[0];
  if (content.classList.contains('blurry')) content.classList.remove('blurry')
  else content.classList.add('blurry');
}

const postContact = () => {
  const XHR = new XMLHttpRequest();

  const nome = document.getElementById('addNome').value;
  const canal = document.getElementById('addCanal').value;
  const valor = document.getElementById('addValor').value;
  const obs = document.getElementById('addObs').value;

  XHR.addEventListener("load", function(event) {
    fetchContacts();
  });

  XHR.addEventListener("error", function( event ) {
    alert( 'Oops! Something went wrong.' );
  });

  XHR.open( "POST", "http://localhost:3000" );

  XHR.send(
    JSON.stringify({
    nome,
    canal,
    valor,
    obs
  }));

  setAddModalVisible();
}

postForm = document.getElementById('postForm');

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  postContact();
});

const insertContacts = () => {
  let table = (document.getElementsByTagName('TABLE') 
  && document.getElementsByTagName('TABLE')[0])
  if(table) table.parentNode.removeChild(table);
  table = document.createElement('table');

  const tr = document.createElement('tr')
  const ths = ['ID', 'Nome', 'Canal', 'Valor','Observação', 'Ação'];
  ths.forEach((header, i) => {
    const th = document.createElement('th')
    th.appendChild(document.createTextNode(header))
    tr.appendChild(th);
  })
  table.appendChild(tr);

  contacts.forEach((contact) => {
    let id;
    const tr = document.createElement('tr')
    Object.keys(contact).forEach((key) => {
      const td = tr.appendChild(document.createElement('td'));
      if(key.toLowerCase() === 'id') id = contact[key];
      td.appendChild(document.createTextNode(contact[key]));
    })
    const editBtn = document.createElement("BUTTON");
    editBtn.innerHTML = "Editar";
    editBtn.onclick = (() => {
      const editForm = document.getElementById('editForm');
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        editContact({ id });
      });
      setEditModalVisible();
    })
    const deleteBtn = document.createElement("BUTTON");
    deleteBtn.innerHTML = "Excluir";
    deleteBtn.onclick = (() => deleteContact({ id }))
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    table.appendChild(tr);
  });
  document.getElementById('tablearea').appendChild(table);
}

const setAddModalVisible = () => {
  const modal = document.getElementById('addModal');
  if (modal.classList.contains('hidden')) modal.classList.remove('hidden')
  else modal.classList.add('hidden');
  toggleBlur();
}

const setEditModalVisible = () => {
  const modal = document.getElementById('editModal');
  if (modal.classList.contains('hidden')) modal.classList.remove('hidden')
  else modal.classList.add('hidden');
  toggleBlur();
}

fetchContacts();