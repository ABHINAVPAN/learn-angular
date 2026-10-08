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

## Main API endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/{id}`
- `DELETE /api/employees/{id}`
