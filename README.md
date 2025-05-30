## :pushpin: G6-Memopen

Memopen is a web application that works like a personal diary, it is designed to help user archive their personal records. You can create and review entries anytimes, anywhere. A standout feature of this website is how you can customize your canvas. You can choose different template, and movable object including text boxes and images. Moreover, users can style the writing with bold, italic, or underline formatting.\

---

## :rocket: Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CSC105-2024/G6-Memopen.git
   cd G6-Memopen
   ```
---
## :hammer: Frontend - React
### :wrench: Tech Stack

- React
- Axios
- React Router DOM
- React Hook Form
- React icons
- React Pick Color
- Tailwind Css
- Zod
- Fabric - Currently using version ```^5.5.1``` (not the latest)
- Font Awesome
  - @fortawesome/fontawesome-svg-core
  - @fortawesome/free-solid-svg-icons
  - @fortawesome/react-fontawesome
- @hookform/resolvers
- @tailwindcss/vite/

### :rocket:  Getting Started - React Client
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The client will be running on [http://localhost:5173](http://localhost:5173) (or similar, depending on your setup).
---
## :wrench: Backend - Node.js

### :hammer_and_wrench: Tech Stack

- @hono/node-server
- @prisma/client
- Bcrypt
- Dotenv
- Hono
- jsonwebtoken

### :electric_plug: API Endpoints
- Authentication
  
|Method|Endpoint |Description                |
|------|---------|---------------------------|
|POST  |/register| Sign up new user account  |
|POST  |/login| Login using username and password  |
|POST  |/profile-image/:id| Update user's profile image  |
- Post Canvas

|Method|Endpoint |Description                |
|------|---------|---------------------------|
|GET  |post/| Fetch all canvases  |
|GET  |post/:id| Fetch a specific canvas by ID |
|POST  |post/| Create new canvas |
|PATCH  |post/:id| Update canvas by ID |
|DELETE  |post/:id| Delete canvas by ID |

- Manual Tags

|Method|Endpoint |Description                |
|------|---------|---------------------------|
|GET  |tag/| Fetch all manual added tags  |
|POST  |tag/| Create new tag |
|PATCH  |tag/:id| Update tag by ID |
|DELETE  |tag/:id| Delete tag by ID |

\
:rocket: Getting Started - Node.js Server
1. Navigate to the frontend directory:
   
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a .env file and configure the following variables
   ```bash
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=your_jwt_secret_here
   ```
5. Start the development server:
    ```bash
    npm run dev
   ```
6. The server will be running on [http://localhost:3000](http://localhost:3000)


