import FlexBoxCenter from "@/shared/FlexBoxCenter";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <FlexBoxCenter minHeight="100dvh" overflow="hidden">
      <CircularProgress color="primary" />
    </FlexBoxCenter>
  );
};

export default Loading;
