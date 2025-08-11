import { TiledAnimation } from '@/app/components/TiledAnimation';
import { AnimatedText } from '@/app/components/AnimatedText';

export default function Home() {
  return (
    <div className="relative min-h-100vh">
      <TiledAnimation className="pointer-events-none absolute inset-0 will-change-transform" />
      <div className={'h-[100vh] grid place-items-center p-4'}>
        <AnimatedText text={'Polytope Labs'} />
      </div>
    </div>
  );
}
