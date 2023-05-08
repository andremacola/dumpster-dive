/* -- --------------------------------------------------------------------------
Extensão para o WTF Wikipedia
Foi necessário separar para compatibilidade com 'lang: pt'
@see: https://github.com/spencermountain/wtf_wikipedia/blob/master/plugins/api/
--------------------------------------------------------------------------- -- */

const content = require('./content.js');
const isTrueRedirect = require('./isTrueRedirect.js');
const getImageViewsRedirects = require('./getImageViewsRedirects.js');
const getImage = require('./getImage.js');
const getPageViews = require('./getPageViews.js');
const getRedirects = require('./getRedirects.js');
const getMetadata = require('./getMetadata.js');
const getCategoryPages = require('./getCategoryPages.js');

const wikiFromHell = (models) => {
  const doc = models.Doc.prototype;
  const wtf = models.wtf;

  wtf.getCategoryPages = function (category) {
    return getCategoryPages(category);
  };

  doc.content = function (isArticle) {
    return content(this, isArticle);
  };

  doc.getImageViewsRedirects = function () {
    return getImageViewsRedirects(this.title());
  };

  doc.getImage = function () {
    return getImage(this.title());
  };

  doc.getPageViews = function () {
    return getPageViews(this.title());
  };

  doc.getRedirects = function () {
    return getRedirects(this.title());
  };

  doc.getMetadata = function () {
    return getMetadata(this.wikidata());
  };

  doc.isTrueRedirect = function () {
    return isTrueRedirect(this);
  };
};

module.exports = wikiFromHell;
