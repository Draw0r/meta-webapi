const form = document.getElementById('form')
function sendData() {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new FormData( form );

  // Define what happens on successful data submission
  XHR.addEventListener( "load", function(event) {
    alert( event.target.responseText );
  } );

  // Define what happens in case of error
  XHR.addEventListener( "error", function( event ) {
    alert( 'Oops! Something went wrong.' );
  } );

  // Set up our request
  XHR.open( "POST", "http://localhost:3000" );

  // The data sent is what the user provided in the form
  XHR.send( FD );
}

// ...and take over its submit event.
form.addEventListener( "submit", function ( event ) {
  event.preventDefault();

  sendData();
} );

const post = (e) => alert(e)
const insertContacts = () => {
  const table = document.createElement('table');
  const contacts = [
    {
      id: 1,
      nome: 'willian',
      canal: 'canal',
      obs: '123',
    },
    {
      id: 2,
      nome: 'Thomas Shelby',
      canal: 'canal1',
      obs: '123',
    },
  ]; 
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

insertContacts();

