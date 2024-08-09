import { useEffect, useState } from "react";
import { fetchAlbums, fetchAlbum } from "../../redux/albumReducer";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import CardMapper from "./CardMapper";
// import * as landingUpper from "./LandingUpper"
import LandingUpper from "./LandingUpper"
import LandingAside from "./LandingAside";

function LandingPage() {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  // Get the album data from Redux state
  const albumData = useSelector((state) => state.album);
  // const albums = Object.values(albumData)

  // let genreFilter = () => {}
    // function genreFilter(genre) {
    //   let result = albums.filter((album) => album.genre === genre)

    //   return result
    // }

// console.log("ALBUMDATA",albumData)
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
    <>
      <section className="LPsection1">
        <LandingUpper />
      </section>

      <div className="LPcontainer">
        <section className="LPsection2">
          <CardMapper />
        </section>

        <aside className="LPsection3">
          <LandingAside data={data} />
        </aside>
      </div>
    </>
  );
}

export default LandingPage;
