import EventBar from "./_components/EventBar";
import KakaoMap from "./_components/kakaoMap";

export default function Home() {
  return (
    <main className="flex min-h-[100vh] flex-col items-center justify-between p-14 relative">
      <EventBar />
      <KakaoMap />
    </main>
  );
}
