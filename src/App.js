import React from "react";
import Paper from "@material-ui/core/Paper";
import Weather from "../src/Weather";

const styles = {
  background: {
    backgroundColor: "#D3D3D3",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paperStyle: {
    height: "60%",
    width: "60%",
    borderRadius: "5px"
  }
};

const App = () => (
  <div style={styles.background}>
    <Paper style={styles.paperStyle} elevation={11}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px"
        }}
      >
        <Weather />
      </div>
    </Paper>
  </div>
);

export default App;
