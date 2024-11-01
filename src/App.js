import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import Header from "./Header";
import Canvas from "./Canvas";
import SearchIcons from "./SearchIcons.js";
import SearchIconsDialog from "./Dialog.js";

import AddIcon from "@mui/icons-material/Add";

import { InputSelect, OutputSelect } from "./SystemIO.js";
import { BaseShapeButtons, BaseSizeSlider } from "./Base.js";
import { CircuitList } from "./Circuit";

function App() {
  // system I/O
  const [input, setInput] = useState("");
  const handleInputChange = (event) => setInput(event.target.value);
  const [output, setOutput] = useState("");
  const handleOutputChange = (event) => setOutput(event.target.value);

  // Base
  const [baseShape, setBaseShape] = useState("");
  const handleBaseShapeChange = (shape) => setBaseShape(shape);
  const [baseSize, setBaseSize] = useState(400);
  const handleBaseSizeChange = (event, newValue) => setBaseSize(newValue);

  // Circuit
  var [circuitId, setCircuitId] = useState(0);
  const [circuits, setCircuits] = useState([]);
  const handleAddCircuit = (event) => {
    setCircuits([
      { id: circuitId, shape: "Circle", size: 300 },
      ...circuits, // old items
    ]);
    setCircuitId(circuitId + 1);
  };
  const handleRemoveCircuit = (removeId) =>
    setCircuits(circuits.filter((circuit) => circuit.id != removeId));

  // Open Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="App">
      <Header />
      <div className="section">{/* <SearchIcons /> */}</div>

      <Button onClick={handleClickOpenDialog}>OPEN</Button>
      <SearchIconsDialog open={openDialog} handleClose={handleCloseDialog} />

      <div className="container">
        <div className="section" id="setting-section">
          <div>
            <h1>Settings</h1>

            <div id="settings">
              <h2>System I/O</h2>
              <InputSelect
                input={input}
                handleInputChange={handleInputChange}
              />
              <OutputSelect
                output={output}
                handleOutputChange={handleOutputChange}
              />

              <h2>Base</h2>
              <div className="section">
                <BaseShapeButtons
                  baseShape={baseShape}
                  handleBaseShapeChange={handleBaseShapeChange}
                />
                <BaseSizeSlider
                  baseSize={baseSize}
                  handleBaseSizeChange={handleBaseSizeChange}
                />
              </div>
              <h2>Circuit</h2>
              <CircuitList
                circuits={circuits}
                handleRemoveCircuit={handleRemoveCircuit}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddCircuit}
              >
                Add New Pattern
              </Button>

              <div className="button">
                <Button variant="contained">Generate</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="section" id="result-section">
          <div>
            <h1>Result</h1>
            {/* <div className="canvas">Display svg img here!</div> */}
            <Canvas baseShape={baseShape} baseSize={baseSize} />
            <div className="button">
              <Button className="button" variant="contained">
                Export
              </Button>
            </div>
          </div>

          <div>
            <h1>Insruction</h1>
            <div>- Show insructions here!</div>
            <div>- Show insructions here!</div>
            <div>- Show insructions here!</div>
            <div>- </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
