import Image from "next/image";
import POITimer from "@/components/organisms/poiTimer";
import Timer from "@/components/organisms/timer";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center gap-10 bg-gray-100">
        <Timer />
        <POITimer />
    </main>
  );
}
