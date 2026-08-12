import cv2
import numpy as np

# Load the image with alpha channel
img = cv2.imread('public/images/GuiaNegociosLOGO.png', cv2.IMREAD_UNCHANGED)
if img is None:
    print("Could not load image")
    exit(1)

# The logo usually has an emblem on the left and text on the right.
# Let's sum the alpha channel along the columns to find the gap between them.
alpha = img[:, :, 3]
col_sums = np.sum(alpha, axis=0)

# Find the gap (a column with very low alpha) in the middle
print("Image width:", img.shape[1])
for x in range(img.shape[1] // 4, img.shape[1] * 3 // 4):
    if col_sums[x] == 0:
        print("Found gap at column:", x)
        # Crop the left part (emblem)
        emblem = img[:, :x]
        cv2.imwrite('public/images/GuiaNegocios-emblem-color.png', emblem)
        print("Cropped emblem to width", x)
        break
else:
    print("No complete gap found, let's just find the bounding box of the left blob.")
    # Find contours
    contours, _ = cv2.findContours(alpha, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        # Sort contours by x position
        contours = sorted(contours, key=lambda c: cv2.boundingRect(c)[0])
        # The first large contour should be the emblem
        x, y, w, h = cv2.boundingRect(contours[0])
        emblem = img[y:y+h, x:x+w]
        cv2.imwrite('public/images/GuiaNegocios-emblem-color.png', emblem)
        print("Cropped emblem using contours:", x, y, w, h)

