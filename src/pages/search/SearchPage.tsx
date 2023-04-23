import ProtectedRoute from "components/ProtectedRoute";
import styles from "./SearchPage.module.scss";
import AppLayout from "components/AppLayout";

const SearchPage = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <p>Search page</p>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default SearchPage;
