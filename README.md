# 🏡 Wanderlust – Airbnb Clone

Wanderlust is a **full-stack Airbnb clone** built with the **MERN stack**.  
It allows users to explore, book, and manage rental properties with an experience similar to Airbnb.

---

## ✨ Features
- 👤 User authentication (Login / Register)  
- 🏘️ List new properties with details & images  
- 🔍 Search & filter stays by location  
- 📅 Booking management  
- 📸 Image uploads with **Cloudinary**  
- 📍 Map integration for property location  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS (Embedded JavaScript templates), Bootstrap  
- **Database:** MongoDB (Atlas)  
- **Other Tools:** Cloudinary (image uploads), Map API 

---

## ⚙️ Installation & Setup

1.Clone the Repository
```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust

2. Install dependencies
npm install

3. Set up environment variables
Create a .env file in the root directory and add the following:
MONGO_URI=your_mongodb_uri
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAP_API_KEY=your_map_api_key

4. Run the application
npm start

🧪 Usage
Register/Login as a user
Add a new property with details and images
Search properties by location
View property details and make bookings
Logout when done
