import FlexBoxCenter from "@/shared/FlexBoxCenter";
import { MovieCrewPropsType, MovieCastPropsType } from "@/shared/types";
import { SxProps, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { CSSProperties, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import imageUnknown from "@/assets/unknown.jpg";

type Props<T> = {
  images: T[];
  ImageListStyle?: CSSProperties;
  ImageListItemSx?: SxProps;
  title: string;
};

const IMAGES_OFFSET = 10;

function isCrew(
  images: (MovieCrewPropsType | MovieCastPropsType)[]
): images is MovieCrewPropsType[] {
  return "job" in images[0];
}
function isCast(
  images: (MovieCrewPropsType | MovieCastPropsType)[]
): images is MovieCastPropsType[] {
  return "character" in images[0];
}

const VerticalImgList = ({
  images,
  ImageListItemSx,
  ImageListStyle,
  title,
}: Props<MovieCrewPropsType | MovieCastPropsType>) => {
  const { palette } = useTheme();
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
  const ImageBoxSx = {
    gridColumn: "1/3",
    minHeight: "100%",
    "&>img": {
      // maxWidth: "150px",
      objectFit: "cover",
      maxWidth: "100%",
      width: "auto",
      height: "100%",
      minHeight: "110px",
    },
  };
  const ImageInfoBoxSx = {
    gridColumn: "3/9",
    width: "90%",
    alignSelf: "center",
    justifySelf: "right",
    paddingLeft: "1rem",
    marginRight: "0.5rem",
    // position: "relative",
    // isolation: "isolate",
    // "&::before": {
    //   content: '" - "',
    //   gridColumn: "3/4",
    //   alignSelf: "center",
    //   justifySelf: "right",
    //   position: "absolute",
    //   zIndex: "-1",
    //   fontSize: { xs: "4rem", sm: "5rem", md: "4.5rem", xl: "5.5rem" },
    //   fontFamily: "serif",
    //   fontWeight: "900",
    //   // bottom: "0%",
    //   // left: "-15%",
    //   // rotate: "90deg",
    //   color: palette.primary[600],
    // },
    // // "&::after": {
    // //   content: "no-close-quote",
    // //   // position: "absolute",
    // //   // zIndex: "-1",
    // //   // fontSize: "4.5rem",
    // //   // fontFamily: "serif",
    // //   // fontWeight: "900",
    // //   // top: "25%",
    // //   // right: "-25%",
    // //   // rotate: "90deg",
    // //   // color: palette.primary[600],
    // // },
  };
  return (
    <ImageList style={{ ...ImageListStyle }}>
      {isCrew(images)
        ? images.slice(0, imagesLength).map(({ profile_path, job, name }) => (
            <ImageListItem key={`${job}-${name}`} sx={{ ...ImageListItemSx }}>
              <Box
                sx={{
                  ...ImageBoxSx,
                }}
              >
                {profile_path ? (
                  <img
                    // height="100%"
                    src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                    alt={`${job}-${name}`}
                    loading="lazy"
                  />
                ) : (
                  <img
                    // height="100%"
                    src={imageUnknown}
                    alt={`${job}-${name}-undefined`}
                    loading="lazy"
                  />
                )}
              </Box>
              <Paper elevation={4} sx={{ ...ImageInfoBoxSx }}>
                <Typography
                  variant="h6"
                  component="h5"
                  sx={{ color: palette.secondary[300], fontSize: "1rem" }}
                >
                  {job}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: palette.grey[400], fontSize: "0.9rem" }}
                >
                  {name}
                </Typography>
              </Paper>
            </ImageListItem>
          ))
        : null}
      {isCast(images)
        ? images
            .slice(0, imagesLength)
            .map(({ profile_path, character, name }) => (
              <ImageListItem
                key={`${character}-${name}`}
                sx={{ ...ImageListItemSx }}
              >
                <Box
                  sx={{
                    ...ImageBoxSx,
                  }}
                >
                  {profile_path ? (
                    <img
                      // height="100%"
                      src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                      alt={`${character}-${name}`}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      // height="100%"
                      src={imageUnknown}
                      alt={`${character}-${name}-undefined`}
                      loading="lazy"
                    />
                  )}
                </Box>
                <Paper
                  elevation={4}
                  sx={{
                    ...ImageInfoBoxSx,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h5"
                    sx={{ color: palette.tertiary[600], fontSize: "1rem" }}
                  >
                    {character}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: palette.grey[400], fontSize: "0.9rem" }}
                  >
                    {name}
                  </Typography>
                </Paper>
              </ImageListItem>
            ))
        : null}
      {imagesLength < images.length ? (
        <ImageListItem sx={{ ...ImageListItemSx }}>
          <FlexBoxCenter
            sx={{
              gridColumn: "1/9",
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
  );
};

export default VerticalImgList;
