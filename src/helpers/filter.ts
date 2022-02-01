export function filter(list: any, value: string) {
  if (value === '' || value === null) return list;

  const filtered = list?.filter((repository: any) => {
    return repository.full_name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
  });

  if (filtered.length === 0) return [];

  return filtered;
}
