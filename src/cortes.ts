// ============================================
// 🎬 ESTRUTURA DOS CORTES (sem legendas)
// ============================================
// Edite aqui os tempos de cada corte.
// As legendas ficam no arquivo legendas-original.json

export interface CorteBase {
  id: string;
  titulo: string;
  inicioSeg: number;
  fimSeg: number;
}

export const cortesBase: CorteBase[] = [
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
  {
    id: "corte-03",
    titulo: "Dica ouro",
    inicioSeg: 300,
    fimSeg: 330,
  },
];
