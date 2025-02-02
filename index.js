import { importData } from "./importData.js";
import { createIndexes } from "./createIndexes.js";

console.log("Uygulama başlatılıyor...");
async function main() {
    console.log("Veri aktarımı ve indexleme işlemi başlatılıyor...");
    await importData();
    console.log("Veri aktarımı işlemi tamamlandı. Indexleme işlemi başlatılıyor...");
    await createIndexes();
    console.log("Indexleme işlemi tamamlandı. Uygulama kapatılıyor...");
}

main();