# GitHub Secrets Configuration

This document explains how to configure GitHub Secrets for Azure deployment.

## Your Azure Credentials Format

You should have received or generated Azure credentials in this JSON format:

```json
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

## How to Add These Credentials to GitHub

### Step 1: Access Repository Secrets

1. Go to your GitHub repository settings
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add AZURE_CREDENTIALS Secret

1. Click **New repository secret**
2. Name: `AZURE_CREDENTIALS`
3. Value: Paste the **ENTIRE JSON** credential object (all lines from `{` to `}`)
4. Click **Add secret**

Example of what to paste (use your actual credentials from YOUR_CREDENTIALS.md):
```json
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

### Step 3: Add AZURE_WEBAPP_PUBLISH_PROFILE Secret

1. Click **New repository secret** again
2. Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
3. Value: Download from Azure Portal:
   - Go to [Azure Portal](https://portal.azure.com)
   - Navigate to your App Service
   - Click **Download publish profile**
   - Open the downloaded `.publishsettings` file in a text editor
   - Copy the entire contents
   - Paste as the secret value
4. Click **Add secret**

### Step 4: Update Workflow Configuration

Edit `.github/workflows/azure-webapps-node.yml` and change line 32:

```yaml
AZURE_WEBAPP_NAME: your-actual-app-name-here
```

Replace `your-actual-app-name-here` with your actual Azure Web App name.

## Verification

After adding the secrets:

1. Go to the **Actions** tab in your repository
2. You should see the "Azure Web Apps Deploy" workflow
3. Click **Run workflow** to manually trigger a deployment
4. Monitor the workflow run to ensure it completes successfully

## Security Notes

✅ **Secrets are secure**:
- GitHub encrypts secrets at rest
- Secrets are not visible in logs
- Only workflows can access secrets
- Secrets are not exposed in pull requests from forks

⚠️ **Important reminders**:
- Never commit credentials to your repository code
- Never share secrets via email or chat
- Rotate credentials periodically
- Use the principle of least privilege for service principal permissions

## Troubleshooting

### "Secret not found" error
- Ensure the secret name exactly matches: `AZURE_CREDENTIALS` (all caps, with underscore)
- Verify you added the secret to the correct repository

### "Invalid JSON" error
- Ensure you copied the complete JSON structure including opening `{` and closing `}`
- Verify there are no extra spaces or characters
- Make sure all quotes are standard double quotes (not smart quotes)

### Authentication failed
- Verify your service principal credentials are correct
- Check that the service principal has contributor access to your Azure resource group
- Ensure the subscription is active

## Additional Help

If you need further assistance:
- Check the [Azure Login Action documentation](https://github.com/Azure/login)
- Review [GitHub Secrets documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for comprehensive deployment guide
