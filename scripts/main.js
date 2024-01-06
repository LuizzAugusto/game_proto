//@ts-check
/**
 * 
 * @type {HTMLCanvasElement|null}
 */
//@ts-ignore
const canvas = document.getElementById("game");
if (canvas?.tagName == "CANVAS") {
  const ctx = canvas.getContext("2d", { alpha: false });

  if (ctx != null) {
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.border = "1px solid #ccc";
  }
  else
    alert("error, can't get canvas context");
}