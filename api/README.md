# Muscle Factory — PHP API

Backend API for the Muscle Factory storefront and admin panel.
Stack: **PHP 7.4+ / 8.x · PDO · MySQL 5.7+ / MariaDB 10.3+**.

> ⚠️ This API runs on your PHP/MySQL hosting (e.g. cPanel, OVH, Hostinger).
> It is **not** executed by the Lovable React preview — deploy the `/api` folder
> to your web host alongside (or separately from) the React build.

---

## 1. Setup

1. **Create the database** in phpMyAdmin (or your host control panel) — your
   DB is already configured in `config.php`:
   ```
   host:     lanineldb.mysql.db
   user:     lanineldb
   password: Dadouhibou2025
   db:       lanineldb
   ```
2. **Import the schema**: run `api/schema.sql` in phpMyAdmin (Import tab).
3. **Upload the `api/` folder** to your web host so it is reachable at:
   ```
   https://yourdomain.com/api/
   ```
4. **Change the admin token** in `config.php` (`requireAdmin()`):
   replace `CHANGE_ME_ADMIN_TOKEN` with a strong random secret.
5. The `uploads/` directory is created automatically on first upload.
   Make sure the parent `api/` folder is writable by PHP (chmod 755).

---

## 2. Endpoints

All endpoints return JSON: `{ "success": true|false, "data": ..., "error": ... }`.

Admin endpoints require header: `X-Auth-Token: <your-secret>`.

### Brands — `/api/brands.php`
| Method | Path                          | Auth   | Description           |
|--------|-------------------------------|--------|-----------------------|
| GET    | `/api/brands.php`             | public | List all brands       |
| GET    | `/api/brands.php?id=1`        | public | Get one by id         |
| GET    | `/api/brands.php?slug=xyz`    | public | Get one by slug       |
| POST   | `/api/brands.php`             | admin  | Create brand          |
| PUT    | `/api/brands.php?id=1`        | admin  | Update brand          |
| DELETE | `/api/brands.php?id=1`        | admin  | Delete brand          |

### Products — `/api/products.php`
| Method | Path                                       | Auth   | Description                              |
|--------|--------------------------------------------|--------|------------------------------------------|
| GET    | `/api/products.php`                        | public | List + filter + paginate                 |
| GET    | `/api/products.php?id=1`                   | public | Get one by id                            |
| GET    | `/api/products.php?slug=whey-gold`         | public | Get one by slug                          |
| POST   | `/api/products.php`                        | admin  | Create product                           |
| PUT    | `/api/products.php?id=1`                   | admin  | Update product                           |
| DELETE | `/api/products.php?id=1`                   | admin  | Delete product                           |

**List filters** (query string):
`category`, `brand_id`, `brand_slug`, `featured=1`, `search=...`,
`min_price`, `max_price`, `sort=newest|price_asc|price_desc|rating|featured`,
`page`, `per_page`.

### Orders — `/api/orders.php`
| Method | Path                                  | Auth   | Description                          |
|--------|---------------------------------------|--------|--------------------------------------|
| GET    | `/api/orders.php?reference=MF-...`    | public | Track order by reference             |
| GET    | `/api/orders.php`                     | admin  | List all orders                      |
| GET    | `/api/orders.php?id=1`                | admin  | Get one order with items             |
| POST   | `/api/orders.php`                     | public | Create new order (checkout)          |
| PUT    | `/api/orders.php?id=1`                | admin  | Update status / tracking / payment   |
| DELETE | `/api/orders.php?id=1`                | admin  | Delete order                         |

**Create order body** (POST):
```json
{
  "customer_name": "Ahmed Ben Salah",
  "customer_phone": "+216 22 123 456",
  "customer_email": "ahmed@example.com",
  "address": "Rue de la République 12",
  "city": "Tunis",
  "postal_code": "1000",
  "notes": "Call before delivery",
  "payment_method": "cod",
  "items": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 2, "quantity": 1 }
  ]
}
```
The server **recomputes prices from the database** (never trusts client prices)
and decrements `products.stock` accordingly.

### Upload — `/api/upload.php` (admin)
Multipart `POST` with field `file`. Returns:
```json
{ "success": true, "url": "https://.../api/uploads/img_abc.jpg", "filename": "img_abc.jpg" }
```
Limits: 5 MB, jpeg/png/webp/gif.

### Stats — `/api/stats.php` (admin)
Dashboard quick stats: revenue today/month/total, low-stock products,
recent orders, totals.

---

## 3. Calling the API from the React app

```ts
const API = "https://yourdomain.com/api";

// Public — list products
const res = await fetch(`${API}/products.php?featured=1&per_page=8`);
const { data } = await res.json();

// Public — create order
await fetch(`${API}/orders.php`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ customer_name, customer_phone, items }),
});

// Admin — update order status
await fetch(`${API}/orders.php?id=42`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Token": "<your-secret>",
  },
  body: JSON.stringify({ status: "shipped", tracking_number: "TN12345" }),
});
```

---

## 4. Security checklist before going live

- [ ] Replace `CHANGE_ME_ADMIN_TOKEN` in `config.php` with a strong random value.
- [ ] Move DB credentials out of `config.php` into environment variables if your host supports it.
- [ ] Set `display_errors = 0` in production (already done).
- [ ] Enable HTTPS on your domain (CORS is `*` — fine for public read, but tighten if needed).
- [ ] Consider rate-limiting `orders.php` POST and `upload.php`.
- [ ] Back up the database regularly.
