import { useEffect, useState } from "react";
import { fetchAlbums } from "../../redux/albumReducer";
// , fetchAlbum
import { useDispatch } from "react-redux";
// , useSelector
import "./LandingPage.css";
import CardMapper from "./CardMapper";
import LandingAside from "./LandingAside";

function LandingPage() {
  // const albumData = useSelector((state) => state.album);
  // const [data, setData] = useState({});
  const [genre, setGenre] = useState("all-genres")
  const [cat, setCat] = useState("all-categories")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  // useEffect(() => {
  //   //* Fetch a random album if albumData is not empty
  //   if (albumData && Object.keys(albumData).length > 0) {
  //     //* Get all album IDs from the albumData
  //     const albumIds = Object.keys(albumData);
  //     //* Generate a random index
  //     const randomIndex = Math.floor(Math.random() * albumIds.length);
  //     //* Get a random album ID
  //     const randomAlbumId = albumIds[randomIndex];

  //     //* Dispatch fetchAlbum only if it's not already fetching or loaded
  //     if (!albumData[randomAlbumId]) {
  //       dispatch(fetchAlbum(randomAlbumId));
  //     }
  //   }
  // }, [albumData, dispatch]);

  // useEffect(() => {
  //   const randomAlbumId = Object.keys(albumData)[0];
  //   if (albumData[randomAlbumId]) {
  //     setData(albumData[randomAlbumId]);
  //   }
  // }, [albumData]);


  return (
    <>
      <section className="LPsection1">

        <div className="LPupperButtons">
          <div className="LPgenre">
              <button onClick={() => setGenre("all-genres")}>All Genres</button>
              <button onClick={() => setGenre("rock")}>Rock</button>
              <button onClick={() => setGenre("hip-hop/rap")}>Hip-Hop/Rap</button>
              <button onClick={() => setGenre("electronic")}>Electronic</button>
              <button onClick={() => setGenre("jazz")}>Jazz</button>
          </div>
          <div className="LPcategory">
              <button onClick={() => setCat("all-categories")}>all categories</button>
              <button onClick={() => setCat("Digital")}>Digital</button>
              <button onClick={() => setCat("Vinyl")}>Vinyl</button>
              <button onClick={() => setCat("CD")}>Compact Discs</button>
              <button onClick={() => setCat("Cassette")}>Cassettes</button>
          </div>
        </div>

      </section>

      <div className="LPcontainer">
        <section className="LPsection2">
          <CardMapper genre={genre} cat={cat}/>
        </section>

        <aside className="LPsection3">
          <LandingAside />
          {/* data={data} */}

        </aside>
      </div>
    </>
  );
}

export default LandingPage;
