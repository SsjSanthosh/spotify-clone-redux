import ProtectedRoute from "components/ProtectedRoute";
import styles from "./GenrePage.module.scss";
import AppLayout from "components/AppLayout";
import { fetchData } from "utils/functions";
import { GENRES_ENDPOINT } from "utils/endpoints";
import { useEffect, useState } from "react";
import { GenreType } from "utils/types";
import GenreCard from "components/GenreCard";
import Link from "next/link";

const GenrePage = () => {
  const [genres, setGenres] = useState<GenreType[] | []>([]);
  useEffect(() => {
    const fetchAndSetGenres = async () => {
      try {
        const data = await fetchData(GENRES_ENDPOINT);
        setGenres(data.categories.items);
      } catch (err) {
        console.log({ err });
      }
    };
    fetchAndSetGenres();
  }, []);

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className={styles["genre-container"]}>
          {!!genres.length &&
            genres.map((genre: GenreType) => {
              return (
                <Link href={"/category/" + genre.id} key={genre.id}>
                  <GenreCard genre={genre} />
                </Link>
              );
            })}
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default GenrePage;
