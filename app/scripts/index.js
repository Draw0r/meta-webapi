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

insertContacts();