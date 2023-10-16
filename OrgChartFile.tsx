import React, {useState, useEffect} from 'react';
import Svg, {G, Line} from 'react-native-svg';

interface Node {
  nodes?: Node[];
  [key: string]: any;
}

interface OrgChartProps {
  tree: Node;
  NodeComponent: React.FC<any>;
  nodeWidth: number;
  nodeHeight: number;
  floorHeight: number;
  nodeSpace: number;
}

const OrgChart: React.FC<OrgChartProps> = props => {
  const {tree, NodeComponent, nodeWidth, nodeHeight, floorHeight, nodeSpace} =
    props;

  const [canvasWidth, setCanvasWidth] = useState<number>(
    getTreeWidth(tree, nodeWidth, nodeSpace),
  );
  const [canvasHeight, setCanvasHeight] = useState<number>(
    getTreeHeight(tree, nodeHeight, floorHeight),
  );

  useEffect(() => {
    setCanvasWidth(getTreeWidth(tree, nodeWidth, nodeSpace));
    setCanvasHeight(getTreeHeight(tree, nodeHeight, floorHeight));
  }, [tree, nodeWidth, nodeHeight, floorHeight, nodeSpace]);

  const renderNode = ({
    node,
    level,
    index,
  }: {
    node: Node;
    level: number;
    index: number;
  }) => {
    const {nodes} = node;
    const numberChild = nodes ? nodes.length : 0;
    const branchWidth = getTreeWidth(node, nodeWidth, nodeSpace);
    return (
      <G key={index} x={index * (branchWidth + nodeSpace)} y={0}>
        {level > 0 && (
          <G>
            <Line
              stroke="red"
              strokeWidth="1"
              x1={Math.floor(nodeWidth / 2)}
              y1={0}
              x2={Math.floor(nodeWidth / 2)}
              y2={floorHeight}
            />
          </G>
        )}
        <G x={0} y={floorHeight}>
          <NodeComponent {...node} {...props} />
        </G>
        <G y={nodeHeight}>
          {numberChild > 0 && (
            <Line
              stroke="red"
              strokeWidth="1"
              x1={Math.floor(nodeWidth / 2)}
              y1={floorHeight}
              x2={Math.floor(nodeWidth / 2)}
              y2={2 * floorHeight}
            />
          )}
          {numberChild > 1 && (
            <Line
              stroke="red"
              strokeWidth="1"
              x1={0}
              y1={2 * floorHeight}
              x2={branchWidth}
              y2={2 * floorHeight}
            />
          )}
        </G>
        <G y={nodeHeight + 2 * floorHeight}>
          {nodes &&
            nodes.map((node, index) =>
              renderNode({node, index, level: level + 1}),
            )}
        </G>
      </G>
    );
  };

  return (
    <Svg
      height="80%"
      width="80%"
      viewBox={`0 0 ${2 * canvasWidth} ${2 * canvasHeight}`}>
      {(tree.nodes || []).map((node, index) =>
        renderNode({node, index, level: 0}),
      )}
    </Svg>
  );
};

export default OrgChart;

// Helper functions

const getNumberTreeLeave = (node: Node): number => {
  if (!node.nodes || node.nodes.length < 0) {
    return 1;
  }
  return node.nodes.reduce(
    (total, child) => total + getNumberTreeLeave(child),
    0,
  );
};

const getNumberTreeFloor = (node: Node, level: number = 1): number => {
  if (!node.nodes || node.nodes.length < 0) {
    return level;
  }
  return Math.max(
    ...node.nodes.map(child => getNumberTreeFloor(child, level + 1)),
  );
};

const calcTreeWidth = (
  numberNode: number,
  nodeWidth: number,
  nodeSpace: number,
): number => {
  return numberNode * nodeWidth + (numberNode - 1) * nodeSpace;
};

const getTreeWidth = (
  tree: Node,
  nodeWidth: number,
  nodeSpace: number,
): number => {
  const numberLeaves = getNumberTreeLeave(tree);
  return calcTreeWidth(numberLeaves, nodeWidth, nodeSpace);
};

const getTreeHeight = (
  tree: Node,
  nodeHeight: number,
  floorHeight: number,
): number => {
  const numberFloor = getNumberTreeFloor(tree);
  return calcTreeWidth(numberFloor, nodeHeight, floorHeight);
};
