# React — Product Filter Board (30 minutes)

## Goal

Build a small product browsing UI that filters and sorts a fixed product list.

## Requirements

Given a list of products (`id`, `name`, `category`, `price`), implement:

1. **Search** — a text input that filters products whose `name` contains the query (case-insensitive).
2. **Category filter** — a `<select>` with options `All`, plus each unique category from the data. Selecting a category shows only products in that category (`All` shows everything).
3. **Sort** — a `<select>` with:
   - `name-asc` — name A→Z
   - `price-asc` — price low→high
   - `price-desc` — price high→low
4. **List** — render the filtered/sorted products. Each row must show `name`, `category`, and `price` (formatted as `$X.XX`).
5. **Empty state** — if no products match, show the text `No products found`.

Search, category, and sort must work together (AND logic for search + category, then apply sort).

## Constraints

- Use the provided `products` data; do not fetch from a network.
- Implement the logic in `src/ProductBoard.jsx` (and CSS if you want).
- Keep the public component API: `export default function ProductBoard({ products })`.

## Out of scope

Pagination, cart, routing, backend, external UI libraries.
