/* -------------------------------------------------------------------------
| Capturar e formatar metadados do Wikidata
------------------------------------------------------------------------- */

const fetch = require('node-fetch');
const buildSPARQLQuery = require('./_sparqlQuery.js');
const { headers } = require('./_fns.js');

const getMetadata = async function (wID) {
  if (wID) {
    headers.append('Accept', 'application/sparql-results+json');
    const endpoint = 'https://query.wikidata.org/sparql';
    const query = buildSPARQLQuery(wID);
    const url = endpoint + '?query=' + encodeURIComponent(query);
    const req = await fetch(url, { method: 'GET', headers });
    const res = await req.text();
    const jsonRes = await JSON.parse(res);
    const allData = jsonRes.results.bindings;
    const data = jsonRes.results.bindings[0];

    const instanceTypes = [];
    const industryTypes = [];
    const occupationTypes = [];

    // @TODO: arrumar esse retorno no meio da função depois
    if (jsonRes.results.bindings.length === 0) {
      return [];
    }

    Object.keys(jsonRes.results.bindings).forEach((key) => {
      if (allData[key].instanceOfLabel && !allData[key].instanceOfLabel.value.startsWith('Q')) {
        instanceTypes.push(allData[key].instanceOfLabel.value);
      }

      if (allData[key].industryLabel && !allData[key].industryLabel.value.startsWith('Q')) {
        industryTypes.push(allData[key].industryLabel.value);
      }

      if (allData[key].occupationLabel && !allData[key].occupationLabel.value.startsWith('Q')) {
        occupationTypes.push(allData[key].occupationLabel.value);
      }
    });

    Object.keys(data).map((key) => {
      data[key] = data[key].value;

      if (key === 'instanceOfLabel') {
        data[key] = [...new Set(instanceTypes)];
      }

      if (key === 'industryLabel') {
        data[key] = [...new Set(industryTypes)];
      }

      if (key === 'occupationLabel') {
        data[key] = [...new Set(occupationTypes)];
      }
      return data;
    });

    return {
      wikidata: data.q,
      entity: data.entity_title,
      homepage: data.homepage,
      youtube: data.youtubeChannelID,
      instagram: data.instagramID,
      facebook: data.facebookID,
      twitter: data.twitterID,
      spotifyAlbum: data.spotifyAlbumID,
      spotifyArtist: data.spotifyArtistID,
      spotifyTrackID: data.spotifyTrackID,
      longLat: data.longLat,
      imdb: data.imdbID,
      class: data.instanceOfLabel,
      industry: data.industryLabel,
      occupation: data.occupationLabel
    };
  }

  return [];
};

module.exports = getMetadata;
