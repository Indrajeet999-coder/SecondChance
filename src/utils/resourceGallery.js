import { resources } from "../data/mockData";

export function getResourceGallery(resource) {
  const url = resource.image;
  const [base, queryString] = url.includes("?") ? url.split("?") : [url, ""];
  const params = new URLSearchParams(queryString);
  const build = (overrides) => {
    const p = new URLSearchParams(params);
    Object.entries(overrides).forEach(([k, v]) => p.set(k, v));
    return `${base}?${p.toString()}`;
  };

  return [
    build({ w: "1200", q: "85" }),
    build({ w: "400", h: "300", fit: "crop", crop: "top" }),
    build({ w: "400", h: "300", fit: "crop", crop: "center" }),
    build({ w: "400", h: "300", fit: "crop", crop: "entropy" }),
  ];
}

export function getResourceById(id) {
  return resources.find((r) => r.id === id);
}
