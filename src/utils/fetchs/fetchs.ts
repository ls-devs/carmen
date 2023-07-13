export const fetchOptions = async () => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_CARMEN_OPTION_PAGE}`, {
    next: { revalidate: 60 },
  });
  return req.json();
};

export const fetchCarte = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CARMEN_BASE_URL}/pages?search="La Carte"`,
    { next: { revalidate: 60 } },
  );
  return req.json();
};

export const fetchActualites = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CARMEN_BASE_URL}/actualites`,
    { next: { revalidate: 60 } },
  );
  return req.json();
};

export const fetchHistoire = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CARMEN_BASE_URL}/pages?search="Notre Histoire`,
    { next: { revalidate: 60 } },
  );
  return req.json();
};

export const fetchAccueil = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CARMEN_BASE_URL}/pages?search="Accueil"`,
    { next: { revalidate: 60 } },
  );
  return req.json();
};

export const fetchFournisseurs = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CARMEN_BASE_URL}/fournisseurs`,
    { next: { revalidate: 60 } },
  );
  return req.json();
};

export const fetchPolicies = async () => {
  const req = await fetch(
    `${process.env.CARMEN_BASE_URL}/pages?search="Politique de confidentialité"`,
    { next: { revalidate: 60 } },
  );
  return req.json();
};

export const fetchVidéos = async () => {
  const req = await fetch(`${process.env.CARMEN_BASE_URL}/les_videos"`, {
    next: { revalidate: 60 },
  });
  return req.json();
};
