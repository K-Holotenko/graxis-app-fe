import { CATEGORIES_DROP_TEXT } from 'src/config/constants';

export const CATEGORIES_DROP_DATA = [
  {
    value: 'energy',
    title: CATEGORIES_DROP_TEXT.energy,
    disabled: true,
    children: [
      {
        value: 'generators',
        title: CATEGORIES_DROP_TEXT.generators,
        path: `${CATEGORIES_DROP_TEXT.generators}/${CATEGORIES_DROP_TEXT.energy}`,
      },
      {
        value: 'stations',
        title: CATEGORIES_DROP_TEXT.stations,
        path: `${CATEGORIES_DROP_TEXT.stations}/${CATEGORIES_DROP_TEXT.energy}`,
      },
      {
        value: 'lighting',
        title: CATEGORIES_DROP_TEXT.lighting,
        path: `${CATEGORIES_DROP_TEXT.lighting}/${CATEGORIES_DROP_TEXT.energy}`,
      },
    ],
  },
  {
    value: 'tech',
    title: CATEGORIES_DROP_TEXT.tech,
    disabled: true,
    children: [
      {
        value: 'photoVideo',
        title: CATEGORIES_DROP_TEXT.photoVideo,
        disabled: true,
        children: [
          {
            value: 'cameras',
            title: CATEGORIES_DROP_TEXT.cameras,
            path: `${CATEGORIES_DROP_TEXT.cameras}/${CATEGORIES_DROP_TEXT.photoVideo}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'videoCameras',
            title: CATEGORIES_DROP_TEXT.videoCameras,
            path:
              `${CATEGORIES_DROP_TEXT.videoCameras}/` +
              `${CATEGORIES_DROP_TEXT.photoVideo}/` +
              `${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'actionCameras',
            title: CATEGORIES_DROP_TEXT.actionCameras,
            path:
              `${CATEGORIES_DROP_TEXT.actionCameras}/` +
              `${CATEGORIES_DROP_TEXT.photoVideo}/` +
              `${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'lenses',
            title: CATEGORIES_DROP_TEXT.lenses,
            path: `${CATEGORIES_DROP_TEXT.lenses}/${CATEGORIES_DROP_TEXT.photoVideo}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'tripods',
            title: CATEGORIES_DROP_TEXT.tripods,
            path: `${CATEGORIES_DROP_TEXT.tripods}/${CATEGORIES_DROP_TEXT.photoVideo}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'flashes',
            title: CATEGORIES_DROP_TEXT.flashes,
            path: `${CATEGORIES_DROP_TEXT.flashes}/${CATEGORIES_DROP_TEXT.photoVideo}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'accessories',
            title: CATEGORIES_DROP_TEXT.accessories,
            path: `${CATEGORIES_DROP_TEXT.accessories}/${CATEGORIES_DROP_TEXT.photoVideo}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'optics',
            title: CATEGORIES_DROP_TEXT.optics,
            path: `${CATEGORIES_DROP_TEXT.optics}/${CATEGORIES_DROP_TEXT.photoVideo}/${CATEGORIES_DROP_TEXT.tech}`,
          },
        ],
      },
      {
        value: 'audio',
        title: CATEGORIES_DROP_TEXT.audio,
        disabled: true,
        children: [
          {
            value: 'mp3Players',
            title: CATEGORIES_DROP_TEXT.mp3Players,
            path: `${CATEGORIES_DROP_TEXT.mp3Players}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'boomboxes',
            title: CATEGORIES_DROP_TEXT.boomboxes,
            path: `${CATEGORIES_DROP_TEXT.boomboxes}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'musicCenters',
            title: CATEGORIES_DROP_TEXT.musicCenters,
            path: `${CATEGORIES_DROP_TEXT.musicCenters}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'speakers',
            title: CATEGORIES_DROP_TEXT.speakers,
            path: `${CATEGORIES_DROP_TEXT.speakers}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'headphones',
            title: CATEGORIES_DROP_TEXT.headphones,
            path: `${CATEGORIES_DROP_TEXT.headphones}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'radios',
            title: CATEGORIES_DROP_TEXT.radios,
            path: `${CATEGORIES_DROP_TEXT.radios}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'portableSpeakers',
            title: CATEGORIES_DROP_TEXT.portableSpeakers,
            path: `${CATEGORIES_DROP_TEXT.portableSpeakers}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'amplifiers',
            title: CATEGORIES_DROP_TEXT.amplifiers,
            path: `${CATEGORIES_DROP_TEXT.amplifiers}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'otherAudio',
            title: CATEGORIES_DROP_TEXT.otherAudio,
            path: `${CATEGORIES_DROP_TEXT.otherAudio}/${CATEGORIES_DROP_TEXT.audio}/${CATEGORIES_DROP_TEXT.tech}`,
          },
        ],
      },
      {
        value: 'consoles',
        title: CATEGORIES_DROP_TEXT.consoles,
        disabled: true,
        children: [
          {
            value: 'tvConsoles',
            title: CATEGORIES_DROP_TEXT.tvConsoles,
            path:
              `${CATEGORIES_DROP_TEXT.tvConsoles}/` +
              `${CATEGORIES_DROP_TEXT.consoles}/` +
              `${CATEGORIES_DROP_TEXT.tech}`,
          },
          {
            value: 'gamingConsoles',
            title: CATEGORIES_DROP_TEXT.gamingConsoles,
            path:
              `${CATEGORIES_DROP_TEXT.gamingConsoles}/` +
              `${CATEGORIES_DROP_TEXT.consoles}/` +
              `${CATEGORIES_DROP_TEXT.tech}`,
          },
        ],
      },
      {
        value: 'projectors',
        title: CATEGORIES_DROP_TEXT.projectors,
        path: `${CATEGORIES_DROP_TEXT.projectors}/${CATEGORIES_DROP_TEXT.tech}`,
      },
    ],
  },
  {
    value: 'other',
    title: CATEGORIES_DROP_TEXT.other,
    disabled: true,
    children: [
      {
        value: 'books',
        title: CATEGORIES_DROP_TEXT.books,
        path: `${CATEGORIES_DROP_TEXT.books}/${CATEGORIES_DROP_TEXT.other}`,
      },
      {
        value: 'games',
        title: CATEGORIES_DROP_TEXT.games,
        path: `${CATEGORIES_DROP_TEXT.games}/${CATEGORIES_DROP_TEXT.other}`,
      },
      {
        value: 'kidsProducts',
        title: CATEGORIES_DROP_TEXT.kids,
        path: `${CATEGORIES_DROP_TEXT.kids}/${CATEGORIES_DROP_TEXT.other}`,
      },
    ],
  },
];
