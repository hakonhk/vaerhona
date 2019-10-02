import React from 'react';

import { prettyDateTime } from 'core/date';

// All the possible image variations in S3
const imageSizeVariations = [100, 320, 640, 1024, 1280];

const SnapshotImage = ({ date, placeName, image, ...rest }) => {
  const props = {
    alt: `Bilde fra ${placeName} tatt ${prettyDateTime(date)}`,
    ...rest
  };

  props.src = `${image}/${imageSizeVariations[3]}_r`;
  props.srcSet = imageSizeVariations
    .map(size => `${image}/${size}_r ${size}w`)
    .join(', ');

  return <img {...props} />;
};

export default SnapshotImage;
