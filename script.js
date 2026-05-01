const apiBase = 'http://localhost:3000/api';

async function betoltSzavazasok() {
    try {
        const response = await fetch(`${apiBase}/szavazasok`);
        const adatok = await response.json();
        
        const listaDiv = document.getElementById('szavazas-lista');
        listaDiv.innerHTML = '';

        const szavazas = adatok[0];
        
        let html = `
            <div class="szavazas-kartya">
                <h3>${szavazas.kerdes} <button onclick="torles(${szavazas.id})" style="color:red; 
				cursor:pointer; font-size: 0.8em; margin-left: 10px;">[Törlés]</button></h3>
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
        betoltSzavazasok(); 
    }
}

document.addEventListener('DOMContentLoaded', betoltSzavazasok);

async function ujSzavazas() {
    const kerdes = document.getElementById('uj-kerdes').value;
    const opciokString = document.getElementById('uj-opciok').value;
    
    if (!kerdes || !opciokString) return alert("Kérlek adj meg kérdést és opciókat is!");

    // Szétszedjük a vesszővel elválasztott szöveget egy tömbbé
    const opciok = opciokString.split(',').map(s => s.trim());

    await fetch(`${apiBase}/uj-szavazas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kerdes, opciok })
    });

    location.reload();
}

async function torles(id) {
    if (confirm("Biztosan törlöd?")) {
        await fetch(`/api/torles/${id}`, { method: 'DELETE' });
        location.reload();
    }
}