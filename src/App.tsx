import { ChangeEventHandler, SetStateAction, useEffect, useState } from "react";
import Update from "@/components/update";
import "./App.scss";
import { listenSerialPort } from "@/samples/node-api";
console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  const [text, setText] = useState("");

  const handChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e?.target?.value);
  };

  useEffect(() => {}, []);
  return (
    <div className="App">
      <input type="text" value={text} onChange={handChange} />
      <button
        onClick={() => {
          listenSerialPort(text);
        }}
      >
        提交串口
      </button>
      <Update />
    </div>
  );
}

export default App;
