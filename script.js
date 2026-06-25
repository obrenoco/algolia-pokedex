const searchClient = algoliasearch(
  'UZQK9JMILV',
  '0c3f26810633ec49f515ce26f51763ff'
);

const search = instantsearch({
  indexName: 'test2',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
});

search.addWidgets([
  instantsearch.widgets.configure({
    queryType: 'prefixAll',
  }),

  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search Pokémon…',
    showReset: true,
    showLoadingIndicator: false,
  }),

  instantsearch.widgets.stats({
    container: '#stats',
    templates: {
      text: ({ nbHits, processingTimeMS }) =>
        `${nbHits.toLocaleString()} results in ${processingTimeMS}ms`,
    },
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit) => {
        return `
    <div class="card">
      <img src="${hit.image}" alt="${hit.name}" />
      <div class="name">${hit.name}</div>
    </div>
  `},
      empty: () => `<div class="no-results">No Pokémon found. Try a different search!</div>`,
    },
  }),

  instantsearch.widgets.pagination({
    container: '#pagination',
    padding: 2,
  }),

]);

search.start();