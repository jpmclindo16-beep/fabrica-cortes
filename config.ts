// ============================================
// ⚙️ CONFIGURAÇÃO DA FÁBRICA DE CORTES
// ============================================

import { cortesBase } from "./cortes";

// Tenta carregar legendas em português, senão usa o original
let legendasPT: Record<string, any[]> = {};
let legendasOriginal: Record<string, any[]> = {};

try {
  legendasPT = require("./legendas-pt.json");
} catch {
  // não existe ainda
}

try {
  legendasOriginal = require("./legendas-original.json");
} catch {
  // não existe
}

const legendas = Object.keys(legendasPT).length > 0 ? legendasPT : legendasOriginal;

export interface Legenda {
  texto: string;
  inicioSeg: number;
  duracaoSeg: number;
}

export interface CorteConfig {
  id: string;
  titulo: string;
  inicioSeg: number;
  fimSeg: number;
  legendas: Legenda[];
}

// Monta os cortes completos com legendas
export const cortes: CorteConfig[] = cortesBase.map((corte) => ({
  ...corte,
  legendas: legendas[corte.id] || [],
}));

// ============================================
// 📐 CONFIGURAÇÕES GLOBAIS
// ============================================
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const VIDEO_INPUT = "video.mp4";
export const OUTPUT_FOLDER = "out";

// ============================================
// 🎨 PERSONALIZAÇÃO (edite aqui!)
// ============================================

/** Seu @ do TikTok / Instagram / YouTube Shorts */
export const MARCA_DAGUA = "@seucanal";

/** Cor principal (barra de progresso + destaques) */
export const COR_PRINCIPAL = "#ff0050";

/** Mostrar título do corte no início? (2 segundos) */
export const MOSTRAR_TITULO_INICIO = true;

/** Duração do título em segundos */
export const DURACAO_TITULO_SEG = 2;

/** Zoom suave no vídeo (efeito Ken Burns leve) */
export const ZOOM_SUAVE = true;

/** Intensidade do zoom (1.0 = sem zoom, 1.08 = 8% de zoom) */
export const ZOOM_INTENSIDADE = 1.06;
