const apiBase = 'http://localhost:3000/api';

async function betoltSzavazasok() {
    try {
        const response = await fetch(`${apiBase}/szavazasok`);
        const adatok = await response.json();
        
        const listaDiv = document.getElementById('szavazas-lista');
        listaDiv.innerHTML = '';

        // Egyszerű csoportosítás (mivel a JOIN miatt több sor jön)
        const szavazas = adatok[0]; // Példa kedvéért az elsőt vesszük
        
        let html = `
            <div class="szavazas-kartya">
                <h3>${szavazas.kerdes}</h3>
                <div id="opciok-kontener">
        `;

        adatok.forEach(sor => {
            html += `
                <button class="opcio-gomb" onclick="szavaz(${sor.opcio_id})">
                    ${sor.szoveg} (${sor.voksok})
                </button>
            `;
        });

        html += `</div></div>`;
        listaDiv.innerHTML = html;

    } catch (err) {
        console.error("Hiba az adatok lekérésekor:", err);
    }
}

async function szavaz(id) {
    const response = await fetch(`${apiBase}/szavazat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opcioId: id })
    });

    if (response.ok) {
        alert("Köszönjük a szavazatot!");
        betoltSzavazasok(); // Frissítés
    }
}

document.addEventListener('DOMContentLoaded', betoltSzavazasok);