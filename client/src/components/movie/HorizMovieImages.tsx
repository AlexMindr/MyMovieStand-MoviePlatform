import { MovieImageObjType } from "@/shared/types";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { SyntheticEvent, useState, useTransition, lazy, Suspense } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Loading from "../global/Loading";

const HorizTab = lazy(() => import("./HorizTab"));

type Props = {
  images: MovieImageObjType;
  title: string;
};

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const HorizMovieImages = ({ images, title }: Props) => {
  const { posters, logos, backdrops } = images;
  const [value, setValue] = useState(0);
  const { palette, breakpoints } = useTheme();
  const isMdScreen = useMediaQuery(breakpoints.up("md"));
  const [isPending, startTransition] = useTransition();

  const tabSx = {
    fontWeight: 900,
    p: "3px",
    color: palette.grey[600],
    bgcolor: "rgba(255,255,255,0.1)",
    minHeight: "35px",
    "&.Mui-selected": {
      bgcolor: "rgba(255,255,255,0.5)",
      color: palette.tertiary[700],
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
  };

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    startTransition(() => setValue(newValue));
  };

  return (
    <Box width="95%" mt="5px" maxWidth="100%">
      <Box
        sx={{
          borderBottom: 3,
          borderColor: palette.primary[500],
        }}
      >
        <Tabs
          variant={isMdScreen ? "standard" : "fullWidth"}
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="image-tabs"
          sx={{
            minHeight: "auto",
            fontWeight: "600",
          }}
        >
          <Tab
            disabled={posters.length === 0}
            label="Posters"
            {...a11yProps(0)}
            sx={{ ...tabSx }}
          />
          <Tab
            disabled={backdrops.length === 0}
            label="Backdrops"
            {...a11yProps(1)}
            sx={{ ...tabSx }}
          />
          <Tab
            disabled={logos.length === 0}
            label="Logos"
            {...a11yProps(1)}
            sx={{ ...tabSx }}
          />
        </Tabs>
      </Box>
      <Suspense fallback={<Loading minHeight="30svh" />}>
        <HorizTab
          key="posters"
          TabPanelComp={{ value: value, index: 0 }}
          title={title}
          images={posters}
          ImageListStyle={{
            maxWidth: "100%",
            height: "20%",
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(100%, minmax(150px, 20%))",
            gridAutoColumns: "minmax(150px, 20%)",
          }}
        />
      </Suspense>
      <Suspense fallback={<Loading minHeight="30svh" />}>
        <HorizTab
          key="backdrops"
          TabPanelComp={{ value: value, index: 1 }}
          title={title}
          images={backdrops}
          ImageListStyle={{
            maxWidth: "100%",
            height: "20%",
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(100%, minmax(250px, 20%))",
            gridAutoColumns: "minmax(250px, 20%)",
          }}
        />
      </Suspense>
      <Suspense fallback={<Loading minHeight="30svh" />}>
        <HorizTab
          key="logos"
          TabPanelComp={{ value: value, index: 2 }}
          title={title}
          images={logos}
          ImageListStyle={{
            maxWidth: "100%",
            height: "20%",
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(100%, minmax(300px, 20%))",
            gridAutoColumns: "minmax(300px, 20%)",
          }}
        />
      </Suspense>
    </Box>
  );
};

export default HorizMovieImages;
