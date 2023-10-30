export async function fetchData(storeId: string, type: string) {
  const module = await import(/* @vite-ignore */ `./data/store-${storeId}`);
  return module[type];
}

export function getStoreId(adminEmail: string) {
  const endIdx = adminEmail.indexOf("@");
  return adminEmail.slice(1, endIdx);
}

export function getToken(headers: Headers) {
  return headers.get("Authorization")?.split(" ")[1] ?? "";
}

export function incorrectToken(token: string) {
  return !token || token === "null";
}
