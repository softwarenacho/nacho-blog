# NACHO BLOG

## Project Overview

This project is a personal blog built using Next.js + tailwind + supabase

## Built With

- **Next.js**: The React framework for production.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vercel**: A platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.
- **Supabase**: An open-source database that provides all the backend services you need to build a product.

## Accessing Admin

To access the admin panel, navigate to `/admin` in your browser or click 7 times on the app and then on the admin link at the bottom right, you have to be quick.
Ensure you have the necessary credentials to log in.

## Setting Up Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```plaintext
ADMIN_PASSWORD=to-enter-admin-page
NEXT_PUBLIC_SUPABASE_URL=supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase-key
```

## Running the Project

To install the project dependencies using npm:

```bash
npm install
```

To run the development server:

```bash
npm run dev
```

To build the project for production:

```bash
npm run build
```

After building, you can start the production server with:

```bash
npm start
```
