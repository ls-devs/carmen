export type IWPDefault = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: false;
  };
  author: 1;
  featured_media: 0;
  parent: 0;
  menu_order: 0;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: [];
  acf: object;
  _links: {
    self: [
      {
        href: string;
      },
    ];
    collection: [
      {
        href: string;
      },
    ];
    about: [
      {
        href: string;
      },
    ];
    author: [
      {
        embeddable: boolean;
        href: string;
      },
    ];
    replies: [
      {
        embeddable: boolean;
        href: string;
      },
    ];
    'version-history': [
      {
        count: number;
        href: string;
      },
    ];
    'predecessor-version': [
      {
        id: number;
        href: string;
      },
    ];
    'wp:attachment': [
      {
        href: string;
      },
    ];
    curies: [
      {
        name: string;
        href: string;
        templated: boolean;
      },
    ];
  };
};

export type IHomePage = IWPDefault & {
  acf: {
    video_url: string;
  };
};

export type IGaleriePhoto = IWPDefault & {
  acf: {
    images: string[];
  };
};

export type ILaCarte = {
  acf: {
    menu: [
      {
        title: string;
        price: string;
        description: string;
      },
    ];
  };
};

export type INotreHistoire = IWPDefault & {
  acf: {
    title_heading: string;
    text_heading: string;
    title_second: string;
    chez_carmen_content: string[];
    signature_chez_carmen: string;
    titre_bascule: string;
    content_bascule: string[];
  };
};

export type IActualites = IWPDefault & {
  acf: {
    title: string;
    description: string;
    thumbnail: string;
    image: string | boolean;
  };
};

export type IVideos = IWPDefault & {
  acf: {
    title: string;
    url: string;
  };
};

export type IFournisseurs = IWPDefault & {
  acf: {
    name: string;
    description: string;
    logo: string;
  };
};
