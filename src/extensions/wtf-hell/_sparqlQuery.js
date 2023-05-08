/* -- --------------------------------------------------------------------------
Query em formato SPARQL para consulta no Wikidata.org
@see: https://www.wikidata.org/wiki/Wikidata:Data_access/pt-br
@see: https://query.wikidata.org/
--------------------------------------------------------------------------- -- */

function buildSPARQLQuery(wID) {
  return (
    `
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX wikibase: <http://wikiba.se/ontology#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT
      ?q
      ?entity_title
      ?facebookID
      ?homepage
      ?imdbID
      ?instagramID
      ?instanceOfLabel
      ?longLat
      ?spotifyAlbumID
      ?spotifyArtistID
      ?twitterID
      ?youtubeChannelID
      ?industryLabel
      ?occupationLabel

    WHERE {
      BIND(wd:` +
    wID +
    ` AS ?q ) .
      ?q rdfs:label ?entity_title filter (lang(?entity_title) = "pt") .
      optional {?q wdt:P856 ?homepage} .
      optional {?q wdt:P625 ?longLat} .
      optional {?q wdt:P345 ?imdbID} .
      optional {?q (wdt:P31|wdt:P279) ?instanceOf} .
      optional {?q (wdt:P106) ?occupation} .
      optional {?q wdt:P2397 ?youtubeChannelID} .
      optional {?q wdt:P2205 ?spotifyAlbumID} .
      optional {?q wdt:P2013 ?facebookID} .
      optional {?q wdt:P2003 ?instagramID} .
      optional {?q wdt:P2002 ?twitterID} .
      optional {?q wdt:P1902 ?spotifyArtistID} .
      optional { ?q wdt:P452 ?industry. }

      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "pt, en" .
      }
    }
`
  );
}

module.exports = buildSPARQLQuery;

/* -- --------------------------------------------------------------------------
--------------------------------------------------------------------------- -- */

// export default function buildSPARQLQuery (wID) {
//   return `
//     PREFIX wd: <http://www.wikidata.org/entity/>
//     PREFIX wdt: <http://www.wikidata.org/prop/direct/>
//     PREFIX wikibase: <http://wikiba.se/ontology#>
//     PREFIX p: <http://www.wikidata.org/prop/>
//     PREFIX v: <http://www.wikidata.org/prop/statement/>
//     PREFIX q: <http://www.wikidata.org/prop/qualifier/>
//     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

//     SELECT
//       ?q
//       ?entity_title
//       ?facebookID
//       ?homepage
//       ?imdbID
//       ?instagramID
//       ?instanceOfLabel
//       ?longLat
//       ?spotifyAlbumID
//       ?spotifyArtistID
//       ?twitterID
//       ?youtubeChannelID
//       # ?dzAlbumID
//       # ?dzArtistID
//       # ?dzTrackID
//       # ?goodReadsAuthor
//       # ?itunesID
//       # ?linkedInID
//       # ?musicBrainzID
//       # ?phoneNumber
//       # ?snapChatID
//       # ?soundcloudID
//       # ?spokenArticle
//       # ?sportsTeamLabel
//       # ?sportsTeamPositionLabel
//       # ?spotifyTrackID
//       # ?tikTokID
//       # ?tmdbMovieID
//       # ?tmdbPersonID
//       # ?tmdbSeriesID
//       # ?wolfram
//       # ?youtubeVideoID

//     WHERE {
//       BIND(wd:` + wID + ` AS ?q ) .
//         ?q rdfs:label ?entity_title filter (lang(?entity_title) = "pt") .

//       optional {
//               ?wikiID
//               schema:about ?q .
//               optional{?q wdt:P856 ?homepage} .
//               optional{?q wdt:P625 ?longLat} .
//               optional{?q wdt:P345 ?imdbID} .
//               optional{?q wdt:P31 ?instanceOf} .
//               optional{?q wdt:P2397 ?youtubeChannelID} .
//               optional{?q wdt:P2205 ?spotifyAlbumID} .
//               optional{?q wdt:P2013 ?facebookID} .
//               optional{?q wdt:P2003 ?instagramID} .
//               optional{?q wdt:P2002 ?twitterID} .
//               optional{?q wdt:P1902 ?spotifyArtistID} .
//               # optional{?q wdt:P989  ?spokenArticle} .
//               # optional{?q wdt:P7085 ?tikTokID} .
//               # optional{?q wdt:P6634 ?linkedInID} .
//               # optional{?q wdt:P54 ?sportsTeam} .
//               # optional{?q wdt:P4985 ?tmdbPersonID} .
//               # optional{?q wdt:P4983 ?tmdbSeriesID} .
//               # optional{?q wdt:P4947 ?tmdbMovieID} .
//               # optional{?q wdt:P4839 ?wolfram} .
//               # optional{?q wdt:P434 ?musicBrainzID} .
//               # optional{?q wdt:P413 ?sportsTeamPosition} .
//               # optional{?q wdt:P3040 ?soundcloudID} .
//               # optional{?q wdt:P2984 ?snapChatID} .
//               # optional{?q wdt:P2963 ?goodReadsAuthor} .
//               # optional{?q wdt:P2850 ?itunesID} .
//               # optional{?q wdt:P2724 ?dzTrackID} .
//               # optional{?q wdt:P2723 ?dzAlbumID} .
//               # optional{?q wdt:P2722 ?dzArtistID} .
//               # optional{?q wdt:P2207 ?spotifyTrackID} .
//               # optional{?q wdt:P1651 ?youtubeVideoID} .
//               # optional{?q wdt:P1329 ?phoneNumber} .
//       }

//       SERVICE wikibase:label {
//         bd:serviceParam wikibase:language "pt" .
//       }
//     }

//     LIMIT 1
// `
// }
