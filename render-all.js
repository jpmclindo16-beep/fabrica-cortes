const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const configPath = path.join(__dirname, "..", "src", "cortes.ts");
const configContent = fs.readFileSync(configPath, "utf-8");

const idMatches = configContent.matchAll(/id:\s*"([^"]+)"/g);
const ids = [...idMatches].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) === i);

console.log("\n🎬 ══════════════════════════════════════");
console.log("   FÁBRICA DE CORTES — Remotion");
console.log("══════════════════════════════════════\n");
console.log(`📦 ${ids.length} corte(s) encontrado(s): ${ids.join(", ")}\n`);

const outputDir = path.join(__dirname, "..", "out");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const inicio = Date.now();
let sucesso = 0;
let falha = 0;

for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const outputFile = path.join(outputDir, `${id}.mp4`);

  console.log(`\n🔪 [${i + 1}/${ids.length}] Renderizando: ${id}`);
  console.log(`   📁 Saída → out/${id}.mp4`);

  try {
    execSync(
      `npx remotion render src/Root.tsx "${id}" "${outputFile}" --log=error`,
      {
        cwd: path.join(__dirname, ".."),
        stdio: "inherit",
      }
    );
    console.log(`   ✅ ${id} concluído!`);
    sucesso++;
  } catch (err) {
    console.error(`   ❌ Erro em ${id}:`, err.message);
    falha++;
  }
}

const tempo = ((Date.now() - inicio) / 1000).toFixed(1);

console.log("\n══════════════════════════════════════");
console.log(`🎉 Finalizado em ${tempo}s`);
console.log(`   ✅ Sucesso: ${sucesso}`);
if (falha > 0) console.log(`   ❌ Falhas: ${falha}`);
console.log(`📂 Arquivos em: ${outputDir}`);
console.log("══════════════════════════════════════\n");
