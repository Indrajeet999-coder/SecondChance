export function filterResources(resources, { search, category, condition, priceFilter }) {
  const query = search.trim().toLowerCase();

  return resources.filter((item) => {
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.seller.name.toLowerCase().includes(query);

    const matchesCategory =
      !category || category === "All" || item.category === category;

    const matchesCondition =
      !condition || condition === "All" || item.condition === condition;

    let matchesPrice = true;
    if (priceFilter === "free") matchesPrice = item.isFree;
    if (priceFilter === "paid") matchesPrice = !item.isFree;

    return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
  });
}
