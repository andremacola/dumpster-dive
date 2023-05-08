/* -------------------------------------------------------------------------
| Extensão para pegar pageviews totais da página dos últimos 30 dias
------------------------------------------------------------------------- */

const fetch = require('node-fetch');
const { headers, makeUrl } = require('./wtf-hell/_fns.js');

const getPageViews = async function (title) {
  const params = {
    action: 'query',
    prop: 'pageviews',
    format: 'json',
    origin: '*',
    redirects: true
  };
  const url = makeUrl(title, params);
  const data = await fetch(url, { method: 'GET', headers });
  const res = await data.json();
  const pages = Object.keys(res.query.pages || {});

  return pages.length === 0
    ? 0
    : Object.values(res.query.pages[pages[0]].pageviews).reduce((a, b) => a + b, 0);
};

module.exports = getPageViews;
