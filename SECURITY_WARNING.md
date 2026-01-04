# ⚠️ CRITICAL SECURITY WARNING

## Credential Security Incident

**If you have previously shared Azure credentials publicly (e.g., in issues, pull requests, or any public forum), you MUST take immediate action.**

## Immediate Actions Required

### 1. Rotate Your Azure Service Principal Credentials

Your current credentials are compromised if they were shared publicly. You must reset them immediately:

```bash
# Reset the service principal credentials
az ad sp credential reset --id <your-service-principal-client-id>
```

This command will generate a new `clientSecret`. **Save this new secret immediately** as you won't be able to retrieve it later.

### 2. Update GitHub Secrets

After rotating credentials:

1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Delete the old `AZURE_CREDENTIALS` secret
3. Create a new `AZURE_CREDENTIALS` secret with the updated credentials:

```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-NEW-client-secret-from-step-1",
  "subscriptionId": "your-subscription-id",
  "tenantId": "your-tenant-id"
}
```

### 3. Review Azure Activity

Check your Azure subscription for any unauthorized activity:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **Sign-ins**
3. Review recent authentication attempts
4. Check your resources for any unauthorized changes

### 4. Consider Creating a New Service Principal

If you're uncertain about the security of your current service principal:

```bash
# Create a new service principal
az ad sp create-for-rbac --name "ai-fitness-dairy-new" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
  --sdk-auth
```

**Important**: Only keep these four fields from the output:
- `clientId`
- `clientSecret`
- `subscriptionId`
- `tenantId`

Then delete the old service principal:

```bash
# Delete the compromised service principal
az ad sp delete --id <old-service-principal-client-id>
```

## Best Practices to Prevent Future Incidents

### ✅ DO:

1. **Always use GitHub Secrets** for sensitive credentials
2. **Never commit credentials** to code, even in example files
3. **Use placeholder values** in documentation (e.g., `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
4. **Rotate credentials regularly** (at least every 90 days)
5. **Use principle of least privilege** for service principals
6. **Enable Azure AD logging and monitoring**
7. **Review repository access** regularly

### ❌ DON'T:

1. **Never share credentials** in:
   - GitHub issues
   - Pull requests
   - Comments
   - Chat messages
   - Emails
   - Screenshots
2. **Never commit** `.env` files with real credentials
3. **Never log credentials** in application code or CI/CD logs
4. **Never use production credentials** for development

## What This Repository Does Correctly

✅ The GitHub Actions workflow in this repository is configured securely:
- Uses `${{ secrets.AZURE_CREDENTIALS }}` to reference encrypted secrets
- Does not contain any hardcoded credentials
- Follows security best practices

✅ Documentation uses placeholder values:
- All example credentials use `xxxxxxxx` format
- Clear warnings about not committing credentials

## Verification Checklist

After taking the actions above, verify:

- [ ] Azure service principal credentials have been rotated
- [ ] GitHub `AZURE_CREDENTIALS` secret has been updated
- [ ] Old credentials no longer work (test by trying to authenticate with them)
- [ ] New credentials work correctly (workflow runs successfully)
- [ ] No unauthorized Azure activity detected
- [ ] All team members are aware of the incident
- [ ] Credentials rotation is scheduled for the future

## Additional Resources

- [Azure Service Principal Security Best Practices](https://docs.microsoft.com/en-us/azure/active-directory/develop/identity-platform-integration-checklist)
- [GitHub Secrets Security](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Rotating Azure Credentials](https://docs.microsoft.com/en-us/cli/azure/ad/sp/credential)

## Support

If you need immediate assistance:
1. Contact Azure Support
2. Review [Azure Security Center](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade)
3. Check [GitHub Security Advisories](https://github.com/advisories)
