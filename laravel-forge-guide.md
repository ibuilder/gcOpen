# Deploying gcOpen Applications on Laravel Forge

This guide provides detailed instructions for deploying gcOpen applications using Laravel Forge, a server management tool that simplifies the deployment process for Laravel applications.

## Prerequisites

Before you begin, make sure you have:

1. A Laravel Forge account (subscription required)
2. A cloud provider account (AWS, DigitalOcean, Linode, etc.)
3. A domain name for your application
4. GitHub/GitLab/Bitbucket repository with your gcOpen application

## Step 1: Link Your Server Provider

1. Log in to your Laravel Forge account
2. Navigate to "Server Providers" in the left sidebar
3. Click "Connect Provider" and select your cloud provider
4. Follow the instructions to authorize Forge to manage your server provider account

## Step 2: Create a New Server

1. Click on "Servers" in the left sidebar
2. Click "Create Server"
3. Select your server provider
4. Choose your server options:
   - **Server Provider**: Your linked provider
   - **Region**: Choose the closest region to your users
   - **Size**: 2GB RAM / 1 CPU minimum recommended
   - **PHP Version**: PHP 8.1
   - **Database**: MySQL 8.0
   - **Load Balancer**: No (unless you need high availability)
   - **Scheduler**: Yes (for Laravel scheduled tasks)
   - **Redis**: Optional (for caching and queues)
   - **Server Name**: Choose a meaningful name (e.g., gcopen-production)

5. Click "Create Server" and wait for Forge to provision your server

## Step 3: Create a New Site

Once your server is provisioned:

1. Click on your server name
2. Under the "Sites" tab, click "Add Site"
3. Enter your domain name (e.g., gcopen.yourdomain.com)
4. Select PHP 8.1
5. Leave "Create Database" unchecked (we'll create it manually)
6. Click "Add Site"

## Step 4: Create a Database

1. Click on the "Database" tab
2. Click "Create Database"
3. Enter database details:
   - **Database Name**: gcopen_db
   - **Database User**: gcopen_user
   - **Password**: Generate a secure password (or enter your own)
4. Click "Create Database"

## Step 5: Install Repository

1. Click on your site name
2. Navigate to the "Git Repository" tab
3. Click "Install Repository"
4. Select your repository provider (GitHub, GitLab, or Bitbucket)
5. Select the repository that contains your gcOpen application
6. Choose the branch to deploy (usually main or master)
7. Click "Install Repository"

## Step 6: Configure Environment Variables

1. Click on the "Environment" tab
2. Laravel Forge provides a starter .env file, update it with your settings:
   - Set APP_ENV to production
   - Set APP_DEBUG to false
   - Set APP_URL to your domain
   - Update DB_DATABASE, DB_USERNAME, and DB_PASSWORD with the values from step 4
   - Configure mail settings, cache, queue, etc. as needed
3. Click "Save Environment"

## Step 7: Configure Deployment Script

1. Click on the "Deploy" tab
2. The default script should work for most Laravel applications, but you may want to customize it:

```bash
cd /home/forge/your-site.com
git pull origin $FORGE_SITE_BRANCH

composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

npm ci
npm run build

php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link

# Optional: Clear Redis cache
# redis-cli flushall
```

3. Click "Save Script"

## Step 8: Enable Quick Deploy

1. Toggle "Quick Deploy" to "On"
2. This will automatically deploy your application when you push to the configured branch

## Step 9: Set Up SSL Certificate

1. Click on the "SSL" tab
2. Click "LetsEncrypt"
3. Enter your email address
4. Select both domain variations (with and without www)
5. Click "Obtain Certificate"
6. Once the certificate is issued, click "Activate"

## Step 10: Configure Scheduler (if needed)

The Laravel scheduler should already be set up during server creation. Verify by checking the "Scheduler" tab.

## Step 11: Configure Queue Workers (if needed)

If your application uses queues:

1. Click on the "Queue" tab
2. Click "Add Worker"
3. Configure the worker:
   - **Connection**: Choose your queue connection (usually database or redis)
   - **Queue**: default (or your custom queue name)
   - **Processes**: 1 (or more depending on your needs)
   - **Sleep**: 3
   - **Timeout**: 60
   - **Tries**: 3
4. Click "Create Worker"

## Step 12: First Deployment

1. Click on the "Deploy" tab
2. Click "Deploy Now"
3. Wait for the deployment to complete and check the deployment log for any errors

## Step 13: Set Up Forge Daemon (optional)

For critical applications, you may want to set up Forge Daemon to monitor your site:

1. Click on the "Monitoring" tab
2. Click "Install Daemon"
3. Configure monitoring settings as needed
4. Click "Install Daemon"

## Step 14: Set Up Backup (optional)

To configure database backups:

1. Click on the "Backups" tab
2. Click "Create Backup Configuration"
3. Configure backup settings:
   - **Database**: Select your database
   - **Frequency**: Daily (recommended)
   - **Time**: Choose a time with low traffic
   - **Retention**: 7 days (or as needed)
4. Click "Create"

## Troubleshooting Common Issues

### Deployment Failures

If your deployment fails:
1. Check the deployment log for errors
2. Ensure your .env file is properly configured
3. Verify that your repository is accessible to Forge
4. Check that composer.json includes all required dependencies

### Permission Issues

If you encounter permission issues:
1. SSH into your server using the SSH key provided by Forge
2. Run the following commands:
   ```bash
   sudo chown -R forge:forge /home/forge/your-site.com/storage
   sudo chown -R forge:forge /home/forge/your-site.com/bootstrap/cache
   sudo chmod -R 775 /home/forge/your-site.com/storage
   sudo chmod -R 775 /home/forge/your-site.com/bootstrap/cache
   ```

### Database Connection Issues

If your application can't connect to the database:
1. Verify database credentials in the .env file
2. Check that the database exists and the user has proper permissions
3. Ensure your server's firewall allows connections to the database port

## Maintenance Mode

When performing maintenance or updates:

1. SSH into your server
2. Navigate to your site directory
3. Run `php artisan down` to put the site in maintenance mode
4. Perform your maintenance tasks
5. Run `php artisan up` to bring the site back online

## Conclusion

Laravel Forge provides a streamlined way to deploy and manage your gcOpen applications. It handles server provisioning, deployment, SSL certificates, and other common tasks, allowing you to focus on developing your application rather than server administration.

Key benefits of using Laravel Forge:
- Simplified server management
- Automated deployments via Git integration
- Easy SSL certificate management
- Built-in monitoring and backup solutions
- Integration with Laravel's ecosystem

Remember to:
- Keep your application up to date
- Monitor server resources
- Regularly backup your database
- Review server logs for issues

For more advanced configurations or custom needs, you can always SSH into your server and make manual adjustments.