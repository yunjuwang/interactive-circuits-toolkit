import { useState, useEffect } from "react";
import { InputSlider } from "./Slider.js";
import ToggleButton from "@mui/material/ToggleButton";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import FlipIcon from "@mui/icons-material/Flip";

export function Editor({ editingId, editingItem, handleEdit, handleDelete }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [scaleX, setScaleX] = useState(0.5);
  const [scaleY, setScaleY] = useState(0.5);
  const [rotate, setRotate] = useState(0);
  const [lockScale, setLockScale] = useState(true);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (editingId === -1 || editingItem === undefined) return;

    setX(editingItem.x);
    setY(editingItem.y);
    setScaleX(editingItem.scaleX);
    setScaleY(editingItem.scaleY);
    setRotate(editingItem.rotate);
    setFlip(editingItem.flip);
  }, [editingItem]);

  useEffect(() => {
    if (editingId === -1 || editingItem === undefined) return;

    const newItem = {
      id: editingId,
      type: editingItem.type,
      shape: editingItem.shape,
      size: 300,
      x: x,
      y: y,
      scaleX: scaleX,
      scaleY: scaleY,
      rotate: rotate,
      flip: flip,
    };
    handleEdit(newItem);
  }, [x, y, scaleX, scaleY, rotate, flip]);

  function SetScaleX_locked(scale) {
    const diff = scale - scaleX;
    setScaleX(scale);
    setScaleY(scaleY + diff);
  }
  function SetScaleY_locked(scale) {
    const diff = scale - scaleY;
    setScaleX(scaleX + diff);
    setScaleY(scale);
  }

  return (
    <div className="section">
      <div className="edior-delete-btn">
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
      <h5 className="edior-title">Position</h5>
      <div className="slider-section">
        <div className="slider slider-x">
          <InputSlider InputName="X" value={x} setValue={setX} />
        </div>
        <div className="slider">
          <InputSlider InputName="Y" value={y} setValue={setY} />
        </div>
      </div>
      <h5 className="edior-title">
        Scale
        <ToggleButton
          size="small"
          value="lockScale"
          selected={lockScale}
          onChange={() => setLockScale((prev) => !prev)}
          sx={{ marginLeft: "5px", padding: "0px" }}
        >
          <LockIcon />
        </ToggleButton>
        <ToggleButton
          size="small"
          value="flip"
          selected={flip}
          onChange={() => setFlip((prev) => !prev)}
          sx={{ marginLeft: "5px", padding: "0px" }}
        >
          <FlipIcon />
        </ToggleButton>
      </h5>

      <div className="slider-section">
        <div className="slider slider-x">
          <InputSlider
            InputName="X"
            value={scaleX}
            setValue={lockScale ? SetScaleX_locked : setScaleX}
            minValue={0.01}
            maxValue={1}
            step={0.01}
          />
        </div>
        <div className="slider">
          <InputSlider
            className="slider"
            InputName="Y"
            value={scaleY}
            setValue={lockScale ? SetScaleY_locked : setScaleY}
            minValue={0.01}
            maxValue={1}
            step={0.01}
          />
        </div>
      </div>
      <h5 className="edior-title">Rotate</h5>
      <div className="slider">
        <InputSlider
          InputName=""
          value={rotate}
          setValue={setRotate}
          minValue={-360}
          maxValue={360}
        />
      </div>
    </div>
  );
}
