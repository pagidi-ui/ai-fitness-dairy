# Azure Deployment Configuration Guide

This guide explains how to configure Azure credentials for deploying the AI Fitness Dairy application.

## Prerequisites

- An Azure account with an active subscription
- A resource group in Azure
- An Azure App Service web app created
- Azure CLI installed (optional, for service principal creation)

## Step 1: Create Azure Service Principal

If you haven't already created a service principal, run the following command in Azure CLI:

```bash
az ad sp create-for-rbac --name "ai-fitness-dairy" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
  --sdk-auth
```

This will output JSON credentials that may include multiple fields, but for GitHub Actions, you **only need these four fields**:

```json
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

**⚠️ IMPORTANT Notes:**
- **Keep these credentials secure! Never commit them to git.**
- **Only use the four fields shown above** for the `AZURE_CREDENTIALS` secret in GitHub Actions
- If the Azure CLI output includes additional fields like `activeDirectoryEndpointUrl`, `resourceManagerEndpointUrl`, etc., you should **remove them** and only keep the four required fields
- Ensure the JSON is valid (properly closed braces, no trailing text or comments)

## Step 2: Configure GitHub Secrets

For GitHub Actions deployment, you need to add these credentials as secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Required Secrets:

#### AZURE_CREDENTIALS
- **Name**: `AZURE_CREDENTIALS`
- **Value**: A JSON object with **only** the four required fields from step 1:
  ```json
  {
    "clientId": "your-client-id",
    "clientSecret": "your-client-secret",
    "subscriptionId": "your-subscription-id",
    "tenantId": "your-tenant-id"
  }
  ```
  **Important**: Remove any extra fields like `activeDirectoryEndpointUrl`, `resourceManagerEndpointUrl`, etc. if present in the Azure CLI output

#### AZURE_WEBAPP_PUBLISH_PROFILE
- **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE`
- **Value**: Download this from Azure Portal:
  1. Go to your Azure App Service
  2. Click on "Download publish profile"
  3. Open the downloaded `.publishsettings` file
  4. Copy its entire contents and paste as the secret value

## Step 3: Update Workflow Environment Variables

Edit `.github/workflows/azure-webapps-node.yml` and update:

```yaml
env:
  AZURE_WEBAPP_NAME: your-actual-app-name    # Replace with your Azure Web App name
```

## Step 4: Local Development Setup (Optional)

For local development with Azure services:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your actual credentials:
   ```
   AZURE_CLIENT_ID=your-actual-client-id
   AZURE_CLIENT_SECRET=your-actual-client-secret
   AZURE_SUBSCRIPTION_ID=your-actual-subscription-id
   AZURE_TENANT_ID=your-actual-tenant-id
   AZURE_WEBAPP_NAME=your-actual-app-name
   ```

3. `.env.local` is already in `.gitignore` and will NOT be committed to git

## Step 5: Deploy

Once configured, deployments happen automatically:

- **Automatic deployment**: Push to the `main` branch triggers deployment
- **Manual deployment**: Go to Actions tab → Select "Azure Web Apps Deploy" → Click "Run workflow"

## Security Best Practices

✅ **DO:**
- Store credentials in GitHub Secrets
- Use `.env.local` for local development
- Rotate credentials periodically
- Use principle of least privilege for service principal roles

❌ **DON'T:**
- Never commit credentials to git
- Never share credentials in plain text
- Never commit `.env.local` or `.env` files
- Never log credentials in application code

## Troubleshooting

### Deployment fails with authentication error
- **Verify JSON format**: The `AZURE_CREDENTIALS` secret must contain **only** these four fields:
  ```json
  {
    "clientId": "...",
    "clientSecret": "...",
    "subscriptionId": "...",
    "tenantId": "..."
  }
  ```
  Remove any additional fields like `activeDirectoryEndpointUrl`, `managementEndpointUrl`, etc.
- Verify that `AZURE_CREDENTIALS` secret contains valid JSON (no trailing text, properly closed braces)
- Check that the service principal has contributor access to the resource group
- Ensure the subscription is active

### Cannot find Azure Web App
- Verify `AZURE_WEBAPP_NAME` matches your actual app name in Azure
- Ensure the web app exists in the correct subscription

### Publish profile error
- Download a fresh publish profile from Azure Portal
- Ensure you copied the entire contents of the `.publishsettings` file

## Additional Resources

- [Azure Login Action](https://github.com/Azure/login)
- [Azure Web Apps Deploy Action](https://github.com/Azure/webapps-deploy)
- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
