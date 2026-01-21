/**
 * Lazy-loaded Upload Page
 * Code splitting for heavy upload component
 */

import dynamic from "next/dynamic";
import Skeleton from "@/components/Skeleton";

const UploadPage = dynamic(() => import("../upload/page"), {
  loading: () => <Skeleton variant="page" />,
  ssr: false, // Upload page has client-side heavy logic
});

export default UploadPage;
