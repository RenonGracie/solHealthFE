import person1Image from './assets/person-1.webp';
import person2Image from './assets/person-2.webp';
import person3Image from './assets/person-3.webp';
import person4Image from './assets/person-4.webp';
import eyeImage from './assets/eye.webp';
import friendsImage from './assets/friends.webp';
import handsImage from './assets/hands.webp';

interface ILoadingItem {
  text: string;
  className?: string;
  image?: {
    src: string;
    position: 'before' | 'after';
    className?: string;
  };
  withDots?: boolean;
}

interface ILoadingState {
  lines: ILoadingItem[][];
}

export const loadingStates: ILoadingState[] = [
  {
    lines: [
      [
        {
          text: 'Good',
          image: { src: person1Image, position: 'after' },
        },
        { text: 'Things' },
      ],
      [
        {
          text: 'Take',
          className: 'italic',
          image: {
            src: person2Image,
            position: 'before',
            className: 'ml-[20px] lg:ml-[32px] mr-[8px]',
          },
        },
        { text: 'Time', className: 'italic', withDots: true },
      ],
    ],
  },
  {
    lines: [
      [
        {
          text: "You're",
          image: { src: person3Image, position: 'after' },
        },
        { text: 'Exactly' },
      ],
      [
        {
          text: 'Where You',
          image: { src: handsImage, position: 'after' },
        },
      ],
      [
        {
          text: 'Need to Be',
          image: { src: friendsImage, position: 'before' },
          className: 'italic',
          withDots: true,
        },
      ],
    ],
  },
  {
    lines: [
      [
        {
          text: 'Finding',
          image: { src: person4Image, position: 'after' },
        },
        { text: 'Your', className: 'mr-3' },
      ],
      [
        {
          text: 'Best',
          className: 'italic',
          image: { src: eyeImage, position: 'after' },
        },
        { text: 'Therapist', withDots: true },
      ],
    ],
  },
];
