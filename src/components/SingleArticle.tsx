import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import type { Result } from "../interfaces/Api";

const SingleArticle = () => {
  const [articles, setArticles] = useState<Result[]>([]);

  const fetchArticles = async () => {
    try {
      const resp = await fetch("https://api.spaceflightnewsapi.net/v4/articles");

      if (resp.ok) {
        const arrOfArticles = await resp.json();
        setArticles(arrOfArticles.results);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    console.log(articles);
  }, []);

  return (
    <>
      <h1 className="my-4 text-white text-center">Space Review Articles</h1>
      <Row sm={2} md={3} lg={4} xl={5} className="gy-3">
        {articles.map(article => (
          <Col key={article.id}>
            <Card>
              <Card.Img src={article.image_url} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text className="text-truncate">{article.summary}</Card.Text>
                <Card.Text className="text-truncate articleRelease">{new Date(article.published_at).toLocaleDateString()}</Card.Text>
                <Link to={`/${article.id}`} className="btn border-1 border-dark">
                  Read Full Article
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SingleArticle;
