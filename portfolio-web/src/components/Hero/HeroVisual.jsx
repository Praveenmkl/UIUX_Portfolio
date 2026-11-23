import { useState } from "react";
import ParticleAssemble from "./ParticleAssemble.jsx";

/**
 * Right hero visual column hosting the interactive particle-assemble fingerprint showcase.
 */
export default function HeroVisual() {
  const [replaySignal, setReplaySignal] = useState(0);

  function handleReplay() {
    setReplaySignal((prev) => prev + 1);
  }

  return (
    <div className="hero-visual">
      <button
        className="hero-visual-trigger"
        type="button"
        aria-label="Interactive pale-yellow fingerprint artwork — click to replay assembly"
        title="Move cursor to interact · Click to reassemble"
        onClick={handleReplay}
      >
        <ParticleAssemble replaySignal={replaySignal} />
      </button>
    </div>
  );
}
