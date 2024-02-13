import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Search from "pages/Search";
import Layout from "components/Layout";
import Genre from "pages/Genre";
import Error from "pages/Error";
import Home from "pages/Home";

import PropTypes from "prop-types";

function AppRouter(props) {
  return (
    <ErrorBoundary fallback={<Error isErrorPage />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genre" element={<Genre />} />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRouter;
