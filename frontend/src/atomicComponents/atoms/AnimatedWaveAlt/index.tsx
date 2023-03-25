import { memo } from "react";
import WaveFitler from "./WaveFitler";

/** used for e.g. inputs, buttons */
const AnimatedWaveAlt = (): JSX.Element => {
  return (
    <div>
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <WaveFitler />
    </div>
  );
};

export default memo(AnimatedWaveAlt);
