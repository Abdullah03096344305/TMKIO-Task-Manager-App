# Vercel Deployment Guide

## Pre-Deployment Checklist

### 1. ✅ Revoke Exposed Keys (CRITICAL)
Your API keys were visible in `.env.local`. **Regenerate immediately:**

#### Clerk
1. Go to https://dashboard.clerk.com
2. Navigate to **API Keys** 
3. Click **Regenerate Secret Key**
4. Copy new keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_`)
   - `CLERK_SECRET_KEY` (starts with `sk_`)

#### Supabase
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings → API**
4. Under **Project API keys**, regenerate:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### 2. ✅ Update Local .env.local
Replace with new keys:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_new_key
CLERK_SECRET_KEY=sk_test_your_new_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_new_anon_key
```

---

### 3. ✅ Verify .env.example Exists
Check that `.env.example` is in root (no sensitive data):
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

### 4. ✅ Local Build Test
Run build to catch errors early:
```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linted successfully
✓ Edge function ready
```

If errors occur, fix them before proceeding.

---

### 5. ✅ Supabase Configuration

#### CORS Settings
1. Go to **Supabase Dashboard → Settings → API → CORS**
2. Add your Vercel domain:
   ```
   https://your-app.vercel.app
   https://*.vercel.app
   ```

#### Row Level Security (RLS)
1. Go to **SQL Editor** in Supabase
2. Run this to enable RLS on tasks table:
```sql
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tasks"
  ON tasks FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE
  USING (auth.uid()::text = user_id);
```

---

### 6. ✅ Clerk Configuration

#### Allowed URLs
1. Go to **https://dashboard.clerk.com → Domains**
2. Add Vercel URL:
   - Allowed URLs: `https://your-app.vercel.app`
   - API URL: `https://your-app.vercel.app/api/auth/callback`

#### Production Keys (if using Clerk Production)
- Switch from **Test** to **Production** environment
- Get new production-level keys

---

### 7. 🚀 Deploy to Vercel

#### Step 1: Connect GitHub
1. Go to https://vercel.com/dashboard
2. Click **New Project**
3. Select your GitHub repo
4. Click **Import**

#### Step 2: Configure Environment Variables
1. Under **Environment Variables**, add all 4 keys:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_test_...
   CLERK_SECRET_KEY = sk_test_...
   NEXT_PUBLIC_SUPABASE_URL = https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_...
   ```

2. Set Environment: **Production, Preview, Development**
3. Click **Save**

#### Step 3: Deploy
1. Click **Deploy**
2. Wait for build to complete
3. If build fails, check error logs

---

### 8. ✅ Post-Deployment Testing

#### Test Authentication
1. Visit your Vercel URL
2. Click **Sign Up**
3. Create account with test email
4. Verify redirect to dashboard

#### Test Task Operations
1. Create a task → Should appear in grid
2. Delete a task → Should remove from UI
3. Refresh page → Task list should persist
4. Wait 30+ seconds → Realtime should sync

#### Test Admin Page
1. Go to `/admin/files` without admin role
2. Should see "Access denied" message
3. (Only users with admin role in Clerk can access)

#### Test Error Handling
1. Disable internet (DevTools → Offline)
2. Try to create task
3. Should show error message (not alert)
4. Re-enable internet
5. Error should dismiss

---

### 9. ⚠️ Known Issues & Solutions

#### "Realtime connection failed"
**Symptom:** Tasks don't sync across tabs
**Cause:** Supabase realtime connection dropped on cold start
**Solution:** Already implemented fallback to polling (30-second polling)

#### "User not authenticated"
**Symptom:** Tasks page shows 404 error
**Cause:** Middleware not properly redirecting to sign-in
**Solution:** Clear browser cache and re-login

#### "CORS error in console"
**Symptom:** Tasks don't load, CORS error in console
**Cause:** Supabase CORS not configured for Vercel domain
**Solution:** Add domain to Supabase CORS settings (see Step 5)

#### "Cold start slow load"
**Symptom:** First load takes 5+ seconds
**Cause:** Vercel function cold start + Supabase connection init
**Solution:** Expected behavior, second load will be faster

---

### 10. 📊 Monitoring & Logging

#### View Logs
1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** → Latest deployment
3. Click **Runtime logs** to see errors

#### Error Tracking (Optional)
Install Sentry for better error monitoring:
```bash
npm install @sentry/nextjs
```

Then create `sentry.server.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV,
});
```

---

### 11. ✅ Vercel Deployment Checklist
- [ ] Revoked old Clerk keys
- [ ] Revoked old Supabase keys
- [ ] Updated `.env.local` with new keys
- [ ] `.env.example` exists in repo
- [ ] Local `npm run build` succeeds
- [ ] Supabase CORS configured
- [ ] Supabase RLS policies created
- [ ] Clerk domains configured
- [ ] Environment variables added to Vercel
- [ ] Deployment completed
- [ ] Auth flow tested
- [ ] Task CRUD tested
- [ ] Admin access control tested
- [ ] Error handling verified
- [ ] Logs accessible in Vercel dashboard

---

## Environment Variables Summary

| Variable | Required | Scope | Source |
|----------|----------|-------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Public | Clerk Dashboard |
| `CLERK_SECRET_KEY` | Yes | Private | Clerk Dashboard |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Public | Supabase Settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public | Supabase Settings |

---

## Rollback Plan

If deployment fails:

1. **In Vercel Dashboard:**
   - Go to **Deployments**
   - Find last working deployment
   - Click **⋯ → Promote to Production**

2. **Check Logs:**
   - Click deployment → **Runtime logs**
   - Search for error messages

3. **Fix Locally:**
   - Resolve issue
   - Test with `npm run build`
   - Git push
   - Vercel auto-deploys

---

## Performance Tips

- [ ] Enable **Vercel Analytics** (dashboard > Settings > Analytics)
- [ ] Use **Incremental Static Regeneration (ISR)** for landing page
- [ ] Enable **Image Optimization** for avatars
- [ ] Monitor **Bundle Size** in Vercel dashboard

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Clerk Docs:** https://clerk.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
