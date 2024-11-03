import React, { useEffect, useRef } from "react";
import { useCharacterAnimations } from "../contexts/CharacterAnimations";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { FEEDING_PRICE } from "~~/utils/constants";

export default function Model({ position, modelURI }: { position?: Vector3; modelURI: string }) {
  const group = useRef<Group>(null);
  const { nodes, animations } = useGLTF(modelURI);
  const { actions, names } = useAnimations(animations, group);
  const { setAnimations, animationIndex }: any = useCharacterAnimations();

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("ARPet");

  const feedPet = async () => {
    try {
      await writeYourContractAsync(
        {
          functionName: "feedPet",
          value: parseEther(FEEDING_PRICE),
        },
        {
          onBlockConfirmation: () => {
            return true;
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
      return false;
    }
    return true;
  };

  useEffect(() => {
    setAnimations(names);
  }, []);
  useGLTF.preload(modelURI);
  useEffect(() => {
    const handleAction = async () => {
      if (actions && names && names[animationIndex]) {
        if (names[animationIndex] === "Feed") {
          actions[names[0]]?.reset().fadeIn(0.5).play();
          const isFeeded = await feedPet(); // Await the feed function
          actions[names[0]]?.fadeOut(0.5);
          if (!isFeeded) {
            actions[names[0]]?.reset().fadeIn(0.5).play();
            return;
          }
        }
        actions[names[animationIndex]]?.reset().fadeIn(0.5).play();
      }
    };

    // Call the async handler function
    handleAction();

    // Return cleanup function
    return () => {
      actions[names[animationIndex]]?.fadeOut(0.5);
    };
  }, [actions, names, animationIndex]);

  return (
    <group ref={group} position={position} dispose={null}>
      <group scale={0.91}>
        <primitive object={nodes.Wolf} />
      </group>
    </group>
  );
}
