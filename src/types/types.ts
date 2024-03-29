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
    video_block_text: string;
  };
};

export type IGaleriePhoto = IWPDefault & {
  acf: {
    images: [
      {
        image: string;
        titre: string;
        description: string;
        type: [string];
      },
    ];
  };
};

export type ILaCarte = {
  acf: {
    menus: [
      {
        title: string;
        price: string;
        description: string;
        note: string;
      },
    ];
    plats: [
      {
        title: string;
        plats: string;
      },
    ];
    plats_mis_en_avant: [
      {
        title: string;
        price: string;
      },
    ];
    a_la_carte: [
      {
        title: string;
        plats: [
          {
            title: string;
            price: string;
          },
        ];
      },
    ];
    les_viandes: [
      {
        title: string;
        plats: [
          {
            name: string;
            price: string;
          },
        ];
      },
    ];
  };
};

export type INotreHistoire = IWPDefault & {
  acf: {
    title_heading: string;
    subtitle_heading: string;
    texte_heading: string;
    title_second: string;
    chez_carmen_content: [
      {
        date: string;
        text: string;
        little_word: string;
        images: string | boolean;
      },
    ];
    signature_chez_carmen: [
      {
        images: [
          {
            image: string;
          },
        ];
      },
    ];
    titre_bascule: string;
    content_bascule: [
      {
        date: string;
        text: string;
        little_word: string;
        images: string | boolean;
      },
    ];
  };
};

export type IActualites = IWPDefault & {
  acf: {
    title: string;
    description: string;
    thumbnail: string;
    image: string | boolean;
    intro_actu: string;
  };
};

export type IVideos = IWPDefault & {
  acf: {
    title: string;
    url: string;
    description: string;
  };
};

export type IFournisseurs = IWPDefault & {
  acf: {
    name: string;
    description: string;
    logo: string;
    images: { image: string }[];
  };
};

export type FournisseursFmt = {
  acf: {
    name: string;
    description: string;
    logo: string;
    images: { image: string }[];
  };
};

export type IOptions = {
  acf: {
    address: string;
    contact_mail: string;
    logo_carmen_red: string;
    logo_carmen_creme: string;
    tel: string;
    medias: [
      {
        name: string;
        link: string;
      },
    ];
  };
};

export type Inputs = {
  NOM: string;
  EMAIL: string;
  PRENOM: string;
  TEL: string;
  OBJECT: string;
  MESSAGE: string;
};
