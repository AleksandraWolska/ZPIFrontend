export async function fetchData(storeId: string, type: string) {
  const module = await import(/* @vite-ignore */ `./data/store-${storeId}`);
  return module[type];
}

export function getStoreId(adminEmail: string) {
  if (adminEmail.includes("new")) return "101";

  const endIdx = adminEmail.indexOf("@");
  return adminEmail.slice(1, endIdx);
}

export function getToken(headers: Headers) {
  return headers.get("Authorization")?.split(" ")[1] ?? "";
}

export function incorrectToken(token: string) {
  return !token || token === "null";
}

export async function getStoreMockIdByStoreName(storeName: string) {
  const adminStoresModule = await import(`./data/common/adminStores`);
  const { adminStores } = adminStoresModule;

  let storeId = "";
  Object.values(adminStores).forEach((stores) => {
    stores.forEach((s) => {
      if (s.name.toLowerCase() === storeName.toLowerCase()) {
        storeId = s.storeConfigId;
      }
    });
  });

  return storeId;
}
