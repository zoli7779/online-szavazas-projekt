# Webalkalmazás Fejlesztése Projektfeladat - Online Szavazás
Ez egy online szavazási platform, ahol a felhasználók különböző kérdésekről szavazhatnak.

## Funkciók
- Aktív szavazások listázása.
- Szavazat leadása és eredmények megtekintése.
- Relációs adatbázis (SQLite) használata.

## Telepítés és használat
1. Node.js telepítése szükséges.
2. A projekt mappájában: `npm install`
3. Szerver indítása: `node server.js`
4. Nyisd meg az `index.html` fájlt a böngészőben.

## API végpontok
- `GET /api/szavazasok`: Szavazások lekérése.
- `POST /api/szavazat`: Szavazat beküldése.

Készítette: Kocsy Zoltán, 2026.