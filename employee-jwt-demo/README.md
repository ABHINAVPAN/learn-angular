# Employee JWT Demo

This is a separate example project showing JWT authentication with:
- Angular frontend
- Spring Boot backend
- RxJS for async data flow
- MySQL database

## Structure
- `backend/` – Spring Boot REST API
- `frontend/` – Angular client

## Backend

```bash
cd backend
mvn spring-boot:run
```

## Frontend

```bash
cd frontend
npm install
npm start
```

Open the Angular app in the browser and register/login to access the employee dashboard.

## Database
Update MySQL credentials in:
- `backend/src/main/resources/application.properties`

Example DB URL:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_app?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

## Run the full app with Docker

Install and start Docker Desktop, then from this directory:

1. Copy the example environment file and edit `.env`:

   ```powershell
   Copy-Item .env.example .env
   ```

   The local example uses database `app_user` with MySQL username/password
   `root` / `root`. Change `MYSQL_ROOT_PASSWORD` if you choose a different
   password. Set a strong, unique JWT secret too, and keep `.env` private.
   Do not use the default database password for a public deployment.
2. For a deployed domain, set `APP_CORS_ALLOWED_ORIGIN_PATTERNS` to the exact
   browser origin, such as `https://employees.example.com`. The local origins
   in the example are only for local testing.
3. Build and start the containers:

   ```powershell
   docker compose up --build -d
   ```

4. Open `http://localhost:8080`. The Angular container serves the app and
   proxies `/api` requests to Spring Boot. MySQL data is kept in the
   `mysql-data` Docker volume.

Useful commands:

```powershell
docker compose ps
docker compose logs -f
docker compose down
```

`docker compose down` preserves the database volume. To delete the database
data too, run `docker compose down -v`.

For a public deployment, point your domain to the Docker host and terminate
HTTPS at a reverse proxy or load balancer. Do not expose the database port
publicly. Use a managed database and schema migrations instead of
`ddl-auto=update` for production workloads.

## Main API endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/{id}`
- `DELETE /api/employees/{id}`
