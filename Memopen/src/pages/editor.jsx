import ColorPicker from "react-pick-color";
import { Link } from "react-router-dom";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

function Editor() {
  const [isColorPickOpen, setIsColorPickOpen] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [textBackgroundColor, setTextBackgroundColor] = useState("");
  const [fontStyle, setFontStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  //useRef not re render it use current state
  const canvasRef = useRef(null); // ref of canvas element
  const fabricCanvasRef = useRef(null); // store fabric.js -> canvas Onject ->can edit
  const colorPickerRef = useRef(null);

  useEffect(() => {
    // useEffect run when component load
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 960,
      height: 540,
      backgroundColor: "#FFFFFF",
    });

    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const activeObject = fabricCanvasRef.current.getActiveObject();
        if (activeObject && !activeObject.isEditing) {
          fabricCanvasRef.current.remove(activeObject);
          fabricCanvasRef.current.requestRenderAll();
        }
      }
    };

    const handleClickOutsideColorPick = (e) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(e.target)
      ) {
        setIsColorPickOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutsideColorPick);
    return () => {
      //run when component remove from page
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutsideColorPick); //removeEventlistener when navigate to diffrent page
      fabricCanvasRef.current.dispose(); //clean up canvas
    };
  }, []);

  const addText = () => {
    const text = new fabric.Textbox("Text", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: textColor,
      selectable: true,
      textBackgroundColor: textBackgroundColor,
    });
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text); //selective text auto
  };

  const addImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target.result, (img) => {
        img.set({
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        fabricCanvasRef.current.add(img);
        fabricCanvasRef.current.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const applyStyleToText = (property, value) => {
    const activeTextObject = fabricCanvasRef.current.getActiveObject();
    if (activeTextObject && activeTextObject.type === "textbox") {
      activeTextObject.set({ [property]: value });
      fabricCanvasRef.current.renderAll();
    }
  };

  return (
    <div className="bg-[url('./src/assets/editorAssets/editor_bg.png')] bg-cover bg-center min-h-screen">
      <div className="editor-content h-screen">
        <div className="editor-nav bg-black flex justify-between items-center px-7 py-5  ">
          <div className="editor-nav-left">
            <h3 className="HomeNavigate text-white text-3xl font-bold uppercase">
              <Link to="/HomePage">Memopen</Link>
            </h3>
          </div>
          <div className="editor-nav-right flex gap-5">
            <button className="bg-[#00917C] px-[26px] py-[16px] rounded-[10px] text-white text-3xl cursor-pointer">
              Dowload
            </button>
            <button className="bg-[#00BE33] px-[26px] py-[16px] rounded-[10px] text-white text-3xl cursor-pointer">
              Save
            </button>
          </div>
        </div>
        <div className="area flex justify-center items-center flex-col ">
          <div className="canvas-box flex flex-col my-4 mx-10 max-w-[960px]">
            <div className="canvas-head bg-black flex items-center p-3 justify-center md:justify-around">
              <button
                onClick={addText}
                className="addtext cursor-pointer  bg-[#D9D9D9] px-[23px] py-[10px] text-2xl rounded-[10px] font-semibold"
              >
                Add text
              </button>
              <div className="font-style flex gap-6 bs">
                <button>
                  <div className="cursor-pointer text-white font-bold text-2xl">
                    B
                  </div>
                </button>
                <button>
                  <div className="cursor-pointer text-white italic text-2xl">
                    I
                  </div>
                </button>
                <button>
                  <div className="cursor-pointer text-white font-bold underline text-2xl">
                    U
                  </div>
                </button>
              </div>
              <div className="textcoloredit flex items-center gap-6">
                <div className="textcolorsection flex items-center gap-3">
                  <label>
                    <div className="text-white text-2xl underline font-semibold">
                      A
                    </div>
                  </label>
                  <input
                    className="w-10 h-10 cursor-pointer"
                    type="color"
                    value={textColor}
                    onChange={(e) => {
                      setTextColor(e.target.value);
                      applyStyleToText("fill", e.target.value);
                    }}
                  />
                </div>

                <div className="texthighlightsection flex items-center gap-3">
                  <label>
                    <div>
                      <img src="./src/assets/editorAssets/highlight.svg" />
                    </div>
                  </label>
                  <div
                    className="w-10 h-10 cursor-pointer"
                    style={{ backgroundColor: textBackgroundColor }}
                    onClick={() => setIsColorPickOpen(true)}
                  ></div>

                  {isColorPickOpen && (
                    <div className="absolute top-49 z-30" ref={colorPickerRef}>
                      <ColorPicker
                        color={textBackgroundColor}
                        onChange={(color) => {
                          setTextBackgroundColor(color.hex);
                          applyStyleToText("textBackgroundColor", color.hex);
                        }}
                      />
                    </div>
                  )}
                  {/*
                               <input type="color" 
                                className="w-10 h-10 cursor-pointer"
                                value={textBackgroundColor}
                                onChange={(e)=>{
                                    setTextBackgroundColor(e.target.value);
                                    applyStyleToText("textBackgroundColor", e.target.value);
                                }}
                                />
                               
                               
                               */}
                </div>
              </div>

              <div className="imgInput flex items-center gap-7">
                <div className="w-[1px] bg-white h-[32px]"></div>
                <button
                  className="cursor-pointer"
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  <img src="./src/assets/editorAssets/imgInput.svg" />
                </button>
                <input
                  id="imageInput"
                  onChange={addImage}
                  className="hidden "
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <canvas ref={canvasRef} />
          </div>
          <div className="addTagBox rounded-[15px] bg-white w-[960px] px-10 py-3 flex gap-10 items-center">
            <label className="text-[20px] font-bold">Add Tag</label>
            <div className="editor-tag-input flex gap-3 items-center">
              <input
                className="w-10 h-10 rounded-full cursor-pointer border-none p-0 "
                type="color"
              />
              <input
                className="border border-black rounded-[20px] px-2.5 py-3.5 bg-white w-[700px] overflow-clip"
                type="text"
                placeholder="Enter new tag"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Editor;
