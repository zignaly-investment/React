import { useMemo, useState } from "react";
import "./ProductBoard.css";

/**
 * TODO: Implement search, category filter, sort, list rendering, and empty state.
 * See PROBLEM.md for full requirements.
 */
export default function ProductBoard({ products }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("name-asc");

  const categories = useMemo(() => {
    // TODO: unique categories from products
    return [];
  }, [products]);

  const visible = useMemo(() => {
    // TODO: filter by query + category, then sort
    return products;
  }, [products, query, category, sort]);

  return (
    <div className="board">
      <h1>Products</h1>

      <div className="controls">
        <label>
          Search
          <input
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
          />
        </label>

        <label>
          Category
          <select
            aria-label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            {/* TODO: render category options */}
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort
          <select
            aria-label="Sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="price-asc">Price low-high</option>
            <option value="price-desc">Price high-low</option>
          </select>
        </label>
      </div>

      {/* TODO: render product rows or empty state "No products found" */}
      <ul aria-label="Product list">
        {visible.map((p) => (
          <li key={p.id}>
            {/* show name, category, price as $X.XX */}
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
