import { useEffect, useState } from "react";
import { fetchAlbums, fetchAlbum } from "../../redux/albumReducer";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import CardMapper from "./CardMapper";
import LandingAside from "./LandingAside";

function LandingPage() {
  const albumData = useSelector((state) => state.album);
  const [data, setData] = useState({});
  const [genre, setGenre] = useState("all-genres")
  const [cat, setCat] = useState("all-categories")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  useEffect(() => {
    //* Fetch a random album if albumData is not empty
    if (albumData && Object.keys(albumData).length > 0) {
      //* Get all album IDs from the albumData
      const albumIds = Object.keys(albumData);
      //* Generate a random index
      const randomIndex = Math.floor(Math.random() * albumIds.length);
      //* Get a random album ID
      const randomAlbumId = albumIds[randomIndex];

      //* Dispatch fetchAlbum only if it's not already fetching or loaded
      if (!albumData[randomAlbumId]) {
        dispatch(fetchAlbum(randomAlbumId));
      }
    }
  }, [albumData, dispatch]);

  useEffect(() => {
    const randomAlbumId = Object.keys(albumData)[0];
    if (albumData[randomAlbumId]) {
      setData(albumData[randomAlbumId]);
    }
  }, [albumData]);


  return (
    <div className="lp-margin">
      <section className="lp-section1">
        <div>
          <div className="lp-genre">
              <button onClick={() => setGenre("all-genres")}>All Genres</button>
              <button onClick={() => setGenre("rock")}>Rock</button>
              <button onClick={() => setGenre("hip-hop/rap")}>Hip-Hop/Rap</button>
              <button onClick={() => setGenre("electronic")}>Electronic</button>
              <button onClick={() => setGenre("jazz")}>Jazz</button>
          </div>
          <div className="lp-category">
              <button onClick={() => setCat("all-categories")}>all categories</button>
              <button onClick={() => setCat("Digital")}>Digital</button>
              <button onClick={() => setCat("Vinyl")}>Vinyl</button>
              <button onClick={() => setCat("CD")}>Compact Discs</button>
              <button onClick={() => setCat("Cassette")}>Cassettes</button>
          </div>
        </div>

      </section>

      <div className="lp-container">
        <section className="lp-section2">
          <CardMapper genre={genre} cat={cat}/>
        </section>


        <aside className="lp-section3">
          <LandingAside data={data} />

        </aside>
      </div>
    </div>
  );
}

export default LandingPage;
