import { useRef, useState } from 'react';
import { Carousel, ConfigProvider, Image } from 'antd';
import { CarouselRef } from 'antd/es/carousel';

import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';

import styles from './styles.module.scss';

interface Image {
  url: string;
}

interface ImageCarouselProps {
  pictures: Image[];
}

export const ImageCarousel = ({ pictures }: ImageCarouselProps) => {
  const carouselRef = useRef<CarouselRef>(null);

  const [images] = useState(pictures);

  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;

  return (
    <div className={styles.itemPage}>
      <ConfigProvider theme={isMobile ? mobileLocalTheme : desktopLocalTheme}>
        <Carousel ref={carouselRef}>
          {images.map((image) => (
            <div key={image.url}>
              <Image
                src={image.url}
                preview={false}
                className={styles.carouselMainImage}
              />
            </div>
          ))}
        </Carousel>

        {!isMobile && (
          <div className={styles.carouselPreviewImages}>
            {images.map((image, index) => (
              <Image
                key={image.url}
                src={image.url}
                preview={false}
                className={styles.carouselPreviewImage}
                onClick={() => carouselRef.current?.goTo(index)}
              />
            ))}
          </div>
        )}
      </ConfigProvider>
    </div>
  );
};

const desktopLocalTheme = {
  components: {
    Carousel: {
      dotOffset: -14,
      dotHeight: 6,
      dotWidth: 32,
      dotGap: 12,
      dotActiveWidth: 48,
      colorBgContainer: theme.primary,
    },
  },
};

const mobileLocalTheme = {
  components: {
    Carousel: {
      dotOffset: -14,
      dotGap: 12,
      dotHeight: 4,
      dotWidth: 32,
      dotActiveWidth: 48,
      colorBgContainer: theme.primary,
    },
  },
};
