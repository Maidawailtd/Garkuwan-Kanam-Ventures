---
name: Bad Unsplash photo IDs
description: Unsplash photo IDs that return wrong/irrelevant images for industrial/equipment content — never use these.
---

## Rule
Never use these Unsplash photo IDs in product image URLs for GKC Ventures (or any industrial product site).

**Bad IDs and what they actually show:**
- `photo-1590496793929-36417d3117de` → solar panels / renewable energy field
- `photo-1578991624414-276ef23a534f` → solar panels (appears to be outdoor solar array)
- `photo-1504711434969-e33886168f5c` → credit card / payment terminal
- `photo-1561361058-c24e021e7c44` → credit card / payments
- `photo-1568605117036-5fe5e7bab0b7` → sports car / consumer vehicle
- `photo-1619963085012-1e0efb6218a3` → broken / 404

**Confirmed-working industrial IDs:**
- `photo-1601584115197-04ecc0da31d7` → Scania white cargo truck on highway
- `photo-1504307651254-35680f356dfd` → construction site workers (overhead view, rebar, orange hard hats)
- `photo-1509391366360-2e959784a276` → industrial workers / site

**Why:** Unsplash photo IDs with matching topic names don't always map to expected content. Always verify a photo ID by viewing it in a product detail page (reliable, fresh render) rather than inferring from the ID slug.

**How to apply:** When seeding or updating product image_url, only use verified IDs. Test by loading the product detail page in a fresh browser context (not React Query cached list).
