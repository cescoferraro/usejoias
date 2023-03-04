import { IconButton, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Add, Remove } from "@mui/icons-material";
import React, { useState } from "react";
import Hammer from "react-hammerjs";
import "./App.css";

const number = 3.7795275591;
const initialSize = 90.7;
const stroke = 7.55;

function round(value: number) {
  const formattedValue = value.toLocaleString("en", {
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return Number(formattedValue);
}

function NewComponent(props: { onClick: () => void; onClick1: () => void }) {
  return (
    <Box>
      <IconButton onClick={props.onClick}>
        <Remove />
      </IconButton>
      <IconButton onClick={props.onClick1}>
        <Add />
      </IconButton>
    </Box>
  );
}

function App() {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const [state, setState] = useState({
    size: initialSize + 2 * number,
    top: `calc(50% - ${initialSize / 2 + 2 * stroke}px)`,
    left: `calc(50% - ${initialSize / 2 + 2 * stroke}px)`,
    stroke: stroke + number,
    lastStroke: new Date().toLocaleString(),
  });
  const innerHeight = window.window.innerHeight;
  const innerWidth = window.window.innerWidth;
  const strokeWidth = round(state.stroke / number / devicePixelRatio);
  const outerWidth = round(state.size / number / devicePixelRatio);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        maxHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      <Hammer
        onPinch={(e) => {
          setState((s) => ({
            ...s,
            size: e.scale * initialSize,
            top: `${(100 * (e.center.y - s.size / 2)) / innerHeight}%`,
            left: `${(100 * (e.center.x - s.size / 2)) / innerWidth}%`,
            lastStroke: new Date().toLocaleString(),
          }));
        }}
        onPan={(e) => {
          if (
            new Date(state.lastStroke).getTime() + 1000 <
            new Date().getTime()
          ) {
            setState((s) => ({
              ...s,
              top: `${(100 * (e.center.y - s.size / 2)) / innerHeight}%`,
              left: `${(100 * (e.center.x - s.size / 2)) / innerWidth}%`,
            }));
          }
        }}
        options={{
          recognizers: {
            pinch: { enable: true },
          },
        }}
      >
        <svg
          height={state.size + state.stroke}
          width={state.size + state.stroke}
          style={{
            position: "absolute",
            top: state.top,
            left: state.left,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <circle
            cy={state.size / 2 + state.stroke / 2}
            cx={state.size / 2 + state.stroke / 2}
            r={state.size / 2}
            stroke="black"
            strokeWidth={state.stroke}
            fill="blue"
          />
        </svg>
      </Hammer>

      <Paper
        style={{
          maxWidth: "80vw",
          position: "absolute",
          top: "10%",
          left: "10%",
        }}
      >
        <Box display="flex">
          <Box>
            <NewComponent
              onClick={() => {
                setState((s) => ({
                  ...s,
                  size: s.size - (number * devicePixelRatio) / 2,
                }));
              }}
              onClick1={() => {
                setState((s) => ({
                  ...s,
                  size: s.size + (number * devicePixelRatio) / 2,
                }));
              }}
            />
            <NewComponent
              onClick={() => {
                setState((s) => ({
                  ...s,
                  stroke: s.stroke - 1,
                }));
              }}
              onClick1={() => {
                setState((s) => ({
                  ...s,
                  stroke: s.stroke + 1,
                }));
              }}
            />
            <NewComponent
              onClick={() => {
                setState((s) => ({
                  ...s,
                  size: s.size - (number * devicePixelRatio) / 2,
                }));
              }}
              onClick1={() => {
                setState((s) => ({
                  ...s,
                  size: s.size + (number * devicePixelRatio) / 2,
                }));
              }}
            />
          </Box>
          <Box sx={{ ml: 2 }}>
            <Box sx={{ height: 40, ...center }}>
              <Typography sx={{ my: "auto" }}>
                Diametro Externo {outerWidth}mm
              </Typography>
            </Box>
            <Box sx={{ height: 40, ...center }}>
              <Typography sx={{ my: "auto" }}>
                Largura Anel {strokeWidth}mm
              </Typography>
            </Box>
            <Box sx={{ height: 40, ...center }}>
              <Typography sx={{ my: "auto" }}>
                Diametro interno {round(outerWidth - strokeWidth)}mm
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
const center = {
  display: "flex",
  // justifyContent: "center",
  alignSelf: "center",
};

export default App;
