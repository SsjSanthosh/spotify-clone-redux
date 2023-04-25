import { COMMON_SKELETON_PROPS } from "utils/constants";
import styles from "./GenericPageSkeleton.module.scss";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import ProtectedRoute from "components/ProtectedRoute";
import AppLayout from "components/AppLayout";

const GenericPageSkeleton = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className={styles["skeleton-container"]}>
          <div className={styles["skeleton-header-container"]}>
            <SkeletonCircle size="250" {...COMMON_SKELETON_PROPS} />
          </div>
          <div>
            <SkeletonText
              noOfLines={12}
              spacing={4}
              height={200}
              {...COMMON_SKELETON_PROPS}
            />
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default GenericPageSkeleton;
