/* -------------------------------------------------------------------------
| Funções para uso na extensão do inferno
------------------------------------------------------------------------- */

/* -- Cabeçalhos para envio -- */
const headers = new Headers({
  'User-Agent': 'WTF/1.0 (https://github.com/andremacola; andremacola@gmail.com) wtf-wiki/1.0',
  'Content-Type': 'application/json',
  'Api-User-Agent': 'andremacola@gmail.com'
});

/* -- Opções padrões da api -- */
const options = {
  lang: 'pt',
  path: 'w/api.php'
};

/* -- Normalizar título -- */
const normalize = function (title = '') {
  title = title.replace(/ /g, '_');
  title = title.trim();
  title = encodeURIComponent(title);
  return title;
};

/* -- Organizar parâmetros da URL -- */
const toUrlParams = function (obj) {
  const arr = Object.entries(obj).map(([key, value]) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  });
  return arr.join('&');
};

/* -- Formatar URL de Consulta na API da Wikipedia -- */
const makeUrl = function (title, params, append) {
  let url = `https://${options.lang}.wikipedia.org/${options.path}?`;

  // url = (options.domain) ? `https://${options.domain}/${options.path}?` : url
  url += toUrlParams(params);
  url += `&titles=${normalize(title)}`;
  url += append || '';

  return url;
};

module.exports = {
  headers,
  options,
  normalize,
  toUrlParams,
  makeUrl
};
