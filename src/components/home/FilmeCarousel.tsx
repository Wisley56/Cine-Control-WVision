'use client';

import { Filme } from '@/interfaces/filme';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

interface FilmeCarouselProps {
  filmes: Filme[];
}

export default function FilmeCarousel({ filmes }: FilmeCarouselProps) {
  if (!filmes || filmes.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8">
      <h2 className="text-3xl font-bold text-[var(--primary-accent)] mb-10 text-center">
        Filmes em Destaque
      </h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true, 
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="!pb-12 md:!pb-16"
        style={{
          // @ts-ignore
          '--swiper-navigation-color': 'var(--primary-accent)', 
          '--swiper-pagination-color': 'var(--primary-accent)', 
        }}
      >
        {filmes.map((filme) => (
          <SwiperSlide
            key={filme.id}
            className="!w-60 md:!w-72 group !h-auto"
          >
            <Link href={`/filmes/${filme.id}`} className="block h-full">
              
              <div className="bg-[var(--card-background)] rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-[var(--border-color)] overflow-hidden h-full flex flex-col">
                <div className="aspect-[2/3] w-full overflow-hidden">
                  <img
                    src={filme.imagemUrl || 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
                    alt={`Poster do filme ${filme.titulo}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-[var(--highlight-text)] mb-2 group-hover:text-[var(--primary-accent)] transition-colors leading-tight"> 
                    {filme.titulo}
                  </h3>
                  <p className="text-xs text-[var(--muted-text)]">
                    {filme.genero} - {filme.duracao} min.
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}