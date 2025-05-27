import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import type { Result } from "../interfaces/Api";

const ArticleDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState<Result | null>(null);

  const fetchArticleDetails = async () => {
    try {
      const resp = await fetch("https://api.spaceflightnewsapi.net/v4/articles/" + id);

      if (resp.ok) {
        const article: Result = await resp.json();
        setData(article);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {data ? (
        <>
          <h1 className="text-white text-center my-3">{data.title}</h1>
          <div className="d-flex">
            <Image src={data.image_url} className="img-fluid" style={{ maxWidth: 400 }} />
            <div className="d-flex flex-column align-items-end">
              <p className="ms-2 text-white">{data.summary}</p>
              <p className="ms-2 text-white my-0">{data.authors[0].name}</p>
              <p className="ms-2 text-white">{new Date(data.published_at).toLocaleDateString()}</p>
              {data.launches[0] && <p className="ms-2 text-white my-0">{data.launches[0].provider}</p>}
              <Link className="text-danger " to={data.url}>
                See the source from {data.news_site}
              </Link>
              <Link to={"/"} className="btn bg-danger mt-auto">
                Go back
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ArticleDetails;
