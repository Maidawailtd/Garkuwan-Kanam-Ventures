# Phase 1 Implementation - Quick Start Guide

## What Was Implemented

### ✅ Real Product Images (6 images)
Professional product images for:
- Mining trucks (2 models)
- Drilling motors (2 models)
- Cargo trucks (2 models)

Located in: `artifacts/gkc-ventures/public/images/`

### ✅ Database Seeding Script
Complete seed script with 6 real products ready to populate your database.

Location: `lib/db/scripts/seed.ts`

### ✅ Error Boundary Component
Prevents white-screen crashes with user-friendly error UI.

Location: `artifacts/gkc-ventures/src/components/ErrorBoundary.tsx`

### ✅ Input Validation & Rate Limiting
- Stock validation (1-100 quantity limits)
- Strict rate limiting on sensitive endpoints (10 req/min)
- Standard rate limiting on API (100 req/min)
- Global rate limiting (1000 req/min)

Location: `artifacts/api-server/src/middleware/`

### ✅ Security Headers & CORS
- XSS protection, clickjacking prevention
- MIME type sniffing protection
- HSTS in production
- Strict CORS whitelist

---

## Running the Database Seed

### Prerequisites
```bash
# Ensure you have DATABASE_URL set
echo $DATABASE_URL

# If not set, add to your environment:
# DATABASE_URL=postgresql://user:password@host:port/dbname
```

### Run Seed Script
```bash
# From project root
cd /vercel/share/v0-project

# Run the seed script
DATABASE_URL=your_actual_db_url node --loader tsx lib/db/scripts/seed.ts

# Expected output:
# Starting database seed...
# Inserted: Hitachi EH5000AC-3 Mining Dump Truck
# Inserted: Komatsu HD785-8 Mechanical Haul Truck
# Inserted: Industrial Drilling Motor Equipment
# ... (6 products total)
# Database seed completed successfully!
```

### Verify Seeding
```bash
# Query your database to verify products were inserted
psql $DATABASE_URL -c "SELECT id, name, category FROM products LIMIT 10;"
```

---

## Testing the Improvements

### 1. Test Error Boundary
```bash
# Start the dev server
cd artifacts/gkc-ventures
npm run dev

# Navigate to any page
# Error boundary is active - no changes needed to see it
# Errors will display user-friendly error UI instead of blank screen
```

### 2. Test Rate Limiting
```bash
# Terminal 1: Start API server
cd artifacts/api-server
npm run dev

# Terminal 2: Hammer the checkout endpoint
for i in {1..15}; do
  curl -X POST http://localhost:5000/api/orders \
    -H "Content-Type: application/json" \
    -d '{"productId":1,"quantity":1,"customerName":"Test","customerEmail":"test@example.com","customerPhone":"1234567890"}' \
    -w "\nStatus: %{http_code}\n"
  echo "Request $i - Check X-RateLimit headers above"
  sleep 0.5
done

# Expected: First 10 succeed, 11+ get 429 (Too Many Requests)
```

### 3. Test Input Validation
```bash
# Invalid quantity (>100)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":101,"customerName":"Test","customerEmail":"test@example.com","customerPhone":"1234567890"}'
# Response: "Quantity cannot exceed 100"

# Invalid quantity (<1)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":0,"customerName":"Test","customerEmail":"test@example.com","customerPhone":"1234567890"}'
# Response: "Quantity must be at least 1"

# Invalid product
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":999,"quantity":1,"customerName":"Test","customerEmail":"test@example.com","customerPhone":"1234567890"}'
# Response: "Product not found"
```

### 4. Test Security Headers
```bash
# Check response headers
curl -I http://localhost:5000/api/health

# Should see:
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# X-Frame-Options: DENY
# Referrer-Policy: strict-origin-when-cross-origin
# Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
```

---

## Configuration

### Environment Variables

Add to your `.env.development.local` or `.env.production`:

```bash
# Database (required)
DATABASE_URL=postgresql://user:password@host:port/dbname

# API Security (optional - defaults shown)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Payment Gateway (optional)
FLUTTERWAVE_SECRET_KEY=your_secret_key

# Server Config
NODE_ENV=development
```

### CORS Whitelist

To allow additional domains, update `ALLOWED_ORIGINS`:
```bash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourdomain.com,https://api.yourdomain.com
```

---

## File Structure

```
project/
├── artifacts/
│   ├── gkc-ventures/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── ErrorBoundary.tsx          [NEW]
│   │   │   └── App.tsx                        [UPDATED]
│   │   └── public/
│   │       └── images/                        [6 NEW IMAGES]
│   │           ├── mining-truck-1.png
│   │           ├── mining-truck-2.png
│   │           ├── drilling-motor-1.png
│   │           ├── drilling-motor-2.png
│   │           ├── cargo-truck-1.png
│   │           └── cargo-truck-2.png
│   └── api-server/
│       └── src/
│           ├── app.ts                        [UPDATED]
│           ├── middleware/                   [NEW FOLDER]
│           │   ├── rateLimit.ts
│           │   ├── validation.ts
│           │   └── securityHeaders.ts
│           └── routes/
│               └── orders.ts                 [UPDATED]
└── lib/
    └── db/
        └── scripts/
            └── seed.ts                       [NEW]
```

---

## What Gets Protected

### Rate Limiting Applied To:
- **POST /orders** - 10 req/min (strict - checkout endpoint)
- **POST /orders/:id/verify** - 10 req/min (strict - payment)
- **GET /orders/:id** - 100 req/min (standard)
- **All endpoints** - 1000 req/min (global fallback)

### Validation Applied To:
- Product ID must exist and be in stock
- Quantity must be 1-100 items
- Customer email, phone, name required
- All input sanitized and trimmed

### Security Headers Applied To:
- All API responses
- Prevents: XSS, clickjacking, MIME sniffing
- Enforces HTTPS in production
- Restricts browser features

---

## Next Steps

After verifying Phase 1:

1. **Run full test suite** (if tests exist)
   ```bash
   npm run test
   ```

2. **Check for build errors**
   ```bash
   npm run build
   ```

3. **Review the implementation summary**
   ```
   See: IMPLEMENTATION_SUMMARY.md
   ```

4. **Plan Phase 2 improvements**
   - Customer-facing order status page
   - Product search and filtering
   - Enhanced logging with Sentry
   - Database query optimization

---

## Troubleshooting

### Seed Script Fails
```bash
# Check DATABASE_URL is set correctly
echo $DATABASE_URL

# Check database is accessible
psql $DATABASE_URL -c "SELECT 1;"

# Run with verbose logging
DEBUG=* node --loader tsx lib/db/scripts/seed.ts
```

### Rate Limiting Not Working
- Check middleware is imported in `api-server/src/app.ts`
- Verify route handlers have rate limit middleware
- Check client IP is being detected (X-Forwarded-For header)

### Products Not Showing on Homepage
- Verify seed script completed successfully
- Check image paths are correct: `/images/mining-truck-1.png`
- Run: `SELECT * FROM products WHERE featured = true;`

### CORS Errors
```bash
# Check ALLOWED_ORIGINS environment variable
echo $ALLOWED_ORIGINS

# Should include your frontend origin
# Update if needed and restart API server
```

---

## Support & Documentation

- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Database Schema**: See `lib/db/src/schema/`
- **API Routes**: See `artifacts/api-server/src/routes/`
- **Frontend Components**: See `artifacts/gkc-ventures/src/`

---

## Success Checklist

After implementing Phase 1, verify:

- [ ] 6 product images visible in `/public/images/`
- [ ] Seed script runs without errors
- [ ] Products appear on homepage and product listing
- [ ] Error Boundary catches and displays errors gracefully
- [ ] Rate limiting returns 429 after exceeding limits
- [ ] Validation rejects invalid quantities (>100 or <1)
- [ ] Security headers present in API responses
- [ ] CORS allows configured origins
- [ ] No console errors in browser
- [ ] API server starts without errors

---

Once all checks pass, Phase 1 is complete! 🎉

Proceed to Phase 2 for customer-facing features.
