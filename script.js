const apiBase = 'http://localhost:3000/api';

async function betoltSzavazasok() {
    const response = await fetch(`${apiBase}/szavazasok`);
    const adatok = await response.json();
    const listaDiv = document.getElementById('szavazas-lista');
    listaDiv.innerHTML = '';

    const csoport = {};
    adatok.forEach(sor => {
        if (!csoport[sor.id]) {
            csoport[sor.id] = { id: sor.id, kerdes: sor.kerdes, opciok: [] };
        }
        if (sor.opcio_id) {
            csoport[sor.id].opciok.push({ id: sor.opcio_id, szoveg: sor.szoveg, voksok: sor.voksok });
        }
    });

    for (const id in csoport) {
        const sz = csoport[id];
        let opciokHtml = sz.opciok.map(o => `
            <button class="opcio-gomb" onclick="szavaz(${o.id})">
                ${o.szoveg} (${o.voksok})
            </button>`).join('');

        listaDiv.innerHTML += `
            <div class="szavazas-kartya">
                <h3>${sz.kerdes} <button onclick="torles(${sz.id})">[Törlés]</button></h3>
                <div class="opciok-kontener">${opciokHtml}</div>
            </div>`;
    }
}

async function szavaz(id) {
    await fetch(`${apiBase}/szavazat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opcioId: id })
    });
    betoltSzavazasok();
}

async function ujSzavazas() {
    const kerdes = document.getElementById('uj-kerdes').value;
    const opciok = document.getElementById('uj-opciok').value.split(',').map(s => s.trim());
    await fetch(`${apiBase}/uj-szavazas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kerdes, opciok })
    });
    location.reload();
}

async function torles(id) {
    if (confirm("Törlöd?")) {
        await fetch(`${apiBase}/torles/${id}`, { method: 'DELETE' });
        betoltSzavazasok();
    }
}

document.addEventListener('DOMContentLoaded', betoltSzavazasok);