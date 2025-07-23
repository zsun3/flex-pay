# Flex Pay

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Routes

### Public

- `/`  
  Home page.

- `/dashboard`  
  User dashboard. Displays session info.  
  _Requires authentication._

- `/test`  
  Todo list demo.  
  _No authentication required._

### API

- `/api/hello`  
  Example API route.

- `/api/todos`  
  CRUD API for todos.

- `/api/user`  
  User-related API endpoint.

### Admin

- `/admin`  
  Admin dashboard.  
  - Search users by name/email.
  - View user info and roles.
  - Set or remove user roles (`admin`, `moderator`).
  - _Requires user to have the `admin` role._

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd flex-pay-v2
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your Clerk and database credentials.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Access the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Clerk Authentication

This project uses [Clerk](https://clerk.com/docs) for authentication and user management.

- See the [Clerk documentation](https://clerk.com/docs) for setup and configuration details.
- Make sure to set your Clerk API keys in your environment variables.

---

## Project Structure

- `app/` — Main Next.js app routes and pages
- `app/admin/` — Admin dashboard and actions
- `app/api/` — API routes
- `types/` — Global TypeScript types
- `utils/` — Utility functions (e.g., role checking)
- `public/` — Static assets

---

## Notes

- Only users with the `admin` role can access `/admin` and manage roles.
- The todo list at `/test` is a simple demo and not protected.
- All role management actions are handled via server actions and client components for feedback.

---

## License

MIT