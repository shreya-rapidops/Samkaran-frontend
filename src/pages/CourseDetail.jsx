import { useParams } from "react-router-dom";
import YouTubePlaylistCard from "../components/YouTubePlaylistCard";

const API_KEY = "AIzaSyA_5hTxftHFLexSQOpYKw4GesNLcvLSBk8";

const playlists = [
  { title: "Mathematics", playlistId: "PLxyGaR3hEy3gk_Li5kx4pJ7TSOYE2EQPQ" },
  { title: "Physics", playlistId: "PLw2ZiQ6OwlOV9hu0ZSsr4s2zNBl1kD1-A" },
  { title: "Chemistry", playlistId: "PL2Li3eVAuCF4WFZbON_4dJ4k5HiGhAQjS" },
  { title: "General Studies", playlistId: "PLw2ZiQ6OwlOVItTF7ZgFLaYQAOuIWkuvr" },
  { title: "Aptitude", playlistId: "PL8p2I9GklV454LdGfDOw0KkNazKuA-6B2" },
  { title: "English", playlistId: "PLt5oqnWoj07h0_H0BjeFqkzw8OSBlXnu2" },
];

export default function CourseDetail() {
  const { playlistId } = useParams();
  const course = playlists.find((p) => p.playlistId === playlistId);

  if (!course) {
    return <div className="p-6 text-red-600 text-lg">❌ Course not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <YouTubePlaylistCard
        title={course.title}
        playlistId={course.playlistId}
        apiKey={API_KEY}
      />
    </div>
  );
}
