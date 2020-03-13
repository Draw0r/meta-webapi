const insertContacts = () => {
  const table = document.createElement('table');
  const contacts = [
    {
      id: 1,
      nome: 'willian',
      canal: 'canal',
    },
    {
      id: 2,
      nome: 'Thomas Shelby',
      canal: 'canal1',
    },
  ]; 
  const tr = document.createElement('tr')
  const ths = ['id', 'nome', 'canal', 'observação'];
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

insertContacts();