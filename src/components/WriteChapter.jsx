import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

function WriteChapter() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    placeholder: "Start typing...",
    height: "65vh",
  };

  return (
    <div style={{ background: "#f5f4eb" }}>
      <h1 className="mb-3 d-flex justify-content-center">
        Write new chapter in BookName
      </h1>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={(newContent) => setContent(newContent)}
        className="mx-3"
      />
    </div>
  );
}

export default WriteChapter;
