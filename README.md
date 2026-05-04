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

A projekt futtatásához szükséges a Docker Desktop telepítése.

1. Másolja le a projektfájlokat egy mappába.
2. Nyisson egy terminált az adott mappában.
3. Futtassa a következő parancsot:
   ```bash
   docker-compose up --build -d
   ```
4. Nyissa meg a böngészőt az alábbi címen:http://localhost:3000

Fejlesztő:

Név: Kocsy Zoltán
Tárgy: Webprogramozás alapjai projektfeladat
Dátum: 2026. 05. 04.