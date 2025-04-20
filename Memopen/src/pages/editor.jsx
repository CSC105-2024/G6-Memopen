import ColorPicker from "react-pick-color";
import { Link, useParams } from "react-router-dom";
import { fabric } from "fabric";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import WarningPopUp from "../components/editor_popup/WarningPopUp";
import PostSucessPopUp from "../components/editor_popup/PostSucessPopUp";
function Editor() {
  const templateLocation = useLocation();
  const { backgroundImageP } = templateLocation.state || {};
  const Tagcolors = [
    { value: "#ff0000" },
    { value: "#ff8800" },
    { value: "#ffff00" },
    { value: "#008000" },
    { value: "#0000ff" },
    { value: "#800080" },
  ];
 
  const [isSavePop, setSavePop] = useState(false);
  const [isBackHomePop, setBackHome] = useState(false);
  const [tagColor, setTagColor] = useState("#ff0000");
  const [isColorTagOpen, setIsColorTagOpen] = useState(false);
  const [isColorTextPickOpen, setIsColorTextPickOpen] = useState(false);
  const [isColorHighlightPickOpen, setIsColorHighlightPickOpen] =
    useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [textBackgroundColor, setTextBackgroundColor] = useState("");
  const [fontStyle, setFontStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const [canvasWidth, setCanvasWidth] = useState(0);

  //useRef not re render it use current state
  const canvasRef = useRef(null); // ref of canvas element
  const fabricCanvasRef = useRef(null); // store fabric.js -> canvas Onject ->can edit
  const colorPickerHighlightRef = useRef(null);
  const colorPickerTextRef = useRef(null);
  const colorTagRef = useRef(null);
  const { id } = useParams();
  const location = useLocation();
  const [tag,setTag] = useState(""); 

  useEffect(() => {
    const originalHeightRef = 450; //540 *1.2 -> 450
    const originalWidthRef = 800; //960 *1.2 -> 800
    const resizeCanvas = () => {
      const containerWidth = Math.min(
        window.innerWidth * 0.75,
        originalWidthRef
      );
      const scale = containerWidth / originalWidthRef;
      const scaleWidth = originalWidthRef * scale;
      const scaleHeight = originalHeightRef * scale;

      const canvasRefSize = fabricCanvasRef.current;
      if (canvasRefSize) {
        canvasRefSize.setWidth(originalWidthRef);
        canvasRefSize.setHeight(originalHeightRef);
        canvasRefSize.setZoom(scale);
        canvasRef.current.setWidth = scaleWidth;
        canvasRef.current.setHeight = scaleHeight;
        canvasRefSize.renderAll();
        setCanvasWidth(scaleWidth);
      }
    };

    

    // useEffect run when component load
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: originalHeightRef,
      height: originalWidthRef,
      backgroundColor: "#FFFFFF",
    });
    
   
    

    if (backgroundImageP) {
      fabric.Image.fromURL(backgroundImageP, (bgImage) => {
        bgImage.scaleToWidth(originalWidthRef);
        bgImage.scaleToHeight(originalHeightRef);
        fabricCanvasRef.current.setBackgroundImage(
          bgImage,
          fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current)
        );
      });
    }

    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleStyleSelection = () => {
      const activeTextObject = fabricCanvasRef.current.getActiveObject();
      if (activeTextObject && activeTextObject.type === "textbox") {
        setFontStyle({
          bold: activeTextObject.fontWeight === "bold",
          italic: activeTextObject.fontStyle === "italic",
          underline: activeTextObject.underline === true,
        });
      } else {
        setFontStyle({ bold: false, italic: false, underline: false });
      }
    };

    const handleColorSelection = () => {
      const activeTextObject = fabricCanvasRef.current.getActiveObject();
      if (activeTextObject && activeTextObject.type === "textbox") {
        setTextColor(activeTextObject.fill || "#000000");
      } else {
        setTextColor("#000000");
      }
    };

    const handleHighlightSelection = () => {
      const activeTextObject = fabricCanvasRef.current.getActiveObject();
      if (activeTextObject && activeTextObject.type === "textbox") {
        setTextBackgroundColor(activeTextObject.textBackgroundColor);
      } else {
        setTextBackgroundColor("");
      }
    };

    fabricCanvasRef.current.on("selection:created", handleStyleSelection);
    fabricCanvasRef.current.on("selection:updated", handleStyleSelection);
    fabricCanvasRef.current.on("selection:cleared", () => {
      setFontStyle({ bold: false, italic: false, underline: false });
    });

    fabricCanvasRef.current.on("selection:created", handleColorSelection);
    fabricCanvasRef.current.on("selection:updated", handleColorSelection);
    fabricCanvasRef.current.on("selection:cleared", () => {
      setTextColor("#000000");
    });

    fabricCanvasRef.current.on("selection:created", handleHighlightSelection);
    fabricCanvasRef.current.on("selection:updated", handleHighlightSelection);
    fabricCanvasRef.current.on("selection:cleared", () => {
      setTextBackgroundColor("");
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

    const handleClickOutsideColorHighlightPick = (e) => {
      if (
        colorPickerHighlightRef.current &&
        !colorPickerHighlightRef.current.contains(e.target)
      ) {
        setIsColorHighlightPickOpen(false);
      }
    };

    const handleClickOutsideColorTextPick = (e) => {
      if (
        colorPickerTextRef.current &&
        !colorPickerTextRef.current.contains(e.target)
      ) {
        setIsColorTextPickOpen(false);
      }
    };

    const handleClickOutsideColorTag = (e) => {
      if (colorTagRef.current && !colorTagRef.current.contains(e.target)) {
        setIsColorTagOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener(
      "mousedown",
      handleClickOutsideColorHighlightPick
    );
    document.addEventListener("mousedown", handleClickOutsideColorTextPick);
    document.addEventListener("mousedown", handleClickOutsideColorTag);

    return () => {
      //run when component remove from page
      fabricCanvasRef.current.off("selection:created", handleStyleSelection);
      fabricCanvasRef.current.off("selection:updated", handleStyleSelection);
      fabricCanvasRef.current.off("selection:cleared");

      fabricCanvasRef.current.off("selection:created", handleColorSelection);
      fabricCanvasRef.current.off("selection:updated", handleColorSelection);
      fabricCanvasRef.current.off("selection:cleared");

      fabricCanvasRef.current.off(
        "selection:created",
        handleHighlightSelection
      );
      fabricCanvasRef.current.off(
        "selection:updated",
        handleHighlightSelection
      );
      fabricCanvasRef.current.off("selection:cleared");

      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener(
        "mousedown",
        handleClickOutsideColorHighlightPick
      ); //removeEventlistener when navigate to diffrent page
      document.removeEventListener(
        "mousedown",
        handleClickOutsideColorTextPick
      ); //removeEventlistener when navigate to diffrent page
      document.removeEventListener("mousedown", handleClickOutsideColorTag); //removeEventlistener when navigate to diffrent page
      fabricCanvasRef.current.dispose(); //clean up canvas
    };
  }, [backgroundImageP,id,location.state]);

  const handleTagInput = (e) =>{
    const newTag = e.target.value;
    setTag(newTag);
    const updatedTag = JSON.parse(localStorage.getItem("canvases")|| "[]").map((c)=>
    c.id === id ? {...c, tag: newTag}: c);
    localStorage.setItem("canvases", JSON.stringify(updatedTag));
  }
  const addText = () => {
    const defaultTextColor = "#000000";
    const defaultTextBGColor = "rgba(0, 0, 0, 0)";
    const defaultFontStyle = {
      bold: false,
      italic: false,
      underline: false,
    };
    const text = new fabric.Textbox("Text", {
      left: 100,
      top: 100,
      fontSize: 32,
      fill: defaultTextColor,
      selectable: true,
      fontWeight: defaultFontStyle.bold ? "bold" : "normal",
      fontStyle: defaultFontStyle.italic ? "italic" : "normal",
      underline: defaultFontStyle.underline,
      textBackgroundColor: defaultTextBGColor,
    });
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();

    setTextColor(defaultTextColor);
    setTextBackgroundColor(defaultTextBGColor);
    setFontStyle({
      bold: false,
      italic: false,
      underline: false,
    });
    //selective text auto
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

  const addFontStyle = (style) => {
    setFontStyle((prevState) => {
      const newStyle = {
        ...prevState,
        [style]: !prevState[style],
      };
      const activeTextObject = fabricCanvasRef.current.getActiveObject();
      if (activeTextObject && activeTextObject.type === "textbox") {
        activeTextObject.set({
          fontWeight: newStyle.bold ? "bold" : "normal",
          fontStyle: newStyle.italic ? "italic" : "normal",
          underline: newStyle.underline,
        });
        fabricCanvasRef.current.renderAll();
      }
      return newStyle;
    });
  };

  const dowloadCanvas = () => {
    const originalWidth = fabricCanvasRef.current.width;
    const originalHeight = fabricCanvasRef.current.height;

    fabricCanvasRef.current.setWidth(originalWidth * 2);
    fabricCanvasRef.current.setHeight(originalHeight * 2);

    fabricCanvasRef.current.setZoom(2);

    const dataURL = fabricCanvasRef.current.toDataURL({
      format: "png",
      multiplier: 1,
    });

    fabricCanvasRef.current.setWidth(originalWidth);
    fabricCanvasRef.current.setHeight(originalHeight);
    fabricCanvasRef.current.setZoom(1);

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "image.png";
    link.click();
  };

  
  const saveCanvas = (canvasId, tagValue) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const json = canvas.toJSON();
    const thumbnail = canvas.toDataURL({ format: "jpeg", quality: 0.5 });
    const saved = JSON.parse(localStorage.getItem("canvases") || "[]") || [];
    let updated = saved.filter(Boolean).map((c) =>
      c.id === canvasId ? { ...c, tag: tagValue, json, thumbnail } : c
    );
    if (!updated.some((c) => c.id === canvasId)) {
      updated.push({ id: canvasId, tag: tagValue, json, thumbnail });
    }
    localStorage.setItem("canvases", JSON.stringify(updated));
    alert("Saved");
    
  };


  return (
    <div className="bg-[url('/assets/editorAssets/editor_bg.png')] bg-cover bg-center min-h-screen">
      <div className="editor-content h-screen">
        <div className="editor-nav bg-black flex justify-between items-center px-7 py-5  ">
          <div className="editor-nav-left">
            <h3 className="HomeNavigate text-white text-sm md:text-2xl  font-bold uppercase">
              <button onClick={() => setBackHome(true)}>Memopen</button>
            </h3>
            {isBackHomePop && <WarningPopUp setBackHome={setBackHome} />}
          </div>
          <div className="editor-nav-right flex gap-5">
            <button
              onClick={dowloadCanvas}
              className="bg-[#00917C] hover:bg-[#007362] px-[26px] py-[16px] rounded-[10px] text-white text-sm md:text-lg  cursor-pointer"
            >
              Dowload
            </button>
            <button
              onClick={() => setSavePop(true)}
              className="bg-[#00BE33] hover:bg-[#36b558] px-[26px] py-[16px] rounded-[10px] text-white text-sm md:text-lg  cursor-pointer"
            >
              Save
            </button>
            {isSavePop && <PostSucessPopUp saveCanvas={()=>saveCanvas(id,tag)}  setSavePop={setSavePop} />}
          </div>
        </div>
        <div className="area-container flex justify-center items-center h-[80vh] md:h-fit">
        <div className="area flex justify-center items-center  flex-col ">
          <div className="canvas-box flex flex-col items-center my-4 mx-10 max-w-[960px] ">
            <div className={`canvas-head bg-black flex items-center p-3 justify-center md:justify-around gap-3 `}
            style={{ width: `${canvasWidth}px` }}
            >
              <button
                onClick={addText}
                className="addtext cursor-pointer hover:bg-[#b3b3b3]  bg-[#D9D9D9] md:px-[23px] md:py-[10px] px-3 py-1 md:text-2xl text-[15px] rounded-[10px] font-semibold"
              >
                Add text
              </button>

              <div className="font-style flex md:gap-5 gap-2 mx-2 ">
                <button onClick={() => addFontStyle("bold")}>
                  <div
                    className={`font-bold hover:bg-[#999999]  cursor-pointer rounded-[10px] px-2  md:px-4 py-1.5 ${
                      fontStyle.bold ? "bg-[#999999] border-[#999999] " : ""
                    } text-white  text-2xl`}
                  >
                    B
                  </div>
                </button>
                <button onClick={() => addFontStyle("italic")}>
                  <div
                    className={` italic hover:bg-[#999999]  rounded-[10px] cursor-pointer px-3  md:px-5  py-1.5 ${
                      fontStyle.italic ? "bg-[#999999] border-[#999999]" : ""
                    } text-white  text-2xl`}
                  >
                    I
                  </div>
                </button>
                <button onClick={() => addFontStyle("underline")}>
                  <div
                    className={`cursor-pointer hover:bg-[#999999]  rounded-[10px]  px-2  md:px-4  py-1.5 ${
                      fontStyle.underline ? "bg-[#999999] border-[#999999]" : ""
                    } text-white  text-2xl underline`}
                  >
                    U
                  </div>
                </button>
              </div>

              <div className="textcoloredit flex items-center md:gap-6 gap-3">
                <div className="textcolorsection flex items-center gap-3">
                  <label>
                    <div className="text-white text-2xl underline font-semibold">
                      A
                    </div>
                  </label>
                  <div
                    className="textColorBox w-10 h-10 border border-white cursor-pointer"
                    style={{ backgroundColor: textColor }}
                    onClick={() => setIsColorTextPickOpen(true)}
                  ></div>
                  {isColorTextPickOpen && (
                    <div
                      className="absolute top-49 z-30 "
                      ref={colorPickerTextRef}
                    >
                      <ColorPicker
                        color={textColor}
                        onChange={(color) => {
                          const rgbaColor = `rgba(${color.rgb.r},${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a}) `;
                          setTextColor(rgbaColor);
                          applyStyleToText("fill", rgbaColor);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="texthighlightsection flex items-center gap-3">
                  <label>
                    <div>
                      <img src="/assets/editorAssets/highlight.svg" />
                    </div>
                  </label>
                  <div
                    className="w-10 h-10 border border-white cursor-pointer"
                    style={{ backgroundColor: textBackgroundColor }}
                    onClick={() => setIsColorHighlightPickOpen(true)}
                  ></div>

                  {isColorHighlightPickOpen && (
                    <div
                      className="absolute top-49 z-30"
                      ref={colorPickerHighlightRef}
                    >
                      <div className="flex w-[278px]  justify-center gap-1">
                        <button
                          onClick={() => {
                            const rgbaColor = `rgba(213,213,213,100) `;
                            setTextBackgroundColor(rgbaColor);
                            applyStyleToText("textBackgroundColor", rgbaColor);
                          }}
                          className="bg-white p-2 my-1 w-[50%]  rounded-sm shadow-md"
                        >
                          Fill color
                        </button>
                        <button
                          onClick={() => {
                            const rgbaColor = `rgba(0,0,0,0) `;
                            setTextBackgroundColor(rgbaColor);
                            applyStyleToText("textBackgroundColor", rgbaColor);
                          }}
                          className="bg-white w-[50%] p-2 my-1 rounded-sm shadow-md"
                        >
                          No color
                        </button>
                      </div>
                      <ColorPicker
                        color={textBackgroundColor}
                        onChange={(color) => {
                          const rgbaColor = `rgba(${color.rgb.r},${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a}) `;
                          setTextBackgroundColor(rgbaColor);
                          applyStyleToText("textBackgroundColor", rgbaColor);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="imgInput flex items-center gap-2 md:gap-7 ">
                <div className="w-[1px] bg-white h-[32px]  invisible md:visible"></div>
                <button
                  className="cursor-pointer "
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  <img src="/assets/editorAssets/imgInput.svg" />
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
            <div className=" flex justify-center w-[75vw] max-w-[960px] max-h-[42vw] overflow-hidden item-center  ">
              <canvas ref={canvasRef} />
            </div>
          </div>
          <div className=" addTagSection justify-center items-center">
          <div className="addTagBox rounded-[15px] bg-white  px-10 py-3 flex gap-10 items-center ">
            <label className="text-[18px] font-bold">Add Tag</label>
            <div className="editor-tag-input flex gap-3 items-center relative">
              <div
                className="w-10 h-10 border  border-black cursor-pointer rounded-full"
                style={{ backgroundColor: tagColor }}
                onClick={() => setIsColorTagOpen(true)}
              ></div>
              {isColorTagOpen && (
                <div
                  ref={colorTagRef}
                  className="tagcolor absolute top-[-60px]  mt-2 left-0 bg-black p-2 rounded-lg shadow-lg flex space-x-2 z-10"
                >
                  {Tagcolors.map((Tagcolors) => (
                    <div
                      key={Tagcolors.value}
                      className="w-6 h-6 rounded-full cursor-pointer"
                      style={{ backgroundColor: Tagcolors.value }}
                      onClick={() => {
                        setTagColor(Tagcolors.value);
                        setIsColorTagOpen(false);
                      }}
                    ></div>
                  ))}
                </div>
              )}
              <input
                className="border border-black rounded-[20px] w-[40vw] px-6 py-3.5 bg-white  overflow-clip"
                type="text"
                placeholder="Enter new tag"
                value ={tag}
                onChange={handleTagInput}
              />
            </div>
          </div>
          </div>
          
        </div>
        </div>
        
      </div>
    </div>
  );
}
export default Editor;
