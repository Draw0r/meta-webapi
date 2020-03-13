const fs = require('fs').promises;

const fetchData = async () => {
  const data = (await fs.readFile(`./api/data.json`));
  return JSON.parse(data.toString()).data;
}

// const exists = async (itemId) => {
//   const data = await fetchData()
//   const items = data.filter(({ id }) => String(id) === String(itemId));
//   return items.length > 0;
// }

const findById = async (itemId, data) => {
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
  const item = await findById(params.id, data);
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
      console.log(id, nome, canal, valor, obs)
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
    delete: async (contactId) => {
      const data = await fetchData();
      const item = await findById(contactId, data);
      if(item) return {
        status: 204,
        data: true,
      }
      removeItem(contactId, data);
      return {
        deleted: item,
      }
    }
  },
  '/': {
    get: async (size = 10, page = 0) => {
      const data = await fetchData();
      if ((page + 1) * size > data.length) return {
          status: 200,
          data: []
        }
      const numOfPages = parseInt(data.length / size) + 1;
      const res = 
        page === numOfPages - 1
        ? data.slice(0, size * page + data.length % numOfPages)
        : data.slice( size * page, size * (page + 1));
      
      return {
          status: 200,
          data: res
        }
    },
    post: () => {

    }
  }
};

// (async () => console.log(await contacts['idContato'].put({ id: 2 })))();
module.exports = contacts;