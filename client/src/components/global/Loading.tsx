import FlexBoxCenter from "@/shared/FlexBoxCenter";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  minHeight?: string;
};

const Loading = ({ minHeight = "60dvh" }: Props) => {
  return (
    <FlexBoxCenter minHeight={minHeight} overflow="hidden">
      <CircularProgress color="primary" />
    </FlexBoxCenter>
  );
};

export default Loading;
