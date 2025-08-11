import { TiledAnimation } from '@/app/components/TiledAnimation';

export default function Home() {
  return (
    <div className="relative min-h-dvh">
      <TiledAnimation className="pointer-events-none absolute inset-0 will-change-transform" />
    </div>
  );
}
