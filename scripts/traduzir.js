const translate = require("translate");
const fs = require("fs");
const path = require("path");

// Configura o motor de tradução
translate.engine = "google";

async function traduzirLegendas() {
  const inputPath = path.join(__dirname, "..", "src", "legendas-original.json");
  const outputPath = path.join(__dirname, "..", "src", "legendas-pt.json");

  console.log("🌐 Traduzindo legendas para Português...\n");

  const legendas = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const legendasPT = {};

  for (const [corteId, lista] of Object.entries(legendas)) {
    console.log(`🔤 Traduzindo ${corteId}...`);
    legendasPT[corteId] = [];

    for (const leg of lista) {
      try {
        const textoPT = await translate(leg.texto, { from: "en", to: "pt" });
        legendasPT[corteId].push({
          texto: textoPT,
          inicioSeg: leg.inicioSeg,
          duracaoSeg: leg.duracaoSeg,
        });
        console.log(`   "${leg.texto}" → "${textoPT}"`);
      } catch (err) {
        console.error(`   ❌ Erro ao traduzir: ${leg.texto}`);
        // Se falhar, mantém o original
        legendasPT[corteId].push(leg);
      }
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(legendasPT, null, 2));
  console.log(`\n✅ Legendas traduzidas salvas em: src/legendas-pt.json`);
  console.log("🎬 Agora é só rodar: npm run render-all");
}

traduzirLegendas().catch((err) => {
  console.error("❌ Erro na tradução:", err.message);
  process.exit(1);
});
