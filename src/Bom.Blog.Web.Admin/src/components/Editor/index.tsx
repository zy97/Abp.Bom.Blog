import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//https://github.com/zenoamaro/react-quill#custom-editing-area
//如果不指定自定义区域，会出现两个工具栏
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
];
interface OnChangeHandler {
  (e: any): void;
}
type Props = {
  value: string;
  placeholder: string;
  onChange?: OnChangeHandler;
};
function Editor(props: Props) {
  const { value, placeholder, onChange } = props;
  return (
    <>
      <ReactQuill
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      >
        <div></div>
      </ReactQuill>
    </>
  );
}

export default Editor;
