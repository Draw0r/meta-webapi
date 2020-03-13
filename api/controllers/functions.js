const fs = require('fs').promises;

const fetchData = async () => {
  const data = (await fs.readFile(`./api/data.json`));
  return JSON.parse(data.toString()).data;
}

const addItem = async (params) => {
  let data = await fetchData();
  const id = (data.length + 1).toString();
  params.id = id;
  data.push({
    ...params,
  })
  const res = { data };
  await fs.writeFile('./api/data.json', Buffer.from(JSON.stringify(res)));
  return { ...params };
}

const findById = (itemId, data) => {
  const items = data.filter(({ id }) => Number(id) === Number(itemId));
  return items.length > 0 ? items[0] : null;
}

const removeItem = (item, data) => {
  const index = data.indexOf(item);
  if (index > -1) {
    data.splice(index, 1);
    return data;
  }
}

const update = async (params) => {
  let data = await fetchData();
  const item = findById(params.id, data);
  if (!item) return null;
  data = removeItem(item, data);
  data.push({
    ...params,
  })
  const res = { data };
  await fs.writeFile('./api/data.json', Buffer.from(JSON.stringify(res)));
  return { ...params};
}

const contacts = {
  'idContato': {
    get: async ({ id }) => {
      const data = await fetchData();
      console.warn(data);
      const itemsArray = data
        .filter((contact) => Number(contact.id) === Number(id));
      return itemsArray.length > 0
        ? {
          status: 200,
          data: itemsArray[0],
        }
        : {
          status: 404,
          data: {},
        }
    },
    put: async ({ id, nome, canal, valor, obs }) => {
      if (!id || !nome || !canal || !valor) return {
        status: 400,
      }
      if (typeof nome !== 'string'
        || typeof canal !== 'string'
        || typeof valor !== 'string'
        || (obs && typeof obs !== 'string')) return {
          status: 400,
          data: 'Invalid parameter type',
        }
      
      const res = await update({
        id,
        nome,
        canal,
        valor,
        obs
      })

      if(!res) return {
        status: 404,
        data: 'Contato não encontrado.'
      }

      return {
        status: 204,
        data: {
          nome,
          canal,
          valor,
          obs
        },
      };
    },
    delete: async ({ id: contactId }) => {
      let data = await fetchData();
      const item = findById(contactId, data);
      if(item) {
        data = removeItem(item, data);
        const res = { data };
        await fs.writeFile('./api/data.json', Buffer.from(JSON.stringify(res)));
        return {
          status: 204,
          data: true,
        }
      } else return {
        status: 404,
        data: 'contact not found',
      }
    }
  },
  '/': {
    get: async ({size = 10, page = 0}) => {
      const data = await fetchData();
      if (page * size > data.length) return {
          status: 200,
          data: []
        }
      const numOfPages = parseInt(data.length / size) + 1;
      const res = 
        page === numOfPages - 1
        ? data.slice(0, size * page + data.length % size)
        : data.slice( size * page, size * (page + 1));
      
      return {
          status: 200,
          data: res
        }
    },
    post: async ({ nome, canal, valor, obs }) => {
      if (!nome || !canal || !valor) return {
        status: 400,
        data: 'Missing parameters'
      }
      if (typeof nome !== 'string'
        || typeof canal !== 'string'
        || typeof valor !== 'string'
        || (obs && typeof obs !== 'string')) return {
          status: 400,
          data: 'Invalid parameter type',
        }

      const res = await addItem({
        nome,
        canal,
        valor,
        obs
      })

      return {
        status: 200,
        data: res,
      };
    },
  }
};

// (async () => console.log(await contacts['idContato'].put({ id: 2 })))();
module.exports = contacts;