import { CATEGORIES_DROP_TEXT } from 'src/config/constants';

export const CATEGORIES_DROP_DATA = [
  {
    value: 'energy',
    title: CATEGORIES_DROP_TEXT.energy,
    selectable: false,
    children: [
      {
        value: 'generators',
        title: CATEGORIES_DROP_TEXT.generators,
      },
      {
        value: 'stations',
        title: CATEGORIES_DROP_TEXT.stations,
      },
      {
        value: 'lighting',
        title: CATEGORIES_DROP_TEXT.lighting,
      },
    ],
  },
  {
    value: 'tech',
    title: CATEGORIES_DROP_TEXT.tech,
    selectable: false,
    children: [
      {
        value: 'photoVideo',
        title: CATEGORIES_DROP_TEXT.photoVideo,
        selectable: false,
        children: [
          {
            value: 'cameras',
            title: CATEGORIES_DROP_TEXT.cameras,
          },
          {
            value: 'videoCameras',
            title: CATEGORIES_DROP_TEXT.videoCameras,
          },
          {
            value: 'actionCameras',
            title: CATEGORIES_DROP_TEXT.actionCameras,
          },
          {
            value: 'lenses',
            title: CATEGORIES_DROP_TEXT.lenses,
          },
          {
            value: 'tripods',
            title: CATEGORIES_DROP_TEXT.tripods,
          },
          {
            value: 'flashes',
            title: CATEGORIES_DROP_TEXT.flashes,
          },
          {
            value: 'accessories',
            title: CATEGORIES_DROP_TEXT.accessories,
          },
          {
            value: 'optics',
            title: CATEGORIES_DROP_TEXT.optics,
          },
        ],
      },
      {
        value: 'audio',
        title: CATEGORIES_DROP_TEXT.audio,
        selectable: false,
        children: [
          {
            value: 'mp3Players',
            title: CATEGORIES_DROP_TEXT.mp3Players,
          },
          {
            value: 'boomboxes',
            title: CATEGORIES_DROP_TEXT.boomboxes,
          },
          {
            value: 'musicCenters',
            title: CATEGORIES_DROP_TEXT.musicCenters,
          },
          {
            value: 'speakers',
            title: CATEGORIES_DROP_TEXT.speakers,
          },
          {
            value: 'headphones',
            title: CATEGORIES_DROP_TEXT.headphones,
          },
          {
            value: 'radios',
            title: CATEGORIES_DROP_TEXT.radios,
          },
          {
            value: 'portableSpeakers',
            title: CATEGORIES_DROP_TEXT.portableSpeakers,
          },
          {
            value: 'amplifiers',
            title: CATEGORIES_DROP_TEXT.amplifiers,
          },
          {
            value: 'otherAudio',
            title: CATEGORIES_DROP_TEXT.otherAudio,
          },
        ],
      },
      {
        value: 'consoles',
        title: CATEGORIES_DROP_TEXT.consoles,
        selectable: false,
        children: [
          {
            value: 'tvConsoles',
            title: CATEGORIES_DROP_TEXT.tvConsoles,
          },
          {
            value: 'gamingConsoles',
            title: CATEGORIES_DROP_TEXT.gamingConsoles,
          },
        ],
      },
      {
        value: 'projectors',
        title: CATEGORIES_DROP_TEXT.projectors,
      },
    ],
  },
  {
    value: 'other',
    title: CATEGORIES_DROP_TEXT.other,
    selectable: false,
    children: [
      {
        value: 'books',
        title: CATEGORIES_DROP_TEXT.books,
      },
      {
        value: 'games',
        title: CATEGORIES_DROP_TEXT.games,
      },
      {
        value: 'kidsProducts',
        title: CATEGORIES_DROP_TEXT.kids,
      },
    ],
  },
];
