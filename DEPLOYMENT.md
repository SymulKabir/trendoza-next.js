# Trendoza — Deployment Guide

This document describes how to deploy the **Trendoza** Next.js application in a production environment with:

* Next.js 16
* Node.js 22
* TypeScript
* Prisma 7
* MariaDB/MySQL
* Tailwind CSS
* Stripe
* Nginx
* PM2

---

# 1. Production Requirements

Before deployment, make sure the production server has:

* Ubuntu 22.04 or newer
* Node.js 22.x
* npm 10.x
* MySQL/MariaDB
* Git
* Nginx
* PM2
* A configured domain
* SSL certificate
* Required Stripe credentials

Recommended minimum server:

```text
CPU:    2 vCPU
RAM:    2 GB
Disk:   20 GB+
OS:     Ubuntu 22.04+
```

For larger production traffic, increase CPU/RAM according to application usage.

---

# 2. Server Preparation

Update the server:

```bash
sudo apt update
sudo apt upgrade -y
```

Install required packages:

```bash
sudo apt install -y git curl nginx
```

Verify:

```bash
git --version
nginx -v
```

---

# 3. Install Node.js 22

Install Node.js 22:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

Expected:

```text
Node.js: v22.x
npm:     v10.x
```

---

# 4. Install PM2

Install PM2 globally:

```bash
sudo npm install -g pm2
```

Verify:

```bash
pm2 -v
```

---

# 5. Install MySQL / MariaDB

If the production database is hosted on the same server, install MariaDB:

```bash
sudo apt install -y mariadb-server mariadb-client
```

Start the service:

```bash
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

Check status:

```bash
sudo systemctl status mariadb
```

---

# 6. Create Production Database
#### Login as MySQL root
```bash
mysql -u root -p
# or 
docker exec -it my-mysql mysql -u root -p
```
Enter your password

Check SQL version:
```sql
SELECT VERSION();
```
You will see:
```
8.4.9
```
#### Create Database

```sql
CREATE DATABASE IF NOT EXISTS trendoza
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```
Check:
```sql
SHOW DATABASES;
```

#### Create separate user for Prisma
```sql
CREATE USER 'prisma_user'@'%'
IDENTIFIED BY 'Prisma12345';
```
#### Grant permission for database
```sql
GRANT ALL PRIVILEGES ON *.*
TO 'prisma_user'@'%';
```
Then:
```sql
FLUSH PRIVILEGES;
```

#### Verify user 
```sql
SELECT user, host, plugin
FROM mysql.user
WHERE user = 'prisma_user';
```

Expected:
```
+-------------+------+-----------------------+
| user        | host | plugin                |
+-------------+------+-----------------------+
| prisma_user | %    | caching_sha2_password |
+-------------+------+-----------------------+
```

#### Verify Permission
```sql
SHOW GRANTS FOR 'prisma_user'@'%';
```
Expected:
```
GRANT ALL PRIVILEGES ON *.* TO `prisma_user`@`%`
```
#### Then exit
```sql
exit;
```

---

# 7. Test Database Connection

Test the new database user:

```bash
mysql -u prisma_user -p -h 127.0.0.1 -P 3306
```

Then:

```sql
SHOW DATABASES;
```

You should see:

```text
trendoza
```

Exit:

```sql
EXIT;
```

---

# 8. Clone the Application

Create the application directory:

```bash
sudo mkdir -p /var/www
```

Go to the directory:

```bash
cd /var/www
```

Clone the repository:

```bash
sudo git clone <YOUR_REPOSITORY_URL> trendoza
```

Change ownership:

```bash
sudo chown -R $USER:$USER /var/www/trendoza
```

Enter the project:

```bash
cd /var/www/trendoza
```

---

# 9. Install Dependencies

Install production dependencies:

```bash
npm ci
```

If `package-lock.json` is not available, use:

```bash
npm install
```

---

# 10. Configure Environment Variables

Create the production environment file:

```bash
nano .env
```

Example:

```env
STORAGE_DIR=/var/www/storage/trendoza

JWT_SECRET=YOUR_STRONG_PRODUCTION_SECRET

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY

# MySQL / MariaDB
DB_HOST=127.0.0.1
DB_USER=trendoza_user
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=trendoza
DB_PORT=3306
```

### Important

Never commit `.env` to Git.

Verify:

```bash
git status
```

Your `.gitignore` should contain:

```gitignore
.env
.env.local
.env.production
.env.production.local
```

---

# 11. Configure Storage

The application uses:

```env
STORAGE_DIR=/var/www/storage/trendoza
```

Create the directory:

```bash
sudo mkdir -p /var/www/storage/trendoza
```

Set ownership:

```bash
sudo chown -R $USER:$USER /var/www/storage/trendoza
```

Set appropriate permissions:

```bash
chmod -R 755 /var/www/storage/trendoza
```

---

# 12. Generate Prisma Client

Run:

```bash
npx prisma generate
```

Verify that Prisma Client is generated successfully.

---

# 13. Run Database Migrations

For an existing production migration history, use:

```bash
npx prisma migrate deploy
```

Do **not** use:

```bash
npx prisma migrate dev
```

on production.

`migrate dev` is intended for development environments.

---

# 14. Seed the Database

If the production database needs initial product/data records:

```bash
npx prisma db seed
```

Your configured seed command is:

```text
tsx prisma/seed/product/index.ts
```

Therefore:

```bash
npx prisma db seed
```

will execute:

```text
prisma/seed/product/index.ts
```

### Important

Only run the seed command if the seed script is safe to run against an existing production database.

If the seed script inserts duplicate records every time it runs, don't repeatedly execute it in production.

---

# 15. Verify Prisma Database Connection

Before building the application, you can open Prisma Studio if required:

```bash
npx prisma studio
```

For production environments, make sure the Prisma database connection is working before continuing.

---

# 16. Build the Next.js Application

Run:

```bash
npm run build
```

A successful build should finish without errors.

If the build succeeds, start the application:

```bash
npm start
```

By default, Next.js runs on:

```text
http://localhost:3000
```

Stop it with:

```text
CTRL + C
```

---

# 17. Run Next.js with PM2

Start the application using PM2:

```bash
pm2 start npm --name "trendoza" -- start
```

Check the process:

```bash
pm2 status
```

View logs:

```bash
pm2 logs trendoza
```

Restart:

```bash
pm2 restart trendoza
```

Stop:

```bash
pm2 stop trendoza
```

Delete:

```bash
pm2 delete trendoza
```

---

# 18. Configure PM2 Startup

Save the current PM2 processes:

```bash
pm2 save
```

Generate the startup command:

```bash
pm2 startup
```

PM2 will display a command similar to:

```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u YOUR_USER --hp /home/YOUR_USER
```

Run the command shown by PM2.

Then:

```bash
pm2 save
```

Now the application will automatically restart after a server reboot.

---

# 19. Configure Nginx

Create an Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/trendoza
```

Use:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
    }
}
```

Replace:

```text
example.com
```

with your actual domain.

---

# 20. Enable Nginx Configuration

Create the symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/trendoza /etc/nginx/sites-enabled/trendoza
```

Test the configuration:

```bash
sudo nginx -t
```

If everything is correct:

```text
syntax is ok
test is successful
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---

# 21. Configure DNS

At your domain provider, create an `A` record:

```text
Type: A
Name: @
Value: YOUR_SERVER_IP
```

For `www`:

```text
Type: A
Name: www
Value: YOUR_SERVER_IP
```

DNS propagation may take some time.

Verify:

```bash
dig example.com
```

or:

```bash
nslookup example.com
```

---

# 22. Configure SSL

Install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Request an SSL certificate:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot will automatically configure HTTPS for Nginx.

Test automatic renewal:

```bash
sudo certbot renew --dry-run
```

---

# 23. Configure Firewall

If UFW is enabled:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Check:

```bash
sudo ufw status
```

Expected open ports:

```text
22
80
443
```

The Next.js port `3000` does **not** need to be publicly exposed because Nginx communicates with it locally.

---

# 24. Production Architecture

The recommended production architecture is:

```text
                    Internet
                       │
                       ▼
                 ┌───────────┐
                 │   HTTPS   │
                 │   443     │
                 └─────┬─────┘
                       │
                       ▼
                 ┌───────────┐
                 │   Nginx   │
                 └─────┬─────┘
                       │
                       │ localhost:3000
                       ▼
              ┌─────────────────┐
              │    Next.js      │
              │    + PM2        │
              └────────┬────────┘
                       │
                 ┌─────┴─────┐
                 │           │
                 ▼           ▼
          ┌────────────┐  ┌──────────┐
          │  Prisma    │  │  Stripe  │
          └─────┬──────┘  └──────────┘
                │
                ▼
          ┌────────────┐
          │ MariaDB /  │
          │   MySQL    │
          └────────────┘
```

---

# 25. Production Deployment Commands

After the initial server setup, a normal deployment can be performed with:

```bash
cd /var/www/trendoza

git pull origin main

npm ci

npx prisma generate

npx prisma migrate deploy

npm run build

pm2 restart trendoza
```

Check the application:

```bash
pm2 status
```

Check logs:

```bash
pm2 logs trendoza
```

---

# 26. Recommended Deployment Script

You can create a deployment script:

```bash
nano deploy.sh
```

Add:

```bash
#!/bin/bash

set -e

echo "======================================"
echo "Deploying Trendoza"
echo "======================================"

cd /var/www/trendoza

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm ci

echo "Generating Prisma Client..."
npx prisma generate

echo "Running database migrations..."
npx prisma migrate deploy

echo "Building Next.js application..."
npm run build

echo "Restarting application..."
pm2 restart trendoza

echo "Checking PM2 status..."
pm2 status

echo "======================================"
echo "Deployment completed successfully"
echo "======================================"
```

Make it executable:

```bash
chmod +x deploy.sh
```

Run:

```bash
./deploy.sh
```

---

# 27. Zero/Low-Downtime Deployment

For a simple single-server deployment, the following is usually sufficient:

```bash
git pull origin main
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart trendoza
```

For high-traffic production systems, consider:

* PM2 cluster mode
* Load balancing
* Multiple application servers
* Separate database server
* Database replication
* CI/CD
* Blue-green deployments
* Rolling deployments

---

# 28. PM2 Cluster Mode

If the server has multiple CPU cores, the application can use PM2 cluster mode:

```bash
pm2 start npm \
  --name "trendoza" \
  -i max \
  -- start
```

Check:

```bash
pm2 status
```

This allows PM2 to run multiple Next.js processes.

For most small deployments, starting with a single process is simpler.

---

# 29. Application Logs

View live logs:

```bash
pm2 logs trendoza
```

View the last 100 lines:

```bash
pm2 logs trendoza --lines 100
```

View Nginx errors:

```bash
sudo tail -f /var/log/nginx/error.log
```

View Nginx access logs:

```bash
sudo tail -f /var/log/nginx/access.log
```

---

# 30. Common Problems

## `Unknown database 'trendoza'`

Create the database:

```sql
CREATE DATABASE trendoza;
```

Then verify the `.env` configuration:

```env
DB_HOST=127.0.0.1
DB_USER=trendoza_user
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=trendoza
DB_PORT=3306
```

---

## Prisma pool timeout

If you see:

```text
pool timeout: failed to retrieve a connection from pool
```

check the underlying database error first.

For example:

```text
Unknown database 'trendoza'
```

means the database does not exist.

Do not treat the pool timeout itself as the root cause without checking the `cause` section of the error.

---

## `npm run build` fails

Run:

```bash
npm run build
```

and inspect the first TypeScript/Next.js error.

Do not ignore build errors before deploying.

---

## PM2 application keeps restarting

Check:

```bash
pm2 status
pm2 logs trendoza
```

Also run:

```bash
npm start
```

manually to determine whether the problem is with Next.js or PM2.

---

## Nginx returns `502 Bad Gateway`

Check whether Next.js is running:

```bash
pm2 status
```

Then:

```bash
curl http://127.0.0.1:3000
```

If that fails, inspect:

```bash
pm2 logs trendoza
```

If Next.js works locally but Nginx returns 502, check:

```bash
sudo nginx -t
```

and:

```bash
sudo tail -f /var/log/nginx/error.log
```

---

## Port 3000 is already in use

Check:

```bash
sudo lsof -i :3000
```

or:

```bash
ss -ltnp | grep 3000
```

If another application is using the port, stop it or configure Next.js to use another port.

---

# 31. Database Backup

Before production migrations, create a database backup.

Example:

```bash
mysqldump \
  -u trendoza_user \
  -p \
  trendoza > trendoza_backup.sql
```

Restore:

```bash
mysql \
  -u trendoza_user \
  -p \
  trendoza < trendoza_backup.sql
```

For production, implement automated backups rather than relying only on manual backups.

---

# 32. Security Checklist

Before exposing the application publicly:

* [ ] Use HTTPS
* [ ] Use a strong database password
* [ ] Use a strong `JWT_SECRET`
* [ ] Never expose `STRIPE_SECRET_KEY`
* [ ] Never commit `.env`
* [ ] Keep MySQL/MariaDB private
* [ ] Do not expose port `3306` publicly
* [ ] Do not expose port `3000` publicly
* [ ] Configure UFW
* [ ] Keep Ubuntu updated
* [ ] Keep Node.js dependencies updated
* [ ] Configure database backups
* [ ] Configure SSL renewal
* [ ] Monitor PM2 logs
* [ ] Monitor disk usage
* [ ] Monitor server resources

---

# 33. Final Production Verification

After deployment, verify:

### Application

```bash
curl -I https://example.com
```

### Next.js

```bash
pm2 status
```

### Database

```bash
mysql -u trendoza_user -p -h 127.0.0.1
```

### Nginx

```bash
sudo nginx -t
```

### SSL

```bash
sudo certbot renew --dry-run
```

### Logs

```bash
pm2 logs trendoza --lines 100
```

---

# 34. Quick Deployment Reference

For an already-configured production server:

```bash
cd /var/www/trendoza

git pull origin main

npm ci

npx prisma generate

npx prisma migrate deploy

npm run build

pm2 restart trendoza

pm2 status

pm2 logs trendoza
```

The application should then be available through:

```text
https://YOUR_DOMAIN
```

---

# 35. Deployment Flow

```text
Developer
    │
    ▼
Git Repository
    │
    │ git pull
    ▼
Production Server
    │
    ├── npm ci
    │
    ├── Prisma Generate
    │
    ├── Prisma Migrate
    │
    ├── Next.js Build
    │
    ▼
PM2
    │
    ▼
Next.js :3000
    │
    ▼
Nginx
    │
    ▼
HTTPS :443
    │
    ▼
Users
```

---

## Production Entry Point

The production application is started with:

```bash
npm start
```

and managed by PM2:

```bash
pm2 start npm --name "trendoza" -- start
```

Nginx acts as the public reverse proxy and forwards requests to the Next.js application on port `3000`.

---

**Trendoza Deployment Documentation**

Built with **Next.js, TypeScript, Prisma, MariaDB/MySQL, Tailwind CSS, Stripe, Nginx, and PM2**.
