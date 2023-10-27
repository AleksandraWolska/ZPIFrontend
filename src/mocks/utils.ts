export async function fetchData(storeId: string, type: string) {
  const number = parseInt(storeId, 10);
  const id = number && number > 0 && number <= 10 ? storeId : "0";
  const module = await import(/* @vite-ignore */ `./data/store-${id}/${type}`);
  return module.default;
}
