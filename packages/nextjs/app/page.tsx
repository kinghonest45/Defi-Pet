"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { FILE_URL, MINT_PRICE } from "~~/utils/constants";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: hasNFT, isLoading } = useScaffoldReadContract({
    contractName: "ARPet",
    functionName: "hasNFT",
    args: [connectedAddress || ""],
  });
  const router = useRouter();

  const { data: imageURI } = useScaffoldReadContract({
    contractName: "ARPet",
    functionName: "imageURI",
  });

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("ARPet");

  if (!connectedAddress) {
    return <div className="flex item-center justify-center mt-10">Please connect your wallet</div>;
  }

  if (isLoading) {
    return (
      <div className="flex item-center justify-center mt-10">
        <span className="w-24 loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 h-96 ">
        <h1 className="text-3xl">Defi Puppy</h1>

        {!hasNFT && (
          <h1 className="w-60 lg:w-96 text-sm pt-0">
            Introducing your new virtual companion: a Defi Puppy that you can mint and bring to life! Once minted, your Defi
            Puppy can roam around your space, interact with you, and join in on various activities.
          </h1>
        )}

        <div>
          <Image src={`${FILE_URL}/${imageURI}`} width={500} height={500} alt="NFT" className="mt-3 w-44 rounded-md" />
          <div className="flex flex-col mx-auto">
            <p className="mb-2">{hasNFT ? `` : `Price: ${MINT_PRICE} ETH`}</p>
            {hasNFT ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  router.push("/pet");
                }}
              >
                Play with your pet
              </button>
            ) : (
              <button
                className="btn btn-primary "
                onClick={async () => {
                  try {
                    await writeYourContractAsync({
                      functionName: "mintPet",
                      value: parseEther(MINT_PRICE),
                    });
                  } catch (e) {
                    console.error("Error with minting:", e);
                  }
                }}
              >
                Mint NFT
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
