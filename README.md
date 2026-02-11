# 🎫 LipaManna - Dev-Events

**The Hub for Every Dev Event You Can't Miss.**

A sophisticated event management and booking platform built with the latest web technologies. From hackathons to conferences, LipaManna provides a centralized place for developers to discover and secure their spots at industry events.

![Project Banner](https://via.placeholder.com/1200x400?text=LipaManna+Dev-Events+Platform)

## 🚀 Features

- **✨ Modern UI/UX**: Built with React 19 and Tailwind CSS 4 for a fast, responsive, and beautiful experience.
- **📅 Event Management**: Comprehensive event listing with categories, tags, and slug-based routing.
- **🎟️ Booking System**: Integrated booking functionality for users to secure their spots at events.
- **🖼️ Media Handling**: Cloudinary integration for robust image management.
- **⚡ Performance**: Leverages Next.js App Router and Server Actions for optimal performance.
- **📊 Real-time Database**: Powered by MongoDB with Mongoose for reliable data handling.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Media**: [Cloudinary](https://cloudinary.com/)
- **Animation/Graphics**: [OGL](https://github.com/o-g-l/ogl) (WebGL)

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB Connection (Cloud or Local)
- Cloudinary Account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lipamanna-dev-events
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_URL=your_cloudinary_url
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components.
- `database/`: Mongoose models and database schemas.
- `lib/`: Utility functions, database connection, and server actions.
- `public/`: Static assets (images, icons, etc.).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and for internal use.

---

Built with ❤️ by LipaManna Development Team.
