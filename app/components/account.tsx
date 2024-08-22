"use client";
import { useAccount, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { data: ensNameData } = useEnsName({ address });

  return (
    <div className="border border-white bg-black mt-4">
      {ensNameData ?? address}
      {ensNameData ? ` (${address})` : null}
    </div>
  );
}
