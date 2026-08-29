import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { Legenda, FPS } from "./config";

interface SubtitlesProps {
  legendas: Legenda[];
}

export const Subtitles: React.FC<SubtitlesProps> = ({ legendas }) => {
  const frame = useCurrentFrame();
  const segundoAtual = frame / FPS;

  const legendaAtiva = legendas.find((leg) => {
    const inicio = leg.inicioSeg;
    const fim = leg.inicioSeg + leg.duracaoSeg;
    return segundoAtual >= inicio && segundoAtual < fim;
  });

  if (!legendaAtiva) return null;

  // Frame relativo ao início desta legenda (para animação)
  const frameInicioLegenda = Math.floor(legendaAtiva.inicioSeg * FPS);
  const frameRelativo = frame - frameInicioLegenda;
  const duracaoFrames = Math.floor(legendaAtiva.duracaoSeg * FPS);

  // Entrada: scale + fade (spring)
  const entrada = spring({
    frame: frameRelativo,
    fps: FPS,
    config: { damping: 18, stiffness: 160, mass: 0.7 },
  });

  // Saída: fade nos últimos 8 frames
  const saida = interpolate(
    frameRelativo,
    [duracaoFrames - 8, duracaoFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(entrada, saida);
  const scale = interpolate(entrada, [0, 1], [0.88, 1]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 140,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 50px",
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          color: "#ffffff",
          fontSize: 50,
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          fontWeight: 800,
          padding: "18px 32px",
          borderRadius: 16,
          textAlign: "center",
          lineHeight: 1.3,
          textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
          maxWidth: "94%",
          letterSpacing: 0.3,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {legendaAtiva.texto}
      </div>
    </div>
  );
};
