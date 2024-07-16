// Components
export interface ICMediaSource {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
};

export interface ICSocialProfile {
  id: number;
  attributes: {
    imageSrc: {
      data: ICMediaSource;
    };
    url: string;
    platform: string;
  };
};

export interface ICArticle {
  id: number;
  attributes: {
    title: string;
    description: string;
    blogContent: string;
    articleLength: number;
    slug: string;
    textOnly: boolean;
    headerImage: {
      data: ICMediaSource;
    };
    publishedAt?: string;
  }
};

export interface ICCard {
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
    article: {
      data: ICArticle;
    };
  }
};

export interface ITitle {
  id: number;
  fontSize: 'Small' | 'Medium' | 'Large';
  fontFamily: 'Serif' | 'Sans-serif' | 'Tech Sans-serif';
  text: string;
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

export interface ICLogo {
  id: number;
  attributes: {
    imageSrc: {
      data: ICMediaSource;
    };
    url: string;
  };
};

export interface ICAboutPage {
  id: number;
  attributes: {
    title: string;
    description: string;
    storyTitle: string;
    storyContent: string;
    guidePrincipleGroupTitle: string;
    guidePrincipleGroupDescription: string;
    headerImage: {
      data: ICMediaSource;
    };
    guideUrl: string;
  };
};

export interface ICSignupPage {
  id: number;
  attributes: {
    title: string;
    description: string;
    successTitle: string;
    successDescription: string;
    backgroundImage: {
      data: ICMediaSource;
    };
    foregroundImage: {
      data: ICMediaSource;
    };
  };
};

export interface ICLearnPage {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
};

export interface ICProductPage {
  id: number;
  attributes: {
    title: string;
    introTitle: string;
    introContent: string;
    requestAccessUrl: string;
    bloomEdgeGroupTitle: string;
    valueArsGroupTitle: string;
    unlockSectionTitle: string;
    unlockSectionDescription: string;
    arsStoryTitle: string;
    arsStoryVideo: {
      data: ICMediaSource;
    };
    bloomHeadlineHorizontalAnimation: {
      data: ICMediaSource;
    };
    bloomHeadlineVerticalAnimation: {
      data: ICMediaSource;
    };
    questionUrl: string;
  };
};

export interface ICFooter {
  id: number;
  attributes: {
    copyright: string;
    socialProfiles: ISSocialProfiles;
  }
};

export interface ICContactUs {
  id: number;
  attributes: {
    title: string;
    description: string;
    url: string;
  };
};

export interface ICUser {
  id: number;
  attributes: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    provider: string;
    password: string;
    resetPasswordToken: string;
    confirmationToken: string;
    confirmed: boolean;
    blocked: boolean;
  }
};

export interface ICPageWithArticle {
  id: number;
  attributes: {
    privacyPolicy: string;
    termsOfUse: string;
  };
};

// Strapi Content-Type
export interface ISMediaSource {
  data?: ICMediaSource;
};

export interface ISSocialProfiles {
  data: ICSocialProfile[];
};

export interface ISLogo {
  data: ICLogo;
};

export interface ISArticle {
  data: ICArticle;
}

export interface ISArticles {
  data: ICArticle[];
};

export interface ISCard {
  data: ICCard;
}

export interface ISCards {
  data: ICCard[];
};

export interface ISAboutPage {
  data: ICAboutPage;
};

export interface ISPageWithArticle {
  data: ICPageWithArticle;
};

export interface ISSignupPage {
  data: ICSignupPage;
};

export interface ISLearnPage {
  data: ICLearnPage;
};

export interface ISProductPage {
  data: ICProductPage;
};

export interface ISContactUs {
  data: ICContactUs;
};

export interface ISFooter {
  data: ICFooter;
};
