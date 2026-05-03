const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('.'));

const db = new sqlite3.Database('./szavazas.db', (err) => {
    if (err) console.error(err.message);
	db.run("PRAGMA foreign_keys = ON");
    console.log('Kapcsolódva az SQLite adatbázishoz.');
});


db.serialize(() => {
   
    db.run("CREATE TABLE IF NOT EXISTS szavazasok (id INTEGER PRIMARY KEY AUTOINCREMENT, kerdes TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS opciok (id INTEGER PRIMARY KEY AUTOINCREMENT, szavazas_id INTEGER, szoveg TEXT, voksok INTEGER DEFAULT 0)");

    
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, role TEXT)");
    
    
    db.run("CREATE TABLE IF NOT EXISTS votes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, poll_id INTEGER, choice_id INTEGER)");

    
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
        if (!err && row.count === 0) {
            db.run("INSERT INTO users (username, role) VALUES ('admin_zoltan', 'admin')");
            db.run("INSERT INTO users (username, role) VALUES ('teszt_user', 'user')");
            console.log("Admin és teszt felhasználók létrehozva.");
        }
    });

	db.run("INSERT INTO szavazasok (kerdes) VALUES ('Melyik a legjobb frontend keretrendszer?')", function(err) {
                if (!err) {
                    const lastId = this.lastID;
                    db.run(`INSERT INTO opciok (szavazas_id, szoveg) VALUES 
                           (?, 'React'), (?, 'Vue'), (?, 'Angular')`, [lastId, lastId, lastId]);
                }
            });
});



app.get('/api/szavazasok', (req, res) => {
    const sql = `SELECT s.id, s.kerdes, o.id as opcio_id, o.szoveg, o.voksok 
                 FROM szavazasok s 
                 LEFT JOIN opciok o ON s.id = o.szavazas_id`; // LEFT JOIN-ra váltottunk
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/szavazat', (req, res) => {
    const { opcioId } = req.body;
    if (!opcioId) return res.status(400).json({ error: "Érvénytelen opció!" });

    db.run("UPDATE opciok SET voksok = voksok + 1 WHERE id = ?", [opcioId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "Szavazat rögzítve!" });
    });
});

app.post('/api/uj-szavazas', (req, res) => {
    const { kerdes, opciok } = req.body; 

    if (!kerdes || !opciok || !Array.isArray(opciok)) {
        return res.status(400).send("Hiányzó adatok!");
    }

    db.run("INSERT INTO szavazasok (kerdes) VALUES (?)", [kerdes], function(err) {
        if (err) return res.status(500).send(err.message);
        
        const lastId = this.lastID;
        
        
        const stmt = db.prepare("INSERT INTO opciok (szavazas_id, szoveg) VALUES (?, ?)");
        opciok.forEach(opcio => {
            stmt.run(lastId, opcio);
        });
        stmt.finalize();

        res.json({ id: lastId });
    });
});

app.delete('/api/torles/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM opciok WHERE szavazas_id = ?", [id], (err) => {
        if (err) return res.status(500).send(err.message);
        
        db.run("DELETE FROM szavazasok WHERE id = ?", [id], (err) => {
            if (err) return res.status(500).send(err.message);
            res.send("Sikeres törlés");
        });
    });
});

app.post('/api/admin/polls', (req, res) => {
    const { question, options, role } = req.body;
    if (role !== 'admin') {
        return res.status(403).send("Hiba: Nincs admin jogosultságod!");
    }
   
    res.send("Szavazás sikeresen létrehozva!");
});

app.get('/api/user/history/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all("SELECT * FROM votes WHERE user_id = ?", [userId], (err, rows) => {
        if (err) res.status(500).send(err);
        res.json(rows);
    });
});

app.listen(3000, () => console.log('Szerver: http://localhost:3000'));