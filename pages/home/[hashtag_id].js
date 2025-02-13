import { useRouter } from 'next/router';

const HashtagPage = () => {
    const router = useRouter();
    const { hashtag_id } = router.query; // Récupère l'ID du tweet depuis l'URL

    return (
        <div>
            <h1>Hashtag ID: {hashtag_id}</h1>
            <p>Affichage des tweets qui ont le hashtag_id: {hashtag_id}</p>
        </div>
    );
};

export default HashtagPage;