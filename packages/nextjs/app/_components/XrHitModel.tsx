import { useRef, useState } from "react";
import Model from "./Model";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { Matrix4, Mesh, Vector3 } from "three";

interface ModelInstance {
  position: Vector3;
  id: number;
}

const XrHitModel = ({ modelURI }: { modelURI: string }) => {
  const reticleRef = useRef<Mesh | null>(null);
  const [models, setModels] = useState<ModelInstance[]>([]);

  const { isPresenting } = useXR();

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  useHitTest((hitMatrix: Matrix4) => {
    if (reticleRef.current) {
      hitMatrix.decompose(reticleRef.current.position, reticleRef.current.quaternion, reticleRef.current.scale);

      reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    }
  });

  const placeModel = (e: any) => {
    const position = e.intersection.object.position.clone();
    const id = Date.now();
    setModels([{ position, id }]);
  };

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting && models.map(({ position, id }) => <Model key={id} position={position} modelURI={modelURI} />)}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}
      {!isPresenting && <Model modelURI={modelURI} />}
    </>
  );
};

export default XrHitModel;
