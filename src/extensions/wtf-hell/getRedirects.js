/* -------------------------------------------------------------------------
| Extensão para pegar todos os redirecionamentos da página (incoming)
------------------------------------------------------------------------- */

const fetch = require('node-fetch');
const { headers, makeUrl } = require('./_fns.js');

const getRedirects = async function (title) {
  const params = {
    action: 'query',
    rdnamespace: 0,
    prop: 'redirects',
    rdlimit: 100,
    format: 'json',
    origin: '*',
    redirects: true
  };

  const url = makeUrl(title, params);
  const data = await fetch(url, { method: 'GET', headers });
  const res = await data.json();

  const pages = Object.keys(res.query.pages || {});
  const redirects = res.query.pages[pages[0]].redirects || false;

  return redirects && res.query.pages[pages[0]].redirects.map((r) => r.title);
};

module.exports = getRedirects;
