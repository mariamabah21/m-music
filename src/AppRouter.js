import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Search from "pages/Search";
import Layout from "components/Layout";
import Genre from "pages/Genre";
import Error from "pages/Error";
import Home from "pages/Home";
import Artist from "pages/Artist";

import PropTypes from "prop-types";

function AppRouter(props) {
  return (
    <ErrorBoundary fallback={<Error isErrorPage />}>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route exact index element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/genres:genreId" element={<Genre />} />
          <Route exact path="/artists:artistId" element={<Artist />} />
          <Route exact path="*" element={<Error />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRouter;
