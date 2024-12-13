import powerIcon from 'src/assets/icons/power-icon.svg';
import techIcon from 'src/assets/icons/tech-icon.svg';
import otherIcon from 'src/assets/icons/other-icon.svg';
import plusIcon from 'src/assets/icons/plus-icon.svg';
import telegramIcon from 'src/assets/icons/telegram-icon-small.svg';
import { CATEGORIES_CARD_NAME, SOCIAL_MEDIA_LIST } from 'src/config/constants';

export const CATEGORIES_SECTION_CARD = [
  {
    id: 'cat-001',
    title: CATEGORIES_CARD_NAME.POWER,
    image: powerIcon,
    link: '/login',
  },
  {
    id: 'cat-002',
    title: CATEGORIES_CARD_NAME.TECH,
    image: techIcon,
    link: '/login',
  },
  {
    id: 'cat-003',
    title: CATEGORIES_CARD_NAME.OTHER,
    image: otherIcon,
    link: '/login',
  },
  {
    id: 'cat-004',
    title: CATEGORIES_CARD_NAME.SUGGESTION,
    image: plusIcon,
    link: SOCIAL_MEDIA_LIST.find((item) => item.key === 'telegram')?.href || '',
    icon: telegramIcon,
  },
];
