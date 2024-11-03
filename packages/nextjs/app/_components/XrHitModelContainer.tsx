import { useState } from "react";
import { CharacterAnimationsProvider } from "../contexts/CharacterAnimations";
import Interface from "./Interface";
import XrHitModel from "./XrHitModel";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { FILE_URL } from "~~/utils/constants";

const XrHitModelContainer = () => {
  const [overlayContent, setOverlayContent] = useState<HTMLElement | null>(null);

  const interfaceRef = (node: HTMLElement | null) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  };

  const { data: modelCID, isLoading } = useScaffoldReadContract({
    contractName: "ARPet",
    functionName: "baseURI",
  });

  if (isLoading) {
    return (
      <div className="flex item-center justify-center mt-10">
        <span className="w-24 loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <>
      <CharacterAnimationsProvider>
        <ARButton
          sessionInit={{
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
            domOverlay: { root: overlayContent as Element },
          }}
        />
        <Canvas>
          <XR>{modelCID && <XrHitModel modelURI={`${FILE_URL}/${modelCID}`} />}</XR>
        </Canvas>
        <Interface ref={interfaceRef} />
      </CharacterAnimationsProvider>
    </>
  );
};

export default XrHitModelContainer;
