import os
import cv2
import numpy

## background image
# SOURCE_TOP = 299
# SOURCE_LEFT = 600
# SOURCE_HEIGHT = 1045
# SOURCE_WIDTH = 1192
# DEST_HEIGHT = 112
# DEST_WIDTH = 112

## menu
# SOURCE_TOP = 1428
# SOURCE_LEFT = 610
# SOURCE_HEIGHT = 728
# SOURCE_WIDTH = 2364
# DEST_HEIGHT= 78
# DEST_WIDTH = 222

## items
SOURCE_TOP = 158
SOURCE_LEFT = 1887
SOURCE_HEIGHT = 1252
SOURCE_WIDTH = 1173
DEST_HEIGHT= 134
DEST_WIDTH = 110


def convert(filename, index):
    print(filename)
    source = cv2.imread('source/{}'.format(filename))

    height_ratio = SOURCE_HEIGHT / DEST_HEIGHT
    width_ratio = SOURCE_WIDTH / DEST_WIDTH

    start_y = SOURCE_TOP + (height_ratio / 2)
    start_x = SOURCE_LEFT + (width_ratio / 2)

    dest = numpy.zeros((DEST_HEIGHT, DEST_WIDTH, 3))

    for row in range(DEST_HEIGHT):
        for col in range(DEST_WIDTH):
            sample_y = round(start_y + height_ratio * row)
            sample_x = round(start_x + width_ratio * col)
            sample = source[sample_y][sample_x]
            dest[row][col] = sample

    cv2.imwrite('dest/{}.png'.format(index), dest)

for i, filename in enumerate(sorted(os.listdir('source'))[-1:]):
    convert(filename, 'items')


