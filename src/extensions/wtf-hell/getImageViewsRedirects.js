/* -------------------------------------------------------------------------
| Extensão para pegar imagens, pageviews, redirects da página (incoming)
------------------------------------------------------------------------- */

const fetch = require('node-fetch');
const { headers, makeUrl } = require('./_fns.js');

const getImageViewsRedirects = async function (title) {
  const params = {
    action: 'query',
    rdnamespace: 0,
    // prop: 'pageviews|redirects|pageimages|extracts',
    prop: 'pageviews|redirects|pageimages',
    rdlimit: 100,
    format: 'json',
    formatversion: 2,
    origin: '*',
    redirects: true,
    piprop: 'thumbnail',
    pithumbsize: 300
  };
  // const url = makeUrl(title, params, '&exlimit=1&explaintext&exintro')
  const url = makeUrl(title, params);
  const data = await fetch(url, { method: 'GET', headers });
  const res = await data.json();
  const pages = Object.keys(res.query.pages || {});

  const image = res.query.pages[pages[0]].thumbnail
    ? res.query.pages[pages[0]].thumbnail.source
    : '';
  const ranking = res.query.pages[pages[0]].pageviews
    ? Object.values(res.query.pages[pages[0]].pageviews).reduce((a, b) => a + b, 0)
    : 1;
  const redirects = res.query.pages[pages[0]].redirects
    ? res.query.pages[pages[0]].redirects.map((r) => r.title)
    : [];
  // const content = res.query.pages[pages[0]].extract ? res.query.pages[pages[0]].extract : ''

  return {
    image: image,
    ranking: ranking,
    redirects: redirects
    // content: content
  };
};

module.exports = getImageViewsRedirects;
