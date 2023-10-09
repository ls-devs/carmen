import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2 className="">404 : Page non trouvée</h2>
      <p>La page que vous avez demandez n'existe pas</p>
      <Link href="/">Retourner à l'acceuil</Link>
    </div>
  );
}
