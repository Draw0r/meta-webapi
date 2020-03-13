const btn = document.getElementById('newContact');

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

sendData = ( data ) => {
  alert('hi')
  const XHR = new XMLHttpRequest(),
        FD  = new FormData();

  for (name in data) {
    FD.append(name, data[name]);
  }

  XHR.addEventListener( 'load', function( event ) {
    alert( 'Yeah! Data sent and response loaded.' );
  });

  XHR.addEventListener('error', function( event ) {
    alert( 'Oops! Something went wrong.' );
  });

  XHR.open('POST', 'http://localhost:3000' );

  // Send our FormData object; HTTP headers are set automatically
  XHR.send(FD);
}

insertContacts();
btn.addEventListener( 'click', function() 
  { sendData( {test:'ok'} ); 
})
