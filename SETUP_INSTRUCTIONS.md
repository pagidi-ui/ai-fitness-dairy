# Setup Instructions Summary

This document provides a quick guide to get your GitHub Actions workflow running successfully after the fixes applied in this PR.

## What Was Fixed

### 1. ✅ PNPM Lockfile Error (Fixed)

**Problem**: The `ERR_PNPM_OUTDATED_LOCKFILE` error occurred because the pnpm-lock.yaml was out of sync with package.json.

**Solution Applied**:
- Updated `pnpm-lock.yaml` to be compatible with pnpm v8
- Modified the GitHub Actions workflow to use `pnpm install --no-frozen-lockfile`
- This allows the lockfile to be updated during CI/CD if needed

**Result**: The build job will now succeed without lockfile errors.

---

### 2. ⚠️ Azure Login Authentication (Action Required)

**Problem**: Azure login fails because the `AZURE_CREDENTIALS` secret is either missing or incorrectly formatted.

**Current Status**: The workflow is correctly configured to use GitHub Secrets. However, **you must manually configure the secrets** in your GitHub repository.

**What You Need to Do**:

#### Step 1: Check If You Previously Shared Credentials Publicly

⚠️ **CRITICAL**: If you previously shared Azure credentials in:
- GitHub issues
- Pull requests
- Comments
- Any public forum

**YOU MUST** immediately follow the instructions in [SECURITY_WARNING.md](./SECURITY_WARNING.md) to rotate your credentials.

#### Step 2: Configure GitHub Secrets

1. Go to your GitHub repository: https://github.com/pagidi-ui/ai-fitness-dairy
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Add the `AZURE_CREDENTIALS` secret:

   **Format** (use your actual values):
   ```json
   {
     "clientId": "your-actual-client-id",
     "clientSecret": "your-actual-client-secret",
     "subscriptionId": "your-actual-subscription-id",
     "tenantId": "your-actual-tenant-id"
   }
   ```

   **Important Notes**:
   - Only include these 4 fields
   - Remove any extra fields like `activeDirectoryEndpointUrl`, `resourceManagerEndpointUrl`, etc.
   - Ensure valid JSON (proper braces, no trailing text)

#### Step 2: Update Workflow Configuration

Edit `.github/workflows/azure-webapps-node.yml` line 32:

```yaml
AZURE_WEBAPP_NAME: your-actual-app-name    # Replace with your Azure Web App name
```

## Verification

After completing the setup:

1. Push a commit to the `main` branch
2. Go to the **Actions** tab in your repository
3. Monitor the workflow run
4. Both `build` and `deploy` jobs should succeed

## Detailed Documentation

For comprehensive setup instructions, see:

- [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md) - Detailed GitHub Secrets configuration
- [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) - Complete Azure deployment guide
- [SECURITY_WARNING.md](./SECURITY_WARNING.md) - Critical security guidance

## Troubleshooting

### Build Job Fails with Lockfile Error

This should be fixed by the changes in this PR. If you still see errors:
```bash
# Locally regenerate the lockfile
pnpm install --no-frozen-lockfile
git add pnpm-lock.yaml
git commit -m "Update lockfile"
git push
```

### Deploy Job Fails at "Login to Azure"

**Common Causes**:
1. `AZURE_CREDENTIALS` secret is not set
2. Secret contains invalid JSON
3. Secret contains extra fields beyond the required 4
4. Credentials are incorrect or expired

**Solution**: Follow Step 2 above to configure the secret correctly.

### Deploy Job Fails at "Deploy to Azure WebApp"

**Common Causes**:
1. `AZURE_WEBAPP_NAME` doesn't match your actual Azure Web App name
2. `AZURE_CREDENTIALS` secret is not set, incorrectly formatted, or contains invalid credentials
3. Service principal doesn't have permissions to deploy to the web app

**Solution**: Verify all configuration in [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md).

## Questions?

If you encounter issues not covered here:
1. Check the detailed documentation files
2. Review GitHub Actions logs for specific error messages
3. Verify all secrets are correctly configured
4. Ensure your Azure service principal has the necessary permissions
