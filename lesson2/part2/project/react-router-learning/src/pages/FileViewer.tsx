import { useParams } from "react-router";

const FileViewer = () => {
  const { "*": filePath } = useParams();
  return <div>{filePath}</div>;
};

export default FileViewer;
