import { StyleSheet, Text, View, Svg, Path, Circle, Rect } from '@react-pdf/renderer';
import React from 'react';

interface MarkerListItem {
  title: string;
  description: string;
  icon?: string;
}

interface MarkerListTheme {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
}

interface MarkerListConfig {
  markerColor?: string;
  numberColor?: string;
  lineColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  titleFontSize?: number;
  descriptionFontSize?: number;
  numberFontSize?: number;
  markerGap?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

interface MarkerListProps {
  items: MarkerListItem[];
  config?: MarkerListConfig;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  theme?: MarkerListTheme;
}

function parseSvgElements(svgString: string): React.ReactNode[] {
  if (!svgString) return [];
  const elements: React.ReactNode[] = [];
  const pathRegex = /<path[^>]*d="([^"]*)"[^>]*\/>/g;
  let pathMatch: RegExpExecArray | null;
  while ((pathMatch = pathRegex.exec(svgString)) !== null) {
    const d = pathMatch[1];
    const fillMatch = pathMatch[0].match(/fill="([^"]*)"/);
    const fill = fillMatch ? fillMatch[1] : 'currentColor';
    elements.push(<Path key={`path-${elements.length}`} d={d} fill={fill} />);
  }
  const circleRegex = /<circle[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*r="([^"]*)"[^>]*\/>/g;
  let circleMatch: RegExpExecArray | null;
  while ((circleMatch = circleRegex.exec(svgString)) !== null) {
    const cx = circleMatch[1];
    const cy = circleMatch[2];
    const r = circleMatch[3];
    const fillMatch = circleMatch[0].match(/fill="([^"]*)"/);
    const fill = fillMatch ? fillMatch[1] : 'currentColor';
    elements.push(<Circle key={`circle-${elements.length}`} cx={cx} cy={cy} r={r} fill={fill} />);
  }
  const rectRegex = /<rect[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*width="([^"]*)"[^>]*height="([^"]*)"[^>]*\/>/g;
  let rectMatch: RegExpExecArray | null;
  while ((rectMatch = rectRegex.exec(svgString)) !== null) {
    const x = rectMatch[1];
    const y = rectMatch[2];
    const width = rectMatch[3];
    const height = rectMatch[4];
    const fillMatch = rectMatch[0].match(/fill="([^"]*)"/);
    const fill = fillMatch ? fillMatch[1] : 'currentColor';
    elements.push(<Rect key={`rect-${elements.length}`} x={x} y={y} width={width} height={height} fill={fill} />);
  }
  return elements;
}

function extractViewBox(svgString: string): string {
  const match = svgString.match(/viewBox="([^"]*)"/);
  return match ? match[1] : '0 0 24 24';
}

const MARKER_SIZE = 10;
const ICON_SIZE = 14;
const LINE_WIDTH = 1;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 4,
  },
  // Left section containing line and marker
  leftSection: {
    width: 40,
    flexDirection: 'column',
    alignItems: 'flex-end', // Align to right
    paddingRight: 6, // Position line 6px from right edge
  },
  // Vertical line segment
  lineSegment: {
    width: LINE_WIDTH,
    backgroundColor: '#E2E8F0',
  },
  // Marker container
  markerContainer: {
    paddingTop: 4,
    alignItems: 'flex-end',
    paddingRight: 1,
  },
  iconWrapper: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginBottom: 2,
  },
  markerWrapper: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 6,
    fontWeight: 'bold',
  },
  // Content section
  content: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  description: {
    fontSize: 7,
    lineHeight: 1.3,
  },
  // Connector row between items
  connectorRow: {
    flexDirection: 'row',
    height: 14,
  },
  connectorLeft: {
    flex: 1,
  },
  connectorRight: {
    flex: 1,
  },
});

export default function MarkerList({ items, config, textAlign = 'left', theme }: MarkerListProps) {
  const markerColor = config?.markerColor ?? theme?.primaryColor ?? '#FFCC00';
  const numberColor = config?.numberColor ?? '#000000';
  const lineColor = config?.lineColor ?? '#E2E8F0';
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';
  const titleFontSize = config?.titleFontSize ?? 8;
  const descriptionFontSize = config?.descriptionFontSize ?? 7;
  const numberFontSize = config?.numberFontSize ?? 6;
  const markerGap = config?.markerGap ?? 4;

  const containerStyle = [
    styles.container,
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
  ];

  // Group items into rows of 2
  const rows: { left?: MarkerListItem; right?: MarkerListItem; leftIndex?: number; rightIndex?: number }[] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push({
      left: items[i],
      leftIndex: i,
      right: items[i + 1],
      rightIndex: i + 1,
    });
  }

  const renderItem = (item: MarkerListItem, index: number, lineAbove: boolean, lineBelow: boolean) => {
    // Line height calculations
    const lineAboveHeight = lineAbove ? 10 : 0;
    const lineBelowHeight = lineBelow ? 10 : 0;

    return (
      <View key={index} style={styles.item}>
        <View style={styles.leftSection}>
          {/* Line above marker */}
          {lineAbove && <View style={[styles.lineSegment, { height: lineAboveHeight, backgroundColor: lineColor }]} />}

          {/* Marker */}
          <View style={styles.markerContainer}>
            {item.icon && (
              <View style={styles.iconWrapper}>
                <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox={extractViewBox(item.icon)}>
                  {parseSvgElements(item.icon)}
                </Svg>
              </View>
            )}
            <View style={[styles.markerWrapper, { backgroundColor: markerColor }]}>
              <Text style={[styles.number, { color: numberColor, fontSize: numberFontSize }]}>{index + 1}</Text>
            </View>
          </View>

          {/* Line below marker */}
          {lineBelow && <View style={[styles.lineSegment, { height: lineBelowHeight, backgroundColor: lineColor }]} />}
        </View>
        <View style={[styles.content, { paddingLeft: markerGap }]}>
          <Text style={[styles.title, { color: titleColor, textAlign, fontSize: titleFontSize }]}>{item.title}</Text>
          <Text style={[styles.description, { color: descriptionColor, textAlign, fontSize: descriptionFontSize }]}>{item.description}</Text>
        </View>
      </View>
    );
  };

  // Connector between rows - draws the inverted U using SVG
  const SnakeConnector = () => {
    const width = 360;
    const lineX = 34; // X position of line (40px - 6px from right)
    const rightLineX = width / 2 + lineX; // X position of right item's line
    const height = 14;
    const midY = height / 2;

    // Path: from right line (top) -> down -> left -> down to left line (bottom)
    const pathD = `M ${rightLineX} 0 L ${rightLineX} ${midY} L ${lineX} ${midY} L ${lineX} ${height}`;

    return (
      <View style={styles.connectorRow}>
        <Svg width={width} height={height}>
          <Path d={pathD} stroke={lineColor} strokeWidth={LINE_WIDTH} fill="none" />
        </Svg>
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      {rows.map((row, rowIndex) => {
        const isFirstRow = rowIndex === 0;
        const isLastRow = rowIndex === rows.length - 1;
        const hasMoreItems = items.length > 2;

        // Snake pattern:
        // Row 1: [Item 1: no line] [Item 2: line below]
        // Connector: from Item 2 to Item 3
        // Row 2: [Item 3: line above] [Item 4: line above if not last]

        const leftLineAbove = !isFirstRow;
        const leftLineBelow = !isFirstRow && !isLastRow && hasMoreItems;

        const rightLineAbove = false;
        const rightLineBelow = !isLastRow && hasMoreItems;

        return (
          <React.Fragment key={rowIndex}>
            {/* Connector between rows */}
            {!isFirstRow && <SnakeConnector />}

            {/* Items row */}
            <View style={styles.row}>
              {row.left && row.leftIndex !== undefined ? (
                renderItem(row.left, row.leftIndex, leftLineAbove, leftLineBelow)
              ) : (
                <View style={styles.item} />
              )}
              {row.right && row.rightIndex !== undefined ? (
                renderItem(row.right, row.rightIndex, rightLineAbove, rightLineBelow)
              ) : (
                <View style={styles.item} />
              )}
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}
