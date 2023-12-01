import { ReactElement } from 'react';

export interface IHomeBannerData {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
}

export interface IHomeSectionOneData {
  title: string;
  content: string;
  src: string;
}

export interface IHomeSectionTwoData {
  title: string;
  content: ReactElement[];
  svg: ReactElement;
}
