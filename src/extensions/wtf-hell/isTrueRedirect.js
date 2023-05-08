/* -------------------------------------------------------------------------
| Alguns redirecionamentos da Wikipedia são bugados e o 'doc.isRedirect()'
| não funciona corretamente. Essa função verifica dentro do conteúdo
| parâmetros que indicam que a página é um redirect
| Sempre seus textos iniciam com: '* 1) REDIRECIONAMENTO:', '* 1) REDIRECT:'
| Ex: Chácara Maria Trindade, Dançarinhas
| @see: https://pt.wikipedia.org/w/index.php?title=Ch%C3%A1cara%20Maria%20Trindade&redirect=no
| @see: https://pt.wikipedia.org/w/index.php?title=Af&redirect=no
| @see: https://pt.wikipedia.org/w/index.php?title=Newsgroup&redirect=no
------------------------------------------------------------------------- */

const isTrueRedirect = function () {
  const hellText = this.isRedirect() || this.sections()[0].wikitext().trim();
  const hellRedirect = [
    '#REDIRECIONAMENTO:',
    '#REDIRECIONAMENTO',
    '#Redirecionamento:',
    '#Redirecionamento',
    '#redirecionamento:',
    '#redirecionamento',
    '#REDIRECT:',
    '#REDIRECT',
    '#Redirect:',
    '#Redirect',
    '#redirect:',
    '#redirect'
  ];
  const isRedirect = this.isRedirect() || hellRedirect.find((hell) => hellText.startsWith(hell));

  const trueRedirectTerm = () => {
    const toSplit = isRedirect;
    const target = this.sections()[0].wikitext().trim().split(toSplit).pop().trim().split('\n')[0];

    // retornar somente o que está dentro dos [[ ]]
    return target.match(/\[\[(.*?)\]\]/)[1];
  };

  if (!isRedirect) {
    return '';
  } else {
    try {
      return this.redirectTo() ? this.redirectTo().page : trueRedirectTerm();
    } catch (err) {
      throw new Error('204');
    }
  }
};

module.exports = isTrueRedirect;
