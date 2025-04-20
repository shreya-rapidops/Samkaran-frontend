import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // ✅ Required for Supabase

export default function YouTubePlaylistCard({ title, playlistId, apiKey }) {
  const [videos, setVideos] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState([]);

  // ✅ Fetch YouTube playlist videos
  useEffect(() => {
    async function fetchVideos() {
      try {
        if (!apiKey || !playlistId) {
          console.error("🚫 API Key or Playlist ID missing");
          return;
        }

        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${apiKey}`
        );
        const data = await res.json();

        if (!data.items) {
            console.error("🚫 Invalid response from YouTube API:", data);
            alert(`YouTube API Error: ${data.error?.message || "Unknown error"}`);
            setVideos([]);
            return;
        }

        setVideos(data.items);
      } catch (err) {
        console.error("❌ Failed to fetch videos:", err);
        setVideos([]);
      }
    }

    fetchVideos();
  }, [playlistId, apiKey]);

  // ✅ Fetch watched videos
  useEffect(() => {
    console.log("📺 Playlist ID:", playlistId);
    console.log("🔑 API Key:", apiKey); 
    async function fetchWatched() {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("video_progress")
        .select("video_id")
        .eq("user_id", user.id)
        .eq("playlist_id", playlistId)
        .eq("watched", true);

      if (!error && data) {
        const ids = data.map((v) => v.video_id);
        setWatchedVideos(ids);
      }
    }

    fetchWatched();
  }, [playlistId]);

  // ✅ Save watched status
  const markWatched = async (videoId) => {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("video_progress").upsert([
      {
        user_id: user.id,
        video_id: videoId,
        playlist_id: playlistId,
        watched: true,
        watched_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("❌ Failed to mark as watched:", error.message);
    } else {
      console.log(`✅ Marked video ${videoId} as watched`);
      setWatchedVideos((prev) => [...prev, videoId]);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {videos.length === 0 ? (
        <p className="text-gray-500">No videos loaded</p>
      ) : (
        videos.map((item) => {
          const videoId =
            item.snippet?.resourceId?.videoId || item.snippet?.videoId;

          return (
            <div key={videoId} className="mb-6">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={item.snippet?.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>

              <p className="mt-1 text-sm font-medium">
                {item.snippet?.title || "Untitled Video"}
              </p>

              {watchedVideos.includes(videoId) ? (
                <p className="mt-2 text-green-600 text-sm font-medium">✅ Watched</p>
              ) : (
                <button
                  onClick={() => markWatched(videoId)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  ✅ Mark as Watched
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
