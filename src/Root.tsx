import React from "react";
import { Composition } from "remotion";
import { Corte } from "./Corte";
import { cortes, FPS, WIDTH, HEIGHT } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {cortes.map((corte) => {
        const durationInFrames = Math.max(
          1,
          Math.floor((corte.fimSeg - corte.inicioSeg) * FPS)
        );
        return (
          <Composition
            key={corte.id}
            id={corte.id}
            component={Corte}
            durationInFrames={durationInFrames}
            fps={FPS}
            width={WIDTH}
            height={HEIGHT}
            defaultProps={{ corte }}
          />
        );
      })}
    </>
  );
};
