export const handleQueryParams = () => {
  const query = new URLSearchParams(location.search);

  const queryValue = query.get('username');
  const queryPage = Number(query.get('page'));
  const querySize = Number(query.get('size'));
  const queryType = query.get('type');

  return { queryValue, queryPage, querySize, queryType };
};

export const setUrlQuery = (queryValue: string, queryPage: number, querySize: number, queryType: string) => {
  const urlQuery = `/dashboard?username=${queryValue}&page=${queryPage}&size=${querySize}&type=${queryType}`;

  return { urlQuery };
};
