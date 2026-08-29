# 🎬 Fábrica de Cortes + Tradução Automática

Crie **cortes verticais** (TikTok / Reels / Shorts) a partir de um vídeo longo, com **legendas traduzidas automaticamente** para português + animações.

Funciona **no celular** usando GitHub Codespaces (navegador).

---

## ✨ O que tem

- Legendas animadas (entrada + fade)
- Título do corte no início
- Zoom suave no vídeo
- Marca d’água personalizável (`@seucanal`)
- Cor da barra configurável
- Tradução automática EN → PT

---

# 📱 COMO USAR NO CELULAR (passo a passo)

Você vai usar o **GitHub Codespaces** — um computador na nuvem que abre no navegador do celular.

### O que você precisa
- Conta no **GitHub** (grátis) → [github.com](https://github.com)
- O vídeo longo que você quer cortar
- O ZIP deste projeto

---

### Passo 1 — Criar repositório no GitHub

1. Abra o navegador no celular e entre em [github.com](https://github.com)
2. Toque em **+** (canto superior) → **New repository**
3. Nome: `fabrica-cortes` (ou qualquer nome)
4. Deixe **Public**
5. Toque em **Create repository**

---

### Passo 2 — Enviar os arquivos do projeto

1. No repositório que acabou de criar, toque em **uploading an existing file**
2. Envie **todos os arquivos** da pasta do projeto (arraste ou selecione)
3. Importante: crie a pasta `public` e envie seu vídeo como:
   ```
   public/video.mp4
   ```
4. Toque em **Commit changes**

> Dica: se o vídeo for muito grande (>25 MB), use o app **GitHub** ou envie depois pelo Codespace.

---

### Passo 3 — Abrir o Codespace

1. No repositório, toque em **<> Code**
2. Aba **Codespaces**
3. Toque em **Create codespace on main**
4. Aguarde 1–2 minutos (ele sobe um “computador” na nuvem)

Quando abrir, você verá um editor + um terminal embaixo.

---

### Passo 4 — Instalar

No terminal do Codespace digite:

```bash
npm install
```

Aguarde terminar.

---

### Passo 5 — Configurar os cortes

1. No painel de arquivos (esquerda), abra `src/cortes.ts`
2. Edite os tempos dos seus cortes:

```ts
export const cortesBase = [
  {
    id: "corte-01",
    titulo: "Gancho viral",
    inicioSeg: 15,
    fimSeg: 45,
  },
  {
    id: "corte-02",
    titulo: "Plot twist",
    inicioSeg: 120,
    fimSeg: 150,
  },
];
```

Salve (Ctrl+S ou o ícone de salvar).

---

### Passo 6 — Colocar as legendas

Abra `src/legendas-original.json` e coloque as frases:

```json
{
  "corte-01": [
    { "texto": "You won't believe this!", "inicioSeg": 0, "duracaoSeg": 3 },
    { "texto": "This tip changed my life", "inicioSeg": 4, "duracaoSeg": 4 }
  ]
}
```

Use o **mesmo id** do corte.

---

### Passo 7 — Personalizar (seu @)

Abra `src/config.ts` e mude:

```ts
export const MARCA_DAGUA = "@seucanal";
export const COR_PRINCIPAL = "#ff0050";
```

---

### Passo 8 — Traduzir legendas

No terminal:

```bash
npm run traduzir
```

---

### Passo 9 — Renderizar os cortes

```bash
npm run render-all
```

Aguarde. Os vídeos vão aparecer na pasta **`out/`**.

---

### Passo 10 — Baixar no celular

1. No painel de arquivos, abra a pasta `out`
2. Toque com o dedo (ou botão direito) no arquivo `.mp4`
3. Escolha **Download**
4. O vídeo baixa pro celular → pronto pra postar no TikTok / Reels / Shorts

---

## 🔁 Fluxo rápido (depois de já ter o Codespace)

```bash
npm run traduzir
npm run render-all
```

Depois baixe os arquivos da pasta `out/`.

---

## 💻 Quer usar no computador também?

1. Instale o [Node.js LTS](https://nodejs.org)
2. Extraia o ZIP
3. No terminal da pasta:

```bash
npm install
npm run traduzir
npm run render-all
```

Coloque o vídeo em `public/video.mp4`.

---

## 🎯 Dicas

| Dica | Como |
|------|------|
| Duração ideal | 30–60 segundos por corte |
| Gancho forte | Primeira legenda com `inicioSeg: 0` |
| Vídeo grande | Envie pelo Codespace (arraste pro `public/`) |
| Só 1 corte | `npx remotion render src/Root.tsx corte-01 out/corte-01.mp4` |
| Legendas já em PT | Pule o `npm run traduzir` |

---

## ❓ Problemas comuns no celular

**Codespace não abre**  
→ Confirme que está logado no GitHub e tente de novo.

**Vídeo não aparece**  
→ O arquivo precisa se chamar exatamente `video.mp4` e estar dentro de `public/`.

**Tradução falhou**  
→ Precisa de internet. O script mantém o texto original se der erro.

**Render demorando muito**  
→ Normal. Comece com 1 ou 2 cortes curtos (30s) pra testar.

**Limite grátis do Codespace**  
→ A conta gratuita do GitHub dá várias horas por mês. Se acabar, espere o mês seguinte ou use outro computador.
