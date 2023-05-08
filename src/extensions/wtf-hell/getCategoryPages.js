/* -------------------------------------------------------------------------
| Retornar todas as páginas pertencentes a uma categoria
------------------------------------------------------------------------- */

const fetch = require('node-fetch');
const { headers, options, normalize, toUrlParams } = require('./_fns.js');

const params = {
  action: 'query',
  list: 'categorymembers',
  cmlimit: 500,
  cmtype: 'page|subcat',
  format: 'json',
  origin: '*',
  redirects: true
};

const normalizeCategory = function (cat = '') {
  // cat = (/^Category/i.test(cat) === false) ? 'Category:' + cat : cat
  cat = cat.replace(/ /g, '_');

  return cat;
};

const makeUrl = function (title, append) {
  let url = `https://${options.lang}.wikipedia.org/${options.path}?`;
  title = normalizeCategory(title);

  url += toUrlParams(params);
  url += `&cmtitle=${normalize(title)}`;
  url += append || '';

  return url;
};

const fetchIt = async function (url, prop) {
  const data = await fetch(url, { method: 'GET', headers });
  const r = await data.json();
  const pages = Object.keys(r.query[prop] || {});

  if (pages.length === 0) {
    return { pages: [], cursor: null };
  }

  const arr = pages.map((k) => {
    delete r.query[prop][k].ns;
    return r.query[prop][k];
  });

  return {
    pages: arr,
    cursor: r.continue
  };
};

const splitPagesFromSubcategories = function (list) {
  const catPattern = ['cat:', 'categoria:', 'category:'];
  const subcategories = list
    .filter((item) => catPattern.some((str) => item.title.toLowerCase().startsWith(str)))
    .map((item) => {
      return { pageid: item.pageid, item: item.title.split(':')[1] };
    });
  const pages = list.filter((item) =>
    catPattern.some((str) => !item.title.toLowerCase().startsWith(str))
  );

  return {
    subcategories,
    pages
  };
};

const getCategoryPages = async function (title) {
  let list = [];
  let getMore = true;
  let append = '';

  while (getMore) {
    const url = makeUrl(title, options, append);
    const { pages, cursor } = await fetchIt(url, 'categorymembers');

    list = list.concat(pages);

    if (cursor && cursor.cmcontinue) {
      append = '&cmcontinue=' + cursor.lhcontinue;
    } else {
      getMore = false;
    }
  }

  return list ? splitPagesFromSubcategories(list) : [];
};

module.exports = getCategoryPages;
