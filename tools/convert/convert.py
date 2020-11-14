import os
import cv2
import numpy

SOURCE_TOP = 299
SOURCE_LEFT = 600
SOURCE_HEIGHT = 1045
SOURCE_WIDTH = 1192
DEST_SIZE = 112

def convert(filename, index):
    print(filename)
    source = cv2.imread('source/{}'.format(filename))

    height_ratio = SOURCE_HEIGHT / DEST_SIZE
    width_ratio = SOURCE_WIDTH / DEST_SIZE

    start_y = SOURCE_TOP + (height_ratio / 2)
    start_x = SOURCE_LEFT + (width_ratio / 2)

    dest = numpy.zeros((DEST_SIZE, DEST_SIZE, 3))

    for row in range(DEST_SIZE):
        for col in range(DEST_SIZE):
            sample_y = round(start_y + height_ratio * row)
            sample_x = round(start_x + width_ratio * col)
            sample = source[sample_y][sample_x]
            dest[row][col] = sample

    cv2.imwrite('dest/{}.png'.format(index), dest)

for i, filename in enumerate(sorted(os.listdir('source'))):
    convert(filename, i)


