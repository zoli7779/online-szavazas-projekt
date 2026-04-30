const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Adatbázis létrehozása a memóriában (vagy fájlban: './szavazas.db')
const db = new sqlite3.Database('./szavazas.db', (err) => {
    if (err) console.error(err.message);
    console.log('Kapcsolódva az SQLite adatbázishoz.');
});

// Táblák létrehozása
db.serialize(() => {
    db.run("CREATE TABLE szavazasok (id INTEGER PRIMARY KEY, kerdes TEXT)");
    db.run("CREATE TABLE opciok (id INTEGER PRIMARY KEY, szavazas_id INTEGER, szoveg TEXT, voksok INTEGER DEFAULT 0)");
    
    // Mintaadatok
    db.run("INSERT INTO szavazasok (kerdes) VALUES ('Melyik a legjobb frontend keretrendszer?')");
    db.run("INSERT INTO opciok (szavazas_id, szoveg) VALUES (1, 'React'), (1, 'Vue'), (1, 'Angular')");
});

// 1. Végpont: Szavazások lekérése (GET)
app.get('/api/szavazasok', (req, res) => {
    const sql = `SELECT s.id, s.kerdes, o.id as opcio_id, o.szoveg, o.voksok 
                 FROM szavazasok s JOIN opciok o ON s.id = o.szavazas_id`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 2. Végpont: Szavazat leadása (POST) + Validáció
app.post('/api/szavazat', (req, res) => {
    const { opcioId } = req.body;
    if (!opcioId) return res.status(400).json({ error: "Érvénytelen opció!" });

    db.run("UPDATE opciok SET voksok = voksok + 1 WHERE id = ?", [opcioId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "Szavazat rögzítve!" });
    });
});

app.listen(3000, () => console.log('Szerver: http://localhost:3000'));