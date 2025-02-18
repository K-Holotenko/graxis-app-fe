import React, { useRef, useState } from 'react';
import { Carousel, ConfigProvider, Image } from 'antd';
import { CarouselRef } from 'antd/es/carousel';

import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';
import image01 from 'src/assets/images/image01.jpg';
import image02 from 'src/assets/images/image02.jpg';
import image03 from 'src/assets/images/image03.jpg';
import image04 from 'src/assets/images/image04.jpg';
import image05 from 'src/assets/images/image05.jpg';
import image06 from 'src/assets/images/image06.jpg';
import { SCREEN_WIDTH } from 'src/config/constants';

import styles from './styles.module.scss';

export const ImageCarousel = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const [images] = useState([
    { id: 'image01', src: image01 },
    { id: 'image02', src: image02 },
    { id: 'image03', src: image03 },
    { id: 'image04', src: image04 },
    { id: 'image05', src: image05 },
    { id: 'image06', src: image06 },
  ]);

  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;

  return (
    <div className={styles.itemPage}>
      <ConfigProvider theme={isMobile ? mobileLocalTheme : desktopLocalTheme}>
        <Carousel ref={carouselRef}>
          {images.map((image) => (
            <div className={styles.imageWrapper} key={image.id}>
              <Image
                key={image.id}
                src={image.src}
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
                key={image.id}
                src={image.src}
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
