//important
import ColorPicker from "react-pick-color";
import { Link, useParams } from "react-router-dom";
import { fabric } from "fabric";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { act, useEffect, useRef, useState } from "react";
import WarningPopUp from "../components/editor_popup/WarningPopUp";
import PostSucessPopUp from "../components/editor_popup/PostSucessPopUp";
function Editor() {
  const templateLocation = useLocation();
  //const  backgroundImageP  = templateLocation.state?.backgroundImageP;
  const [backgroundImage, setBackgroundImage] = useState(null);

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
  const [firstEditCanvas, setFirstEditCanvas] = useState(null);
  const [tagFieldBlank, setTagFieldBlank] = useState(false);
  const [tagColor, setTagColor] = useState("#ff0000");
  const [tag, setTag] = useState("");

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
  const [unSavedTag, setUnsavedTag] = useState(false);
  const [originalTag, setOriginalTag] = useState("");
  const [originalTagColor, setOriginalTagColor] = useState("#ff0000");

  //useRef not re render it use current state
  const canvasRef = useRef(null); // ref of canvas element
  const fabricCanvasRef = useRef(null); // store fabric.js -> canvas Onject ->can edit
  const colorPickerHighlightRef = useRef(null);
  const colorPickerTextRef = useRef(null);
  const colorTagRef = useRef(null);
  const { id } = useParams();
  const location = useLocation();
  /**
 * 
 * useEffect(() => {
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
        canvasRefSize.setWidth(scaleWidth);
        canvasRefSize.setHeight(scaleHeight);
        canvasRefSize.setZoom(scale);
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

    resizeCanvas();
    //setFirstEditCanvas(fabricCanvasRef.current.toJSON());

    const bg_img = localStorage.getItem("eidtor_bg_img");

    if (bg_img) {
      setBackgroundImage(bg_img);
      localStorage.removeItem("eidtor_bg_img");
    }


    if (backgroundImage) {
      fabric.Image.fromURL(backgroundImage, (img) => {
        img.scaleToWidth(originalWidthRef);
        img.scaleToHeight(originalHeightRef);
        fabricCanvasRef.current.setBackgroundImage(img, () => {
          fabricCanvasRef.current.requestRenderAll();
        });
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

    const saved = JSON.parse(localStorage.getItem("canvases") || "[]");
    const found = saved.find((x) => x.id === id);
    if (found) {
      const tagValue = found.tag || "";
      const tagColorValue = found.tagColor || "#FF0000";

      setTag(tagValue);
      setTagColor(tagColorValue);
      setOriginalTag(tagValue);
      setOriginalTagColor(tagColorValue);

      localStorage.setItem("original_tag", tagValue);
      localStorage.setItem("original_tag_color", tagColorValue);
      localStorage.setItem("current_canvas_id", found.id);

      if (found.json) {
        fabricCanvasRef.current.loadFromJSON(found.json, () => {
          fabricCanvasRef.current.renderAll();
        });
      }
    }
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
  }, [backgroundImage, id, location.state]);
 * 
 */

  const originalWidthRef = 800; // you had these reversed in your snippet, fixed here
  const originalHeightRef = 450;

  useEffect(() => {
    // Initialize fabric canvas
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: originalWidthRef,
      height: originalHeightRef,
      backgroundColor: "#FFFFFF",
    });

    // Resize canvas function
    const resizeCanvas = () => {
      const containerWidth = Math.min(
        window.innerWidth * 0.75,
        originalWidthRef
      );
      const scale = containerWidth / originalWidthRef;
      const scaleWidth = originalWidthRef * scale;
      const scaleHeight = originalHeightRef * scale;

      const canvasInstance = fabricCanvasRef.current;
      if (canvasInstance) {
        canvasInstance.setWidth(scaleWidth);
        canvasInstance.setHeight(scaleHeight);
        canvasInstance.setZoom(scale);
        canvasInstance.renderAll();
        setCanvasWidth(scaleWidth);
      }
    };

    resizeCanvas();

    // Fetch canvas data from backend
    const fetchCanvasData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/post/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch canvas");

        const data = await res.json();
        const { json, tag, tagColor, backgroundImage } = data.data || {};

        setTag(tag || "");
        setTagColor(tagColor || "#FF0000");
        setOriginalTag(tag || "");
        setOriginalTagColor(tagColor || "#FF0000");

        localStorage.setItem("original_tag", tag || "");
        localStorage.setItem("original_tag_color", tagColor || "#FF0000");
        localStorage.setItem("current_canvas_id", id);

        if (json) {
    fabricCanvasRef.current.loadFromJSON(json, () => {
    fabricCanvasRef.current.renderAll();

      if (json.backgroundImg) {
        fabric.Image.fromURL(json.backgroundImg, (img) => {
          img.scaleToWidth(originalWidthRef);
          img.scaleToHeight(originalHeightRef);
          fabricCanvasRef.current.setBackgroundImage(img, () => {
            fabricCanvasRef.current.requestRenderAll();
          });
        });
      }
    });
}


        if (backgroundImage) {
          setBackgroundImage(backgroundImage);
          fabric.Image.fromURL(backgroundImage, (img) => {
            img.scaleToWidth(originalWidthRef);
            img.scaleToHeight(originalHeightRef);
            fabricCanvasRef.current.setBackgroundImage(img, () => {
              fabricCanvasRef.current.requestRenderAll();
            });
          });
        }
      } catch (err) {
        console.error("Error loading canvas from backend", err);
        // fallback to localStorage
        const saved = JSON.parse(localStorage.getItem("canvases") || "[]");
        const found = saved.find((x) => x.id === id);
        if (found) {
          setTag(found.tag || "");
          setTagColor(found.tagColor || "#FF0000");
          setOriginalTag(found.tag || "");
          setOriginalTagColor(found.tagColor || "#FF0000");

          localStorage.setItem("original_tag", found.tag || "");
          localStorage.setItem(
            "original_tag_color",
            found.tagColor || "#FF0000"
          );
          localStorage.setItem("current_canvas_id", found.id);

          if (found.json) {
            fabricCanvasRef.current.loadFromJSON(found.json, () => {
              fabricCanvasRef.current.renderAll();
            });
          }
        }
      }
    };

    if (id !== "new") {
      fetchCanvasData();
    } else {
      // If new canvas, check for background image from localStorage
      const bg_img = localStorage.getItem("eidtor_bg_img");
      if (bg_img) {
        setBackgroundImage(bg_img);
        localStorage.removeItem("eidtor_bg_img");
        fabric.Image.fromURL(bg_img, (img) => {
          img.scaleToWidth(originalWidthRef);
          img.scaleToHeight(originalHeightRef);
          fabricCanvasRef.current.setBackgroundImage(img, () => {
            fabricCanvasRef.current.requestRenderAll();
          });
        });
      }
    }

    // Handlers for text selection style syncing
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

    // Register fabric canvas events
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

    // Handle delete key for removing active objects
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const activeObject = fabricCanvasRef.current.getActiveObject();
        if (activeObject && !activeObject.isEditing) {
          fabricCanvasRef.current.remove(activeObject);
          fabricCanvasRef.current.requestRenderAll();
        }
      }
    };

    // Click outside handlers for color pickers
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

    // Add event listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener(
      "mousedown",
      handleClickOutsideColorHighlightPick
    );
    document.addEventListener("mousedown", handleClickOutsideColorTextPick);
    document.addEventListener("mousedown", handleClickOutsideColorTag);

    // Cleanup on unmount
    return () => {
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
      );
      document.removeEventListener(
        "mousedown",
        handleClickOutsideColorTextPick
      );
      document.removeEventListener("mousedown", handleClickOutsideColorTag);

      fabricCanvasRef.current.dispose();
    };
  }, [backgroundImage, id, location.state]);

  const handleTagInput = (e) => {
    const newTag = e.target.value;
    setTag(newTag);
    if (newTag.trim() !== "") {
      setTagFieldBlank(false);
    }
    setUnsavedTag(true);
    /*
      const updatedTag = JSON.parse(localStorage.getItem("canvases")|| "[]").map((c)=>
      c.id === id ? {...c, tag: newTag}: c);
      localStorage.setItem("canvases", JSON.stringify(updatedTag));
      */
  };

  const handleManualDelete = () => {
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };
  const handleTagColor = (color) => {
    setTagColor(color);
    setUnsavedTag(true);
    /* 
    const updatedTagColor = JSON.parse(localStorage.getItem("canvases") || "[]").map((c)=>
      c.id === id ? {...c, tagColor : color} : c
    )
    console.log(color);
    localStorage.setItem("canvases",JSON.stringify(updatedTagColor));
    */
  };
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

  const downloadCanvas = () => {
    const targetWidth = 1600;
    const targetHeight = 900;
    const currentCanvas = fabricCanvasRef.current;

    const scaleX = targetWidth / currentCanvas.getWidth();
    const scaleY = targetHeight / currentCanvas.getHeight();
    const scale = Math.min(scaleX, scaleY); // maintain aspect ratio

    const dataURL = currentCanvas.toDataURL({
      format: "png",
      multiplier: scale,
      enableRetinaScaling: false,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
  };

  const saveCanvas = async (canvasId, tagValue, tagColor, backgroundImage) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const currentWidth = canvas.getWidth();
    const currentHeight = canvas.getHeight();

    const active = canvas.getActiveObject();
    canvas.discardActiveObject();
    canvas.renderAll();

    const thumbnailExportResolution = 2;

    const thumbnailCanvas = document.createElement("canvas");
    const thumbnailContext = thumbnailCanvas.getContext("2d");
    thumbnailCanvas.width = currentWidth;
    thumbnailCanvas.height = currentHeight;

    thumbnailContext.drawImage(
      canvas.lowerCanvasEl,
      0,
      0,
      currentWidth,
      currentHeight
    );

    // Fix: Correct toDataURL call, no options object; use format and quality params
    const thumbnail = thumbnailCanvas.toDataURL("image/jpeg", 0.5);

    if (active) {
      canvas.setActiveObject(active);
      canvas.renderAll();
    }

    const json = canvas.toJSON();
    const userId = parseInt(localStorage.getItem("userId"));
    if (!userId) {
      console.error("User ID missing");
      return;
    }

    // Detect new canvas by comparing with unsaved_new_canvasId
    const isNewCanvas =
      localStorage.getItem("unsaved_new_canvasId") === canvasId;

    try {
      let res;

      if (isNewCanvas) {
        // POST new canvas, send backgroundImage only on create
        res = await fetch("http://localhost:3000/post", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: canvasId,
            userId,
            tag: tagValue,
            tagColor: tagColor,
            thumbnail,
            backgroundImg: backgroundImage,
            json,
          }),
        });
      } else {
        // PATCH existing canvas (no backgroundImage update)
        res = await fetch(`http://localhost:3000/post/${canvasId}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: canvasId,
            userId,
            tag: tagValue,
            tagColor,
            thumbnail,
            json,
          }),
        });
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Fail to save canvas", errorText);
        return;
      }

      const data = await res.json();
      console.log("saved", data);

      localStorage.removeItem("unsaved_new_canvasId"); // Clear new canvas marker on save

      // Update localStorage canvases array with new or updated canvas
      const saved = JSON.parse(localStorage.getItem("canvases") || "[]").filter(
        Boolean
      );

      let updated = saved.map((c) =>
        c?.id === canvasId
          ? { ...c, tag: tagValue, tagColor, json, thumbnail }
          : c
      );

      const exists = updated.some((c) => c?.id === canvasId);

      if (!exists) {
        updated.push({
          id: canvasId,
          tag: tagValue,
          tagColor,
          json,
          thumbnail,
        });
      }

      localStorage.setItem("canvases", JSON.stringify(updated));

      setUnsavedTag(false); // Reset unsaved flag in React state
    } catch (error) {
      console.error("Error while saving canvas", error);
    }
  };

  /*
    const saveCanvas = (canvasId, tagValue, tagColor) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const json = canvas.toJSON();
    const thumbnail = canvas.toDataURL({ format: "jpeg", quality: 0.5 });
    const saved = JSON.parse(localStorage.getItem("canvases") || "[]") || [];
    let updated = saved.filter(Boolean).map((c) =>
      c.id === canvasId ? { ...c, tag: tagValue,tagColor:tagColor, json, thumbnail } : c
    );
    if (!updated.some((c) => c.id === canvasId)) {
      updated.push({ id: canvasId, tag: tagValue, tagColor:tagColor, json, thumbnail });
    }
    localStorage.setItem("canvases", JSON.stringify(updated));
    
  };
  */

  return (
    <div className="bg-[url('/assets/editorAssets/editor_bg.png')] bg-cover min-h-screen bg-center">
      <div className="editor-content h-screen">
        <div className="editor-nav bg-black flex justify-between items-center px-7 py-5  ">
          <div className="editor-nav-left">
            <h3 className="HomeNavigate text-white text-sm md:text-2xl  font-bold uppercase">
              <button
                onClick={() => {
                  if (!tag.trim()) {
                    setTagFieldBlank(true);
                    return;
                  }
                  setBackHome(true);
                }}
              >
                Memopen
              </button>
            </h3>
            {isBackHomePop && <WarningPopUp setBackHome={setBackHome} />}
          </div>
          <div className="editor-nav-right flex gap-5">
            <button
              onClick={downloadCanvas}
              className="bg-[#00917C] hover:bg-[#007362] px-[26px] py-[16px] rounded-[10px] text-white text-sm md:text-lg  cursor-pointer"
            >
              Dowload
            </button>
            <button
              onClick={() => {
                if (!tag.trim()) {
                  setTagFieldBlank(true);
                  return;
                }
                setSavePop(true);
              }}
              className="bg-[#00BE33] hover:bg-[#36b558] px-[26px] py-[16px] rounded-[10px] text-white text-sm md:text-lg  cursor-pointer"
            >
              Save
            </button>
            {isSavePop && (
              <PostSucessPopUp
                saveCanvas={() => saveCanvas(id, tag, tagColor)}
                setSavePop={setSavePop}
              />
            )}
          </div>
        </div>
        <div className="area-container flex justify-center items-center h-[80vh] md:h-fit">
          <div className="area flex justify-center items-center  flex-col ">
            <div className="canvas-box flex flex-col items-center my-4 mx-10 max-w-[960px] ">
              <div
                className={` canvashead bg-black flex items-center p-3 justify-baseline sm:justify-around gap-3 overflow-x-auto whitespace-nowrap `}
                style={{ width: `${canvasWidth}px` }}
              >
                <button
                  onClick={addText}
                  className="addtext cursor-pointer hover:bg-[#b3b3b3]  bg-[#D9D9D9] md:px-[23px] md:py-[10px] px-3 py-1 md:text-1xl rounded-[10px] font-semibold"
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
                        fontStyle.underline
                          ? "bg-[#999999] border-[#999999]"
                          : ""
                      } text-white  text-2xl underline`}
                    >
                      U
                    </div>
                  </button>
                </div>

                <div className="textcoloredit flex items-center md:gap-6 gap-3 mr-10 sm:mr-0">
                  <div className="textcolorsection flex items-center gap-3">
                    <label>
                      <div className="text-white text-2xl underline font-semibold">
                        A
                      </div>
                    </label>
                    <div
                      className="textColorBox flex-shrink-0 w-10 h-10 border border-white cursor-pointer"
                      style={{ backgroundColor: textColor }}
                      onClick={() => setIsColorTextPickOpen(true)}
                    ></div>
                    {isColorTextPickOpen && (
                      <div
                        className="absolute md:top-50 sm:top-70 top-130 right-[10%] z-30 "
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

                  <div className="texthighlightsection flex-shrink-0 flex items-center gap-3">
                    <label>
                      <div>
                        <img
                          src="/assets/editorAssets/highlight.svg"
                          className="w-8 h-8 "
                        />
                      </div>
                    </label>
                    <div
                      className="w-10 h-10 border border-white cursor-pointer"
                      style={{ backgroundColor: textBackgroundColor }}
                      onClick={() => setIsColorHighlightPickOpen(true)}
                    ></div>

                    {isColorHighlightPickOpen && (
                      <div
                        className="absolute md:top-50 sm:top-70 top-130 right-[10%] z-30 "
                        ref={colorPickerHighlightRef}
                      >
                        <div className="flex w-[278px]  justify-center gap-1">
                          <button
                            onClick={() => {
                              const rgbaColor = `rgba(213,213,213,100) `;
                              setTextBackgroundColor(rgbaColor);
                              applyStyleToText(
                                "textBackgroundColor",
                                rgbaColor
                              );
                            }}
                            className="bg-white p-2 my-1 w-[50%]  rounded-sm shadow-md"
                          >
                            Fill color
                          </button>
                          <button
                            onClick={() => {
                              const rgbaColor = `rgba(0,0,0,0) `;
                              setTextBackgroundColor(rgbaColor);
                              applyStyleToText(
                                "textBackgroundColor",
                                rgbaColor
                              );
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

                <div className="imgInput flex items-center mr-10 md:mr-0 sm:mr-3 md:gap-5 ">
                  <div className="w-[1px] bg-white h-[32px]  invisible md:visible"></div>
                  <button
                    className="cursor-pointer flex-shrink-0"
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
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
              <button
                className="bg-white p-3 rounded-[15px] mt-4 text-sm block lg:hidden "
                onClick={handleManualDelete}
              >
                Delete Object
              </button>
            </div>
            <div className=" addTagSection justify-center items-center ">
              <div className="addTagBox rounded-[15px] bg-white max-w-[800px]  px-3 md:px-10  py-3 flex gap-10 items-center ">
                <label className="text-[18px] font-bold hidden md:block ">
                  Add Tag
                </label>
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
                            handleTagColor(Tagcolors.value);
                            setIsColorTagOpen(false);
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  <input
                    className={`border max-w-[600px] rounded-[20px] w-[40vw] px-6 py-3.5 bg-white overflow-clip ${
                      tagFieldBlank
                        ? "border-red-500 placeholder-red-500"
                        : "border-black"
                    }`}
                    type="text"
                    placeholder={
                      tagFieldBlank
                        ? "This field can't be empty"
                        : "Enter the tag"
                    }
                    value={tag}
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
