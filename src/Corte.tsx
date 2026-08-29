import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { Subtitles } from "./Subtitles";
import {
  CorteConfig,
  FPS,
  VIDEO_INPUT,
  WIDTH,
  HEIGHT,
  MARCA_DAGUA,
  COR_PRINCIPAL,
  MOSTRAR_TITULO_INICIO,
  DURACAO_TITULO_SEG,
  ZOOM_SUAVE,
  ZOOM_INTENSIDADE,
} from "./config";

interface CorteProps {
  corte: CorteConfig;
}

export const Corte: React.FC<CorteProps> = ({ corte }) => {
  const startFrame = Math.floor(corte.inicioSeg * FPS);
  const endFrame = Math.floor(corte.fimSeg * FPS);
  const durationInFrames = endFrame - startFrame;
  const frame = useCurrentFrame();

  // Zoom suave (Ken Burns leve)
  const zoom = ZOOM_SUAVE
    ? interpolate(frame, [0, durationInFrames], [1, ZOOM_INTENSIDADE], {
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        width: WIDTH,
        height: HEIGHT,
      }}
    >
      {/* Vídeo com zoom suave */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OffthreadVideo
            src={staticFile(VIDEO_INPUT)}
            startFrom={startFrame}
            endAt={endFrame}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoom})`,
            }}
          />
        </div>
      </Sequence>

      {/* Legendas animadas */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <Subtitles legendas={corte.legendas} />
      </Sequence>

      {/* Título no início do corte */}
      {MOSTRAR_TITULO_INICIO && (
        <TituloInicio titulo={corte.titulo} duracaoSeg={DURACAO_TITULO_SEG} />
      )}

      {/* Marca d'água */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 28,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: 12,
          fontSize: 26,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 700,
          zIndex: 20,
          letterSpacing: 0.5,
          border: `2px solid ${COR_PRINCIPAL}`,
        }}
      >
        {MARCA_DAGUA}
      </div>

      {/* Barra de progresso estilo TikTok */}
      <ProgressBar durationInFrames={durationInFrames} cor={COR_PRINCIPAL} />
    </AbsoluteFill>
  );
};

/** Título que aparece no início do corte e some com animação */
const TituloInicio: React.FC<{ titulo: string; duracaoSeg: number }> = ({
  titulo,
  duracaoSeg,
}) => {
  const frame = useCurrentFrame();
  const duracaoFrames = Math.floor(duracaoSeg * FPS);

  if (frame > duracaoFrames) return null;

  const entrada = spring({
    frame,
    fps: FPS,
    config: { damping: 16, stiffness: 140 },
  });

  const saida = interpolate(
    frame,
    [duracaoFrames - 12, duracaoFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(entrada, saida);
  const translateY = interpolate(entrada, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 15,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
          color: "#fff",
          fontSize: 36,
          fontWeight: 800,
          padding: "14px 28px",
          borderRadius: 14,
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          maxWidth: "85%",
          letterSpacing: 0.4,
        }}
      >
        {titulo}
      </div>
    </div>
  );
};

const ProgressBar: React.FC<{ durationInFrames: number; cor: string }> = ({
  durationInFrames,
  cor,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / durationInFrames, 1);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 6,
        backgroundColor: "rgba(255,255,255,0.18)",
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          backgroundColor: cor,
        }}
      />
    </div>
  );
};
