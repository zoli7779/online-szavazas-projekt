# Online Szavazó Platform

Ez egy egyszerű, Docker-alapú webalkalmazás, amely lehetővé teszi szavazások létrehozását, leadását és törlését.

## Funkciók
*   **Szavazások megtekintése:** Az összes aktív szavazás listázása.
*   **Szavazat leadása:** Interaktív gombok segítségével voksok rögzítése.
*   **Új szavazás hozzáadása:** Adminisztrátori felületen keresztül új kérdések és opciók felvitele.
*   **Törlés:** Meglévő szavazások eltávolítása az adatbázisból.

## Technológiai stack
*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
*   **Backend:** Node.js, Express keretrendszer
*   **Adatbázis:** SQLite3
*   **Konténerizáció:** Docker és Docker Compose

## Telepítés és futtatás

### Telepítés
1. Győződjön meg róla, hogy a Node.js telepítve van.
2. Telepítse a függőségeket (ha van package.json): `npm install`

### Indítás
1. Nyisson egy terminált a projekt mappájában.
2. Indítsa el a szervert:
```bash
   node server.js
```
3. Az oldal elérhető: `http://localhost:3000`


  
Fejlesztő:  
Név: Kocsy Zoltán  
Tárgy: Webprogramozás alapjai projektfeladat  
Dátum: 2026. 05. 04.  