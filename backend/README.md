# User Registration API

Spring Boot REST API for the Angular registration CRUD example, with JWT-based authentication.

## Requirements

- JDK 17 or newer
- Maven 3.9 or newer
- MySQL 8 or newer

## Database and startup

The application connects to the `app_user` database using the credentials configured in `src/main/resources/application.properties`. Run the schema script with a MySQL account that can create databases and tables:

```bash
mysql -u root -p < sql/schema.sql
```

The script creates the `app_user` database, the `registrations` table, and the separate `auth_users` credential table if they do not already exist. Update the datasource username and password in `application.properties` to match your MySQL account. Set `JWT_SECRET` to a private key of at least 32 characters before deployment; the built-in value is only for local development.

From this directory, run:

```bash
mvn spring-boot:run
```

Hibernate is configured to update the schema on startup. The API listens on `http://localhost:8080`; Angular runs separately with `npm start` from the workspace root. The registration screen is at `http://localhost:4200/user-registration`.

## Endpoints

| Method | Path | Operation |
| --- | --- | --- |
| `GET` | `/api/registrations` | List registrations |
| `GET` | `/api/registrations/{id}` | Get one registration |
| `POST` | `/api/registrations` | Create a registration |
| `PUT` | `/api/registrations/{id}` | Update a registration |
| `DELETE` | `/api/registrations/{id}` | Delete a registration |
| `POST` | `/api/auth/register` | Create an account and return a JWT |
| `POST` | `/api/auth/login` | Authenticate and return a JWT |

Registration CRUD requires `Authorization: Bearer <token>`. The public auth endpoints accept `{ "email", "password" }`; passwords require at least 8 characters and are stored as BCrypt hashes. Successful responses contain `token` and `email`. Send the token as a bearer token on subsequent requests. Create and update accept JSON with `firstName`, `lastName`, `email`, `phone`, and `course`. Registration email addresses must be unique. Invalid fields return `400`, duplicate values return `409`, and unauthenticated requests return `401`.
