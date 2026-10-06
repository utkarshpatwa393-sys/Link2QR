/**
 * Downloads a canvas element as a high-quality PNG image.
 * Uses a white background with a quiet zone margin to guarantee standard QR scanning.
 */
export async function downloadQrCodeImage(canvasElement, fileName = 'link2qr-code.png') {
  if (!canvasElement) {
    throw new Error('Canvas element not found.');
  }

  try {
    // Create a high-res offscreen canvas (e.g. 1024x1024) for print-ready quality
    const targetSize = 1024;
    const padding = 64; // quiet zone padding
    const offscreen = document.createElement('canvas');
    offscreen.width = targetSize;
    offscreen.height = targetSize;

    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D canvas context.');
    }

    // Fill clean white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetSize, targetSize);

    // Draw the QR code centered with crisp pixel rendering
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      canvasElement,
      padding,
      padding,
      targetSize - padding * 2,
      targetSize - padding * 2
    );

    // Convert offscreen canvas to PNG blob
    const blob = await new Promise((resolve, reject) => {
      offscreen.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to generate PNG blob'));
      }, 'image/png', 1.0);
    });

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Clean up object URL after a brief delay
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    return true;
  } catch (err) {
    console.error('Error downloading QR code:', err);
    throw new Error('Unable to download the QR code.');
  }
}

/**
 * Copies text to the clipboard with robust fallbacks
 */
export async function copyTextToClipboard(text) {
  if (!text) {
    throw new Error('No text provided to copy.');
  }

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back to execCommand
    }
  }

  // Fallback for older browsers / iframe contexts
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (!successful) {
      throw new Error('execCommand failed');
    }
    return true;
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    throw new Error('Unable to copy the link.');
  }
}
