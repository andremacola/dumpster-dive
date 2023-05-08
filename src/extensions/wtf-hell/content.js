/* -------------------------------------------------------------------------
| Formatar e retornar descrição (content)
| Wikipedia as vezes retorna palavras do markdown [right|left|center] etc..
------------------------------------------------------------------------- */

const content = function (doc, isArticle) {
  if (isArticle) {
    const textContent = doc
      .sentences()
      .filter((p, i) => i <= 8)
      .map((p) => {
        let text = p.text();
        const wikitext = text.match(/\[\[(.*?)\]\]/);
        const firstWord = text.split(' ')[0];

        const excludeText = [
          '°',
          'thumb',
          'right',
          'left',
          'center',
          'miniaturadaimagem',
          '[[',
          'miniatura|',
          '|miniatura'
        ].some((t) => firstWord.includes(t));

        /* remover palavras minúsculas jogadas no início do texto (deprecated) */
        /* sem marcação (right, left, etc..) */
        if (firstWord.match(/[a-z]/i) && firstWord === firstWord.toLowerCase()) {
          text = text.replace(firstWord, '');
        }

        /* ajustar textos como: 'este mês. [1][2] . Na astrologia' */
        /* Ex de termo: Agosto */
        /* resolveria melhor usando doc.sentences() mas teria que mudar a lógica da função */
        text = text.startsWith('.') ? text.replace('.', '') : text;

        /* remover qualquer palavra/sentença entre parentesis */
        text = text.replace(/ *\([^)]*\) */g, ' ');

        /* evitar espaços duplicados ao remover palavras com parentesis no final da sentença */
        text = text.replace(' .', '.');

        /* remover restos de wikitext do início do texto */
        text = firstWord.startsWith(']]') ? text.replace(']]', '') : text;

        return wikitext || excludeText ? '' : text.trim();
      })
      .join(' ')
      .trim();

    return textContent;
  }

  return '';
};

module.exports = content;
