const contacts = []

const editContact = ({ id }) => {
  
}

const fetchContacts = () => {
  // fetch('http://localhost:3000')
  // .then(
  //   response => alert(response.text()) // .json(), etc.
  //   // same as function(response) {return response.text();}
  // )
  // return
  const XHR = new XMLHttpRequest();
  // XHR.addEventListener("load", (event) => {
  //   // alert( event.target.responseText );
  //   alert('hi')
  // });
  XHR.onreadystatechange = function() {
  if (XHR.readyState == XMLHttpRequest.DONE) {
      alert(XHR.responseText);
  }}
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
  
  // Define what happens on successful data submission
  XHR.addEventListener("load", function(event) {
    alert( event.target.responseText );
  });

  // Define what happens in case of error
  XHR.addEventListener("error", function( event ) {
    alert( 'Oops! Something went wrong.' );
  } );

  // Set up our request
  XHR.open( "POST", "http://localhost:3000" );

  // The data sent is what the user provided in the form
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
  const table = document.createElement('table');
  
  const tr = document.createElement('tr')
  const ths = ['ID', 'Nome', 'Canal', 'Observação', 'Ação'];
  ths.forEach((header, i) => {
    const th = document.createElement('th')
    th.appendChild(document.createTextNode(header))
    tr.appendChild(th);
  })
  table.appendChild(tr);
  table.appendChild(tr);
  contacts.forEach((contact) => {
    const tr = document.createElement('tr')
    Object.keys(contact).forEach((key) => {
      const td = tr.appendChild(document.createElement('td'));
      td.appendChild(document.createTextNode(contact[key]));
    })
    table.appendChild(tr);
  });
  document.getElementById('tablearea').appendChild(table);
}

const setFormVisible = () => {
  const form = document.getElementsByTagName('FORM')[0];
  if (form.classList.contains('hidden')) form.classList.remove('hidden')
  else form.classList.add('hidden');
}
// post = ( data ) => {
//   alert('hi')
//   const XHR = new XMLHttpRequest(),
//         FD  = new FormData();

//   for (name in data) {
//     FD.append(name, data[name]);
//   }

//   XHR.addEventListener( 'load', function( event ) {
//     alert( 'Yeah! Data sent and response loaded.' );
//   });

//   XHR.addEventListener('error', function( event ) {
//     alert( 'Oops! Something went wrong.' );
//   });

//   XHR.open('POST', 'http://localhost:3000' );

//   // Send our FormData object; HTTP headers are set automatically
//   XHR.send(FD);
// }
fetchContacts();
insertContacts();

