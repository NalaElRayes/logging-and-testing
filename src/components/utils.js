export const filterSearch = (
  search,
  logArray,
  appliedFilter,
  appliedFilterType
) => {
  // first we filter data according to what is written in search input
  let searchResults = logArray;
  search = search.toLowerCase();

  if (search !== "") {
    searchResults = searchResults.filter((testLog) => {
      let type = testLog.type.toLowerCase();
      let message = testLog.message.toLowerCase();
      let severity = testLog.severity.toLowerCase();

      if (
        type.includes(search) ||
        message.includes(search) ||
        severity.includes(search)
      ) {
        return testLog;
      }
    });
  }
  return searchResults
    .filter((testLog) => appliedFilter.includes(testLog.severity))
    .filter((testLog) =>
      appliedFilterType.some((filterType) =>
        testLog.type.startsWith(filterType)
      )
    );
};
