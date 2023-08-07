import { useEffect, useState } from "react";
import "./App.css";
import FroalaEditor from "froala-editor";
import { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// import ClassicEditor from "@ckeditor/ckeditor5-core";
function App() {
  const [count, setCount] = useState(0);

  const ref = useRef(null);
  useEffect(() => {
    // var editor = new FroalaEditor(ref?.current);
    // var editor = new FroalaEditor('#example');
    // const editor = new EditorJS({
    //   holder: "editorjs",
    //   tools: {
    //     header: {
    //       class: Header,
    //       inlineToolbar: ["link"],
    //     },
    //     list: {
    //       class: List,
    //       inlineToolbar: true,
    //     },
    //   },
    // });
    // editor.save().then((outputData) => {
    //   console.log('Article data: ', outputData)
    // }).catch((error) => {
    //   console.log('Saving failed: ', error)
    // });
    // ClassicEditor.create(document.querySelector("#editor")).catch((error) => {
    //   console.error(error);
    // });
  }, []);
  return (
    <div>
      <Button onClick={() => console.log(111)}>click me</Button>
      <div id="editorjs"></div>
      <div id="example"></div>
      <div id="editor"></div>
      <div ref={ref} className="app"></div>
    </div>
  );
}

const Button = ({ ...props }) => {
  return <button {...props}></button>;
};

export default App;
