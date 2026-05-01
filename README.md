Online Szavazó Platform
Egy teljes körű (Full-Stack) webalkalmazás, amely lehetővé teszi szavazások létrehozását, kezelését és a voksok leadását.

Funkciók:
	Dinamikus szavazás létrehozás: Új kérdések felvétele tetszőleges számú, vesszővel elválasztott opcióval.

	Valós idejű szavazás: Voksok leadása és az eredmények azonnali frissítése.

	Adminisztráció: Meglévő szavazások törlése az adatbázisból (függő adatokkal együtt).

	Reszponzív felület: Modern, kártya-alapú megjelenítés, amely minden eszközön jól mutat.

Technológiai stack:
	Frontend: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+ Fetch API).

	Backend: Node.js, Express keretrendszer.

	Adatbázis: SQLite3 (relációs adatbázis).

	Konténerizáció: Docker és Docker Compose támogatás.

Telepítés és futtatás:
Lokális futtatás (Node.js)
	Telepítsd a függőségeket:

	Bash
	npm install
	
	Indítsd el a szervert:

	Bash
	node server.js

		3. Nyisd meg a böngészőben: `http://localhost:3000`

		### Futtatás Dockerrel
		```bash
		docker-compose up --build
		```
		
 Projektfelépítés:
	server.js: Az Express szerver és a REST API végpontok (GET, POST, DELETE).

	script.js: A frontend logika, az adatok csoportosítása és dinamikus renderelése.

	szavazas.db: Az SQLite adatbázis fájl.

	style.css: A vizuális megjelenésért felelős stíluslap.

Készítette: Kocsy Zoltán, 2026.