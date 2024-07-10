export interface ICMediaSource {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
};

export interface ITitle {
  id: number;
  fontSize: 'Small' | 'Medium' | 'Large';
  fontFamily: 'Serif' | 'Sans-serif' | 'Tech Sans-serif';
  text: string;
};

export interface ISMediaSource {
  data?: ICMediaSource;
};

export interface IBackground {
  id: number;
  backgroundColor: string;
  backgroundAnimation: ISMediaSource;
  backgroundImage: ISMediaSource;
  foregroundImage: ISMediaSource;
  foregroundMask: ISMediaSource;
  foregroundAnimation: ISMediaSource;
};

export interface ICArticle {
  id: number;
  attributes: {
    subtitle: string;
    category: string;
    description: string;
    linkName: string;
    url: string;
    caption: string;
    title: ITitle;
    background: IBackground;
    value: string;
    blogContent: string;
    publishedAt?: string;
  }
};