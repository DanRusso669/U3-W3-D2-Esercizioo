import { Container } from "react-bootstrap";
import SingleArticle from "./SingleArticle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticleDetails from "./ArticleDetails";

function Home() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SingleArticle />} />
          <Route path="/:id" element={<ArticleDetails />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default Home;
