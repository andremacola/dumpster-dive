/* -------------------------------------------------------------------------
| Retornar imagem principal correta do artigo
------------------------------------------------------------------------- */

const fetch = require('node-fetch');
const { headers, makeUrl } = require('./_fns.js');

const params = {
  action: 'query',
  format: 'json',
  formatversion: 2,
  prop: 'pageimages',
  piprop: 'thumbnail',
  pithumbsize: 300
};

const getImage = async function (title) {
  const url = makeUrl(title, params);
  const data = await fetch(url, { method: 'GET', headers });
  const r = await data.json();

  return r.query.pages[0].thumbnail ? r.query.pages[0].thumbnail.source : '';
};

module.exports = getImage;
