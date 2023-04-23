import ProtectedRoute from "components/ProtectedRoute";
import styles from "./CategoryPage.module.scss";
import AppLayout from "components/AppLayout";

const CategoryPage = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <p>Category</p>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default CategoryPage;
