import FlexBox from "@/shared/FlexBox";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// type Props = {};

const WatchListBox = () => {
  return (
    <FlexBox width="100%">
      <Button
      // onClick={handleOpenWatchForm}
      >
        <AddCircleIcon fontSize="medium" />
        Add to list
      </Button>
    </FlexBox>
  );
};

export default WatchListBox;
