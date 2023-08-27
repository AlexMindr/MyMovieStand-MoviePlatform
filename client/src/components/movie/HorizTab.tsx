import FlexBoxCenter from "@/shared/FlexBoxCenter";
import { MovieImageObjPropsType } from "@/shared/types";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { CSSProperties, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

type Props = {
  TabPanelComp: TabPanelProps;
  images: MovieImageObjPropsType[];
  ImageListStyle?: CSSProperties;
  ImageListItemSx?: SxProps;
  title: string;
};

const IMAGES_OFFSET = 10;

const HorizTab = ({
  TabPanelComp,
  images,
  ImageListItemSx,
  ImageListStyle,
  title,
}: Props) => {
  const { value, index } = TabPanelComp;
  const [imagesLength, setImagesLength] = useState(
    images.length < 10 ? images.length : IMAGES_OFFSET
  );

  //load more images on button click
  const loadMoreImages = () => {
    setImagesLength((prev) => prev + IMAGES_OFFSET);
  };

  if (images.length <= 0)
    return (
      <FlexBoxCenter color={"black"} fontWeight={"bold"} minHeight={"100px"}>
        <em>No images available</em>
      </FlexBoxCenter>
    );
  return (
    <TabPanel value={value} index={index}>
      <ImageList style={{ ...ImageListStyle }}>
        {images.slice(0, imagesLength).map(({ file_path }) => (
          <ImageListItem key={file_path} sx={{ ...ImageListItemSx }}>
            <img
              src={`https://image.tmdb.org/t/p/original/${file_path}`}
              alt={`${title}-${file_path}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
        {imagesLength < images.length ? (
          <ImageListItem sx={{ ...ImageListItemSx }}>
            <FlexBoxCenter
              sx={{
                backgroundColor: "rgba(100,100,100,0.5)",
                width: "auto",
                minHeight: "100%",
              }}
            >
              <IconButton
                onClick={loadMoreImages}
                color={"primary"}
                sx={{ width: "100%", height: "100%" }}
              >
                <AddOutlinedIcon fontSize="large" />
              </IconButton>
            </FlexBoxCenter>
          </ImageListItem>
        ) : (
          <></>
        )}
      </ImageList>
    </TabPanel>
  );
};

export default HorizTab;
