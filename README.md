# Rick and Morty Character Feed

A full-stack application that displays Rick and Morty characters in a modern newsfeed interface. The application allows users to browse, filter, and view detailed information about characters from the show.

## Project Structure

This project consists of two main parts:
- **Backend**: Spring Boot application providing RESTful API endpoints
- **Frontend**: React.js application for the user interface

## Data Flow

1. The backend fetches character data from the [Rick and Morty API](https://rickandmortyapi.com/)
2. Character data is stored in a MySQL database for efficient access and custom filtering
3. The frontend requests data from our Spring Boot backend, not directly from the Rick and Morty API
4. This architecture allows for better performance, custom filtering, and user-specific features

## Features

- Browse all Rick and Morty characters
- Filter characters by name, status, and species
- Sort characters by different attributes
- Pagination with adjustable items per page
- View detailed information about each character
- Responsive design for all device sizes
- Secure API endpoints
- Optimized performance with local database caching

## Technologies Used

### Backend
- Java with Spring Boot
- Spring Data JPA for database operations
- Spring Security for authentication and authorization
- MySQL database
- Maven for dependency management

### Frontend
- React.js
- React Router for navigation
- React Bootstrap for UI components
- Axios for API requests
- CSS for custom styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Java 17 or later
- Maven
- MySQL database

### Backend Setup

1. Configure your MySQL database settings in `src/main/resources/application.properties`
2. Navigate to the project root directory
3. Build and run the Spring Boot application:
   ```
   ./mvnw spring-boot:run
   ```
   The backend will be available at [http://localhost:8080](http://localhost:8080)

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /api/characters/feed` - Get paginated characters with filtering options
- `GET /api/characters/{id}` - Get a specific character by ID
- `GET /api/characters` - Get all characters

### Planned Features
These features are planned for future development:
- User authentication and registration
- Favorites/bookmarks functionality
- User comments and ratings

## Deployment

### Backend
1. Build the project using Maven:
   ```
   ./mvnw clean package
   ```
2. The resulting JAR file can be found in the `target/` directory.

### Frontend
To build the frontend for production:
```
cd frontend
npm run build
```
or
```
cd frontend
yarn build
```

This will create a `build` folder with optimized production files.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details. 