const express = require('express');
const cors = require('cors');
const db = require('./db'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// --- ROUTES ---

// 1. Test Route
app.get('/', (req, res) => res.send("Backend Server is Running!"));

// 2. REGISTER API
app.post('/api/register', async (req, res) => {
    const { name, email, event, password } = req.body;
    try {
        const query = 'INSERT INTO users (name, email, event, password, role) VALUES (?, ?, ?, ?, ?)';
        await db.execute(query, [name, email, event, password, 'user']);
        res.status(201).json({ message: "Registration Successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// 3. LOGIN API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: "Email not found!" });

        const user = users[0];
        if (user.password === password) {
            res.json({ 
                message: "Login successful!", 
                user: { id: user.id, name: user.name, email: user.email, role: user.role } 
            });
        } else {
            res.status(401).json({ message: "Invalid password!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 4. GET ALL USERS (Admin Dashboard)
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, name, email, event, regDate FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

// 5. DELETE USER
app.delete('/api/users/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

// --- NEW: UPDATE USER API ---
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, event } = req.body;
    try {
        const query = 'UPDATE users SET name = ?, email = ?, event = ? WHERE id = ?';
        await db.execute(query, [name, email, event, id]);
        res.json({ message: "User updated successfully!" });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ message: "Error updating user" });
    }
});

// 6. ADD NEW EVENT 
app.post('/api/events', async (req, res) => {
    const { title, description, image_url, event_date } = req.body; 
    try {
        const query = 'INSERT INTO events (title, description, image_url, date) VALUES (?, ?, ?, ?)';
        await db.execute(query, [title, description, image_url, event_date]);
        res.status(201).json({ message: "Event Added Successfully!" });
    } catch (error) {
        console.error("MySQL Error:", error); 
        res.status(500).json({ message: "Error adding event", error: error.message });
    }
});

// 7. GET ALL EVENTS 
app.get('/api/events', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM events ORDER BY id DESC');
        const formattedRows = rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            image_url: row.image_url,
            event_date: row.date 
        }));
        res.json(formattedRows);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
});

// --- NEW: UPDATE EVENT API ---
app.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, image_url, event_date } = req.body;
    try {
        const query = 'UPDATE events SET title = ?, description = ?, image_url = ?, date = ? WHERE id = ?';
        await db.execute(query, [title, description, image_url, event_date, id]);
        res.json({ message: "Event updated successfully!" });
    } catch (error) {
        console.error("Update Event Error:", error);
        res.status(500).json({ message: "Error updating event" });
    }
});

// --- NEW: DELETE EVENT API ---
app.delete('/api/events/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM events WHERE id = ?', [req.params.id]);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Delete Event Error:", error);
        res.status(500).json({ message: "Error deleting event" });
    }
});

// --- GALLERY API ROUTES ---

// 1. GET ALL GALLERY IMAGES (Home Page & Dashboard ke liye)
app.get('/api/gallery', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM gallery ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error("Gallery Fetch Error:", error);
        res.status(500).json({ message: "Error fetching gallery" });
    }
});

// 2. ADD NEW PHOTO TO GALLERY (Admin Dashboard se)
app.post('/api/gallery', async (req, res) => {
    const { title, description, img_url } = req.body;
    try {
        const query = 'INSERT INTO gallery (title, description, img_url) VALUES (?, ?, ?)';
        await db.execute(query, [title, description, img_url]);
        res.status(201).json({ message: "Photo added to gallery successfully!" });
    } catch (error) {
        console.error("Add Gallery Error:", error);
        res.status(500).json({ message: "Error adding photo to gallery" });
    }
});

// 3. DELETE PHOTO FROM GALLERY (Admin Dashboard se)
app.delete('/api/gallery/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM gallery WHERE id = ?', [id]);
        res.json({ message: "Photo deleted from gallery" });
    } catch (error) {
        console.error("Delete Gallery Error:", error);
        res.status(500).json({ message: "Error deleting photo" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));