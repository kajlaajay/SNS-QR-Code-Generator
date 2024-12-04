document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("url-input");
  const logoInput = document.getElementById("logo-input");
  const generateBtn = document.getElementById("generate-btn");
  const qrCodeContainer = document.getElementById("qr-code");

  generateBtn.addEventListener("click", () => {
      const url = urlInput.value;
      document.querySelector("hr").classList.remove("hide");
      if (logoInput && logoInput.files.length > 0) {
          generateQRCode(url, logoInput.files[0]);
      } else {
          generateQRCode(url);
      }
  });

  function generateQRCode(url, logoFile) {
      const qrCodeSize = 1080; // Size for the downloadable QR code
      const displaySize = 250; // Size for displaying the QR code

      const qrCodeCanvas = document.createElement("canvas");
      qrCodeCanvas.width = qrCodeSize;
      qrCodeCanvas.height = qrCodeSize;
      const qrCodeContext = qrCodeCanvas.getContext("2d");

      const qrCode = new QRious({
          element: qrCodeCanvas,
          value: url,
          size: qrCodeSize,
      });

      if (logoFile) {
          const logoImage = new Image();
          logoImage.src = URL.createObjectURL(logoFile);
          logoImage.onload = () => {
              const logoSize = qrCodeSize * 0.2;
              const logoX = (qrCodeSize - logoSize) / 2;
              const logoY = (qrCodeSize - logoSize) / 2;

              // Draw white background for the logo
              qrCodeContext.fillRect(logoX, logoY, logoSize, logoSize);
              // Draw the logo image
              qrCodeContext.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
              displayQRCode(qrCodeCanvas, displaySize);
          };
      } else {
          displayQRCode(qrCodeCanvas, displaySize);
      }
  }

  function displayQRCode(qrCodeCanvas, displaySize) {
      qrCodeContainer.innerHTML = "";
      const displayCanvas = document.createElement("canvas");
      displayCanvas.width = displaySize;
      displayCanvas.height = displaySize;

      // Draw the QR code scaled down to 250px on a new canvas for display
      const displayContext = displayCanvas.getContext("2d");
      displayContext.drawImage(qrCodeCanvas, 0, 0, displaySize, displaySize);
      
      qrCodeContainer.appendChild(displayCanvas);
      addDownloadOption(qrCodeCanvas);
  }

  function addDownloadOption(qrCodeCanvas) {
      const downloadLink = document.createElement("a");
      downloadLink.textContent = "Download QR Code";
      downloadLink.style.display = "block";
      downloadLink.style.textAlign = "center";
      downloadLink.style.marginTop = "10px";
      downloadLink.style.cursor = "pointer";
      downloadLink.addEventListener("click", () => {
          downloadQRCode(qrCodeCanvas);
      });
      qrCodeContainer.appendChild(downloadLink);
  }

  function downloadQRCode(qrCodeCanvas) {
      const imageData = qrCodeCanvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = imageData;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
  }
});








// document.addEventListener("DOMContentLoaded", () => {
//     const urlInput = document.getElementById("url-input");
//     const logoInput = document.getElementById("logo-input");
//     const generateBtn = document.getElementById("generate-btn");
//     const qrCodeContainer = document.getElementById("qr-code");
//     let qrCode;
  
//     generateBtn.addEventListener("click", () => {
//       const url = urlInput.value;
//       document.querySelector("hr").classList.remove("hide");
//       if (logoInput) {
//         generateQRCode(url, logoInput.files[0]);
//       }
//       else
//       {
//         generateQRCode(url);
//       }
//     });
  
//     function generateQRCode(url, logoFile) {
//         const qrCodeCanvas = document.createElement("canvas");
//         const qrCodeSize = 1080;
      
//         qrCodeCanvas.width = qrCodeSize;
//         qrCodeCanvas.height = qrCodeSize;
      
//         const qrCodeContext = qrCodeCanvas.getContext("2d");
//         const qrCode = new QRious({
//           element: qrCodeCanvas,
//           value: url,
//           size: qrCodeSize,
//         });
      
//         if (logoFile) {
//           const logoImage = new Image();
//           logoImage.src = URL.createObjectURL(logoFile);
//           logoImage.onload = () => {
//             const logoSize = qrCodeSize * 0.2; // Adjust the logo size as needed
//             const logoX = (qrCodeSize - logoSize) / 2;
//             const logoY = (qrCodeSize - logoSize) / 2;
      
//             // Draw white background for the logo
//             // qrCodeContext.fillStyle = "#ffffff";
//             qrCodeContext.fillRect(logoX, logoY, logoSize, logoSize);
      
//             // Draw the logo image
//             qrCodeContext.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
//             displayQRCode(qrCodeCanvas);
//           };
//         } else {
//           displayQRCode(qrCodeCanvas);
//         }
//       }
      
     
  
//     function displayQRCode(qrCodeCanvas) {
//       qrCodeContainer.innerHTML = "";
//       qrCodeContainer.appendChild(qrCodeCanvas);
//       addDownloadOption();
//     }
  
//     function addDownloadOption() {
//       const downloadLink = document.createElement("a");
//       downloadLink.textContent = "Download QR Code";
//       downloadLink.style.display = "block";
//       downloadLink.style.textAlign = "center";
//       downloadLink.style.marginTop = "10px";
//       downloadLink.style.cursor = "pointer";
//       downloadLink.addEventListener("click", () => {
//         downloadQRCode(qrCodeContainer.firstChild);
//       });
//       qrCodeContainer.appendChild(downloadLink);
//     }
  
//     function downloadQRCode(qrCodeCanvas) {
//       const imageData = qrCodeCanvas.toDataURL("image/png");
//       const downloadLink = document.createElement("a");
//       downloadLink.href = imageData;
//       downloadLink.download = "qr-code.png";
//       downloadLink.click();
//     }
//   });
  
  






// document.addEventListener("DOMContentLoaded", () => {
//   const urlInput = document.getElementById("url-input");
//   const logoInput = document.getElementById("logo-input");
//   const generateBtn = document.getElementById("generate-btn");
//   const qrCodeContainer = document.getElementById("qr-code");
//   let qrCode;

//   generateBtn.addEventListener("click", () => {
//     const url = urlInput.value;
//     if (url) {
//     //   qrCode = generateQRCode(url);
//       qrCode = generateQRCode(url, logoInput.files[0]);
//       addDownloadOption();
//     }
//   });

//   function generateQRCode(url,logoFile) {
//     const qrcode = new QRCode(qrCodeContainer, {
//         text: url,
//         width: 256,
//         height: 256,
//         padding: 20,
//         colorDark : "#000000",
//         colorLight : "#ffffff",
//         correctLevel : QRCode.CorrectLevel.H,
//         logo: logoFile,
//     });

//     return qrcode;
//   }

//   function addDownloadOption() {
//     const downloadLink = document.createElement("a");
//     downloadLink.textContent = "Download QR Code";
//     downloadLink.style.display = "block";
//     downloadLink.style.textAlign = "center";
//     downloadLink.style.marginTop = "10px";
//     downloadLink.style.cursor = "pointer";
//     downloadLink.addEventListener("click", () => {
//       downloadQRCode(qrCode);
//     });
//     qrCodeContainer.appendChild(downloadLink);
//   }

//   function downloadQRCode(qrCode) {
//     const canvas = qrCode._el.childNodes[0];
//     const context = canvas.getContext("2d");
//     const qrCodeSize = canvas.width;
//     const totalSize = qrCodeSize + 30; // Add 5 pixels of whitespace on each side
  
//     const newCanvas = document.createElement("canvas");
//     const newContext = newCanvas.getContext("2d");
//     newCanvas.width = totalSize;
//     newCanvas.height = totalSize;
  
//     // Fill the canvas with white color
//     newContext.fillStyle = "#ffffff";
//     newContext.fillRect(0, 0, totalSize, totalSize);
  
//     // Draw the QR code in the center of the canvas
//     const qrCodeX = (totalSize - qrCodeSize) / 2;
//     const qrCodeY = (totalSize - qrCodeSize) / 2;
//     newContext.drawImage(canvas, qrCodeX, qrCodeY);
  
//     const imageData = newCanvas.toDataURL("image/png");
//     const downloadLink = document.createElement("a");
//     downloadLink.href = imageData;
//     downloadLink.download = "qr-code.png";
//     downloadLink.click();
//   }
// });
