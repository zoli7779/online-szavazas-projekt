const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./szavazas.db');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS szavazasok (id INTEGER PRIMARY KEY AUTOINCREMENT, kerdes TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS opciok (id INTEGER PRIMARY KEY AUTOINCREMENT, szavazas_id INTEGER, szoveg TEXT, voksok INTEGER DEFAULT 0)");
});

app.get('/api/szavazasok', (req, res) => {
    const sql = `SELECT s.id, s.kerdes, o.id as opcio_id, o.szoveg, o.voksok 
                 FROM szavazasok s 
                 LEFT JOIN opciok o ON s.id = o.szavazas_id`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/szavazat', (req, res) => {
    const { opcioId } = req.body;
    db.run("UPDATE opciok SET voksok = voksok + 1 WHERE id = ?", [opcioId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.post('/api/uj-szavazas', (req, res) => {
    const { kerdes, opciok } = req.body;
    db.run("INSERT INTO szavazasok (kerdes) VALUES (?)", [kerdes], function(err) {
        const lastId = this.lastID;
        opciok.forEach(opt => {
            db.run("INSERT INTO opciok (szavazas_id, szoveg) VALUES (?, ?)", [lastId, opt]);
        });
        res.json({ success: true });
    });
});

app.delete('/api/torles/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM szavazasok WHERE id = ?", [id], () => {
        db.run("DELETE FROM opciok WHERE szavazas_id = ?", [id], () => {
            res.json({ success: true });
        });
    });
});

app.listen(3000, () => console.log('Szerver fut: http://localhost:3000'));