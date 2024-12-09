import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IconResolver } from "./Utils.js";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

const BASE_SHAPE_LIST = [
  "Circle",
  "Square",
  // "Rectangle",
  "Pentagon",
  "Hexagon",
  "Star",
  "Favorite",
  "Extension",
  "Navigation",
  "Brightness2",
  "DarkMode",
  // "ModeComment",
  "ChatBubble",
  "Bookmark",
  "Cloud",
  // "DesktopMac",
  // "Work",
  // "Folder",
  "Label",
  "LocalOffer",
  // "Science",
  "Shield",
];

function AddBoxBaseButton({ handleClickAddBoxBase }) {
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<ViewInArIcon />}
      onClick={handleClickAddBoxBase}
      sx={{ position: "relative", top: "-4px", left: "5px", height: "32px" }}
    >
      Add Box
    </Button>
  );
}

export function BaseList({ bases, editingId, handleSetEditingId }) {
  return (
    <>
      <div id="circuit-list">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {bases.map((bases) => (
            <IconButton
              key={bases.id}
              onClick={() => handleSetEditingId(bases.id)}
              color={editingId == bases.id ? "primary" : "default"}
            >
              <IconResolver iconName={bases.shape} />
            </IconButton>
          ))}
        </Stack>
      </div>
    </>
  );
}

export function BaseOptions({ handleAddBase }) {
  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
      {BASE_SHAPE_LIST.map((shape) => (
        <IconButton key={shape} onClick={() => handleAddBase(shape)}>
          <IconResolver iconName={shape} />
        </IconButton>
      ))}
      <AddBoxBaseButton />
    </Stack>
  );
}
