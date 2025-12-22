# 🔐 GHL TOKEN REVOCATION - STEP-BY-STEP GUIDE

**CRITICAL:** Follow these exact steps to revoke the exposed token and secure your account.

---

## 🚨 STEP 1: LOG INTO GOHIGHLEVEL

1. Open your browser
2. Go to: **https://app.gohighlevel.com/**
3. Log in with your credentials
4. Wait for dashboard to load

---

## 🔍 STEP 2: NAVIGATE TO API SETTINGS

**Desktop Navigation:**
1. Click the **gear icon** (⚙️) in the bottom left corner
2. From the menu, select **"Settings"**
3. In the left sidebar, scroll down to find **"Integrations"** section
4. Click on **"API"** or **"API Keys"**

**OR use direct link:**
- https://app.gohighlevel.com/location/YOUR_LOCATION_ID/settings/api-keys

---

## 🗑️ STEP 3: FIND AND REVOKE THE EXPOSED TOKEN

### Look for this token:
```
pit-0ff5306e-bd54-4040-9b51-004d7493d193
```

### Visual Guide:
- You'll see a list of API keys/tokens
- Each token shows:
  - **Name** (if you named it)
  - **Token** (partial, like `pit-0ff5306e...`)
  - **Created date**
  - **Actions** (trash icon or revoke button)

### To Revoke:
1. Find the row with `pit-0ff5306e...`
2. Click the **🗑️ trash icon** on the right
3. Confirm deletion in the popup
4. Token is now revoked ✅

---

## ✅ STEP 4: GENERATE NEW API TOKEN

### Create New Token:
1. Still on the API Keys page
2. Click **"Create API Key"** or **"+ New"** button
3. Fill in the form:
   - **Name:** `Nova Titan Website API - Dec 2024`
   - **Description:** `For website forms and automation`
   - **Permissions:** Select all needed (Forms, Contacts, Opportunities)
4. Click **"Create"** or **"Generate"**

### Copy the Token:
⚠️ **IMPORTANT:** You'll only see this once!

1. A new token will appear (starts with `pit-`)
2. Click **"Copy"** button
3. Paste it somewhere safe temporarily (you'll use it next)

**Example format:**
```
pit-1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6
```

---

## 🔐 STEP 5: STORE NEW TOKEN SECURELY

### Option A: Store in Local Environment (Recommended)

**On Mac/Linux:**
```bash
# Add to your shell profile (~/.bashrc or ~/.zshrc)
echo 'export GHL_API_TOKEN="pit-YOUR-NEW-TOKEN-HERE"' >> ~/.bashrc
echo 'export GHL_LOCATION_ID="l9FXVehNOazAR0Uexx8J"' >> ~/.bashrc

# Reload shell
source ~/.bashrc
```

**On Windows:**
```powershell
# Set environment variable permanently
setx GHL_API_TOKEN "pit-YOUR-NEW-TOKEN-HERE"
setx GHL_LOCATION_ID "l9FXVehNOazAR0Uexx8J"
```

### Option B: Store in .env File (For Development)

```bash
cd /home/user/webapp

# Create .env file
cat > .env << 'EOF'
GHL_LOCATION_ID=l9FXVehNOazAR0Uexx8J
GHL_API_TOKEN=pit-YOUR-NEW-TOKEN-HERE
GHL_API_VERSION=2021-07-28
EOF

# Verify it's in .gitignore
grep -q ".env" .gitignore && echo "✅ .env is gitignored" || echo "⚠️ Add .env to .gitignore!"
```

---

## 🧪 STEP 6: TEST NEW TOKEN

### Test with API Call:
```bash
# Test listing forms
curl -X GET "https://services.leadconnectorhq.com/forms/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_TOKEN}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json"

# Expected: JSON response with your forms
# If error: Token may be invalid or not set correctly
```

### Verify Token Works:
- ✅ Returns JSON with forms → **Success!**
- ❌ Returns 401 Unauthorized → **Token not set or invalid**
- ❌ Returns 403 Forbidden → **Token lacks permissions**

---

## 🔍 STEP 7: VERIFY OLD TOKEN IS REVOKED

### Test Old Token (Should Fail):
```bash
# This should return an error
curl -X GET "https://services.leadconnectorhq.com/forms/?locationId=l9FXVehNOazAR0Uexx8J" \
  -H "Authorization: Bearer pit-0ff5306e-bd54-4040-9b51-004d7493d193" \
  -H "Version: 2021-07-28"

# Expected: 401 Unauthorized or "Invalid token"
```

If old token still works → Go back to Step 3 and revoke it again!

---

## 📋 STEP 8: UPDATE YOUR WORKFLOW

### Update GHL Forms Implementation:

All your GHL API calls should now use environment variables:

```bash
# Example: List all forms
curl -X GET "https://services.leadconnectorhq.com/forms/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_TOKEN}" \
  -H "Version: ${GHL_API_VERSION}"

# Example: Get pipelines
curl -X GET "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_TOKEN}" \
  -H "Version: ${GHL_API_VERSION}"
```

---

## ✅ VERIFICATION CHECKLIST

After completing all steps, verify:

- [ ] Logged into GHL successfully
- [ ] Navigated to API Keys page
- [ ] Found old token `pit-0ff5306e...`
- [ ] Clicked revoke/delete button
- [ ] Confirmed token deletion
- [ ] Clicked "Create New API Key"
- [ ] Copied new token immediately
- [ ] Stored new token in environment variable
- [ ] Tested new token with API call
- [ ] Verified old token no longer works
- [ ] Updated .gitignore to include .env
- [ ] Confirmed no tokens in Git repository

---

## 🔒 SECURITY BEST PRACTICES

### DO ✅
- Store tokens in environment variables
- Use `.env` files for local development
- Add `.env` to `.gitignore`
- Rotate tokens every 90 days
- Use descriptive names for tokens
- Limit token permissions to only what's needed
- Monitor GitGuardian alerts

### DON'T ❌
- Commit tokens to Git
- Hardcode tokens in source code
- Share tokens via email/Slack
- Use the same token across environments
- Leave unused tokens active
- Ignore security alerts

---

## 🆘 TROUBLESHOOTING

### "I can't find the API Keys page"
- Try direct URL: https://app.gohighlevel.com/location/{YOUR_LOCATION_ID}/settings/api-keys
- Or: Settings → Integrations → API

### "I don't see the old token"
- It may have already been revoked
- Check "Revoked Tokens" or "Inactive" tab
- If gone, that's good - just create a new one

### "New token doesn't work"
- Verify you copied it correctly (no spaces/line breaks)
- Check environment variable is set: `echo $GHL_API_TOKEN`
- Ensure token has correct permissions

### "I can't revoke the token"
- You may need admin/owner permissions
- Contact GHL support if needed

---

## 📞 SUPPORT CONTACTS

**GHL Support:**
- Help Center: https://help.gohighlevel.com/
- Support Email: support@gohighlevel.com
- Community: https://www.facebook.com/groups/gohighlevel

**Security Questions:**
- Check: `SECURITY_INCIDENT_RESPONSE.md`
- Email: info@novatitan.net

---

## 🎯 SUMMARY

**What You Need to Do:**
1. ⚠️ **NOW:** Log into GHL and revoke `pit-0ff5306e...`
2. ⚠️ **NOW:** Generate new API token
3. ⚠️ **NOW:** Store new token in environment variable
4. ✅ Test new token works
5. ✅ Verify old token is revoked

**Time Required:** 5-10 minutes

**Difficulty:** Easy (just follow screenshots)

---

**After you complete this, reply with:** ✅ "Token revoked and new token stored"

Then I'll help you test everything is working correctly!

---

**END OF GUIDE**

*Last Updated: December 11, 2024*
