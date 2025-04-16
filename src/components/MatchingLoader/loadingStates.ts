import person1Image from './assets/person-1.webp';
import person2Image from './assets/person-2.webp';
import person3Image from './assets/person-3.webp';
import person4Image from './assets/person-4.webp';
import person5Image from './assets/person-5.webp';
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
          text: 'Analyzing',
          image: { src: person1Image, position: 'after' },
        },
        { text: 'Your' },
      ],
      [
        {
          text: 'Sign Up',
          image: {
            src: person2Image,
            position: 'before',
            className: 'ml-[20px] lg:ml-[32px] mr-[8px]',
          },
        },
      ],
      [
        {
          text: 'Preferences',
          className: 'italic ml-[32px]',
          image: { src: person3Image, position: 'after' },
          withDots: true,
        },
      ],
    ],
  },
  {
    lines: [
      [
        {
          text: 'Running',
          image: { src: person4Image, position: 'after' },
        },
        { text: 'Our' },
      ],
      [
        {
          text: 'Matching',
          className: 'italic',
          image: { src: handsImage, position: 'after' },
        },
      ],
      [
        {
          text: 'Algorithm',
          image: { src: friendsImage, position: 'before' },
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
          image: { src: person5Image, position: 'after' },
        },
        { text: 'Your' },
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
