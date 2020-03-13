let contacts = []

const editContact = ({ id }) => {

}

const deleteContact = ({ id }) => {
  const XHR = new XMLHttpRequest();
  
  XHR.addEventListener("load", function(event) {
    fetchContacts();
  });

  XHR.addEventListener("error", function( event ) {
    alert( 'Oops! Something went wrong.' );
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
    alert( 'Oops! Something went wrong.' );
  } );
  XHR.open( "get", "http://localhost:3000", true);
  XHR.send();
}

const postContact = () => {
  const XHR = new XMLHttpRequest();

  const nome = document.getElementById('nome').value;
  const canal = document.getElementById('canal').value;
  const valor = document.getElementById('valor').value;
  const obs = document.getElementById('obs').value;
  
  XHR.addEventListener("load", function(event) {
    alert( event.target.responseText );
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
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  postContact();
});

const insertContacts = () => {
  let table = (document.getElementsByTagName('TABLE') 
  && document.getElementsByTagName('TABLE')[0])
  || document.createElement('table')
  
  const tr = document.createElement('tr')
  const ths = ['ID', 'Nome', 'Canal', 'Observação', 'Ação'];
  ths.forEach((header, i) => {
    const th = document.createElement('th')
    th.appendChild(document.createTextNode(header))
    tr.appendChild(th);
  })
  table.appendChild(tr);

  let id;
  contacts.forEach((contact) => {
    const tr = document.createElement('tr')
    Object.keys(contact).forEach((key) => {
      const td = tr.appendChild(document.createElement('td'));
      
      if(key.toLowerCase() === 'id') id = contact[key];
      td.appendChild(document.createTextNode(contact[key]));
    })
    const editBtn = document.createElement("BUTTON");
    editBtn.innerHTML = "Editar";
    editBtn.onclick = (() => editContact({ id }))
    const deleteBtn = document.createElement("BUTTON");
    deleteBtn.innerHTML = "Excluir";
    deleteBtn.onclick = (() => deleteContact({ id }))
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    table.appendChild(tr);
  });
  document.getElementById('tablearea').appendChild(table);
}

const setFormVisible = () => {
  const form = document.getElementsByTagName('FORM')[0];
  if (form.classList.contains('hidden')) form.classList.remove('hidden')
  else form.classList.add('hidden');
}

fetchContacts();
