import {G, Rect, Text} from 'react-native-svg';

import React from 'react';

const NodeComponent = ({text, nodeWidth, nodeHeight}: any) => (
  <G>
    <Rect
      x={0}
      y={0}
      width={nodeWidth}
      height={nodeHeight}
      stroke="green"
      strokeWidth="1"
      fill="grey"
    />
    <Text x={2} y={2} fontSize={3} fill="white">
      {text}
    </Text>
  </G>
);

export default NodeComponent;
