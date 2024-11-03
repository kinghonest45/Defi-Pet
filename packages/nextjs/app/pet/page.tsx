"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const DynamicXrHitModelContainer = dynamic(() => import("../_components/XrHitModelContainer"), {
  ssr: false,
});

const Pet: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  const { data: hasNFT, isLoading } = useScaffoldReadContract({
    contractName: "ARPet",
    functionName: "hasNFT",
    args: [connectedAddress || ""],
  });

  if (hasNFT === undefined || isLoading) {
    return (
      <div className="flex item-center justify-center mt-10">
        <span className="w-24 loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 h-96 ">
        {hasNFT ? (
          <DynamicXrHitModelContainer />
        ) : (
          <>
            <h1 className="lg:text-2xl text-md">Please mint a Pet NFT first on the main page</h1>
            <button
              className="btn btn-primary"
              onClick={() => {
                router.push("/");
              }}
            >
              Go to Mint page
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Pet;
