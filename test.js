const fs = require('fs');
console.log("--- Automata Teszt Futtatása ---");
if (fs.existsSync('./szavazas.db')) {
    console.log("Sikeres: Az adatbázis fájl létezik.");
} else {
    console.log("Hiba: Az adatbázis nem található!");
}