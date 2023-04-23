import ProtectedRoute from "components/ProtectedRoute";
import styles from "./SearchPage.module.scss";
import AppLayout from "components/AppLayout";
import { useRouter } from "next/router";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <ProtectedRoute>
      <AppLayout>
        <p>search page</p>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default SearchPage;
