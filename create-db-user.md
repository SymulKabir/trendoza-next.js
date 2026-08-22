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