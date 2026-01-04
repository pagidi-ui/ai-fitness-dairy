# GitHub Secrets Configuration

This document explains how to configure GitHub Secrets for Azure deployment.

## Your Azure Credentials Format

You should have received or generated Azure credentials. The Azure CLI may output many fields, but for GitHub Actions, **you only need these four fields**:

```json
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

**⚠️ IMPORTANT:**
- Only use these four fields in the `AZURE_CREDENTIALS` secret
- If your Azure CLI output includes additional fields (like `activeDirectoryEndpointUrl`, `resourceManagerEndpointUrl`, `managementEndpointUrl`, etc.), **do not include them**
- Ensure the JSON is properly formatted with matching braces and no trailing text

## How to Add These Credentials to GitHub

### Step 1: Access Repository Secrets

1. Go to your GitHub repository settings
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add AZURE_CREDENTIALS Secret

1. Click **New repository secret**
2. Name: `AZURE_CREDENTIALS`
3. Value: Paste the **four required fields only** in JSON format
4. Click **Add secret**

**Example of what to paste (use your actual credentials):**
```json
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "your-client-secret-here",
  "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

**⚠️ Critical**: 
- Only include the four fields shown above
- Do not include fields like `activeDirectoryEndpointUrl`, `managementEndpointUrl`, etc.
- Ensure the JSON is valid (proper braces, no trailing text or comments)

### Step 2: Update Workflow Configuration

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
- **Only include the four required fields**: `clientId`, `clientSecret`, `subscriptionId`, `tenantId`
- Remove any extra fields like `activeDirectoryEndpointUrl`, `resourceManagerEndpointUrl`, `managementEndpointUrl`, etc.
- Verify there are no extra spaces, trailing text, or characters after the closing brace
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
