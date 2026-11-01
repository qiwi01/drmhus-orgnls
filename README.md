# DRMHUS ORGNLS. — Ecommerce starter

A responsive Next.js storefront starter for DRMHUS ORGNLS. using the selected palette:
- Obsidian Black `#111111`
- Off-White `#F5F3EE`
- Concrete Grey `#858585`

## Included
- Real product imagery supplied in the project conversation.
- Product 1: Limited Edition Logo Tee — ₦33,000, sizes S/M/L/XL, 5 total units.
- Product 2: Ringer Graphic Tee — ₦35,000, sizes S/M/L/XL, 8 total units.
- Responsive homepage, product quick view, size selection, shopping bag, quantity controls, brand story, newsletter design, and restrained reveal/hover animations.
- Reduced-motion support.

## Run locally
Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Important launch work still required
This is the initial frontend starter, not yet a live production store. Cart state is currently in memory and resets on refresh. Checkout, Paystack, order persistence, delivery fees, customer accounts, inventory-per-size, newsletter storage, and admin authentication/dashboard are not connected yet. The stock values supplied are total product quantities, not per-size quantities; the current UI does not pretend to know the size-level breakdown. Configure and test these integrations before accepting real orders.

Suggested next implementation stages:
1. Supabase schema, authentication, storage and row-level security.
2. Secure server-side checkout creation and Paystack transaction verification/webhook handling.
3. Persistent carts/orders, discount codes and shipping rules.
4. Protected admin dashboard for products, stock, promotions, orders and homepage content.
5. Production deployment, domain and live payment verification.

Use `.env.example` as a checklist for future configuration. Do not put secret keys in client code or commit them to source control.
