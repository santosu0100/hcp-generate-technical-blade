import { StyleSheet, Text, View, Svg } from '@react-pdf/renderer';
import React from 'react';

interface MarkerListItem {
  title: string;
  description: string;
  icon?: string; // Full SVG string
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
}

interface MarkerListProps {
  items: MarkerListItem[];
  config?: MarkerListConfig;
  theme?: MarkerListTheme;
}

// Parse SVG string and extract elements for react-pdf
function parseSvgElements(svgString: string): React.ReactNode[] {
  if (!svgString) return [];

  const elements: React.ReactNode[] = [];

  // Extract paths
  const pathRegex = /<path[^>]*d="([^"]*)"[^>]*\/>/g;
  let pathMatch: RegExpExecArray | null;
  while ((pathMatch = pathRegex.exec(svgString)) !== null) {
    const d = pathMatch[1];
    const fillMatch = pathMatch[0].match(/fill="([^"]*)"/);
    const fill = fillMatch ? fillMatch[1] : 'currentColor';
    elements.push(<path key={`path-${elements.length}`} d={d} fill={fill} />);
  }

  // Extract circles
  const circleRegex = /<circle[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*r="([^"]*)"[^>]*\/>/g;
  let circleMatch: RegExpExecArray | null;
  while ((circleMatch = circleRegex.exec(svgString)) !== null) {
    const cx = circleMatch[1];
    const cy = circleMatch[2];
    const r = circleMatch[3];
    const fillMatch = circleMatch[0].match(/fill="([^"]*)"/);
    const fill = fillMatch ? fillMatch[1] : 'currentColor';
    elements.push(<circle key={`circle-${elements.length}`} cx={cx} cy={cy} r={r} fill={fill} />);
  }

  // Extract rects
  const rectRegex = /<rect[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*width="([^"]*)"[^>]*height="([^"]*)"[^>]*\/>/g;
  let rectMatch: RegExpExecArray | null;
  while ((rectMatch = rectRegex.exec(svgString)) !== null) {
    const x = rectMatch[1];
    const y = rectMatch[2];
    const width = rectMatch[3];
    const height = rectMatch[4];
    const fillMatch = rectMatch[0].match(/fill="([^"]*)"/);
    const fill = fillMatch ? fillMatch[1] : 'currentColor';
    elements.push(<rect key={`rect-${elements.length}`} x={x} y={y} width={width} height={height} fill={fill} />);
  }

  return elements;
}

// Extract viewBox from SVG string
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
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  // Left item with line coming from top-left corner
  itemLeftWithLine: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderTopWidth: LINE_WIDTH,
    borderLeftWidth: LINE_WIDTH,
    borderTopLeftRadius: 4,
  },
  // Right item with line going down on LEFT side
  itemRightWithLine: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: LINE_WIDTH,
  },
  // Connector between rows: horizontal line bridging left and right items
  connectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 12,
  },
  connectorLeft: {
    width: '48%',
    borderBottomWidth: LINE_WIDTH,
    borderLeftWidth: LINE_WIDTH,
    borderBottomLeftRadius: 4,
  },
  connectorRight: {
    width: '48%',
    borderLeftWidth: LINE_WIDTH,
  },
  markerColumn: {
    width: 24,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 4,
    paddingLeft: 4,
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
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  description: {
    fontSize: 7,
    fontWeight: 'normal',
    lineHeight: 1.3,
  },
  placeholder: {
    width: '48%',
  },
});

export default function MarkerList({ items, config, theme }: MarkerListProps) {
  const markerColor = config?.markerColor ?? theme?.primaryColor ?? '#FFCC00';
  const numberColor = config?.numberColor ?? '#000000';
  const lineColor = config?.lineColor ?? '#E2E8F0';
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';

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

  const renderItem = (item: MarkerListItem, index: number, isLeft: boolean, showLine: boolean) => {
    // Determine which style to use based on position and whether line should show
    let itemStyle = styles.item;

    if (showLine) {
      if (isLeft) {
        // Left item: line comes from top-left corner (border-top and border-left)
        itemStyle = styles.itemLeftWithLine;
      } else {
        // Right item: line goes to bottom-right corner (border-right and border-bottom)
        itemStyle = styles.itemRightWithLine;
      }
    }

    return (
      <View key={index} style={[itemStyle, { borderColor: lineColor }]}>
        <View style={styles.markerColumn}>
          {item.icon && (
            <View style={styles.iconWrapper}>
              <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox={extractViewBox(item.icon)}>
                {parseSvgElements(item.icon)}
              </Svg>
            </View>
          )}
          <View style={[styles.markerWrapper, { backgroundColor: markerColor }]}>
            <Text style={[styles.number, { color: numberColor }]}>{index + 1}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, { color: titleColor }]}>{item.title}</Text>
          <Text style={[styles.description, { color: descriptionColor }]}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => {
        const isFirstRow = rowIndex === 0;
        const isLastRow = rowIndex === rows.length - 1;

        // Line logic:
        // - Item 1 (first row, left): NO line
        // - Item 2 (first row, right): line going DOWN if there's more rows
        // - Item 3 (second row, left): line coming FROM TOP
        // - Item 4 (second row, right): line going DOWN if there's more rows

        const leftShowLine = !isFirstRow;
        const rightShowLine = !isLastRow;

        return (
          <React.Fragment key={rowIndex}>
            {/* Connector row between rows (snake line) */}
            {!isFirstRow && (
              <View style={styles.connectorRow}>
                <View style={[styles.connectorLeft, { borderColor: lineColor }]} />
                <View style={[styles.connectorRight, { borderColor: lineColor }]} />
              </View>
            )}

            {/* Items row */}
            <View style={styles.row}>
              {row.left && row.leftIndex !== undefined ? (
                renderItem(row.left, row.leftIndex, true, leftShowLine)
              ) : (
                <View style={styles.placeholder} />
              )}
              {row.right && row.rightIndex !== undefined ? (
                renderItem(row.right, row.rightIndex, false, rightShowLine)
              ) : (
                <View style={styles.placeholder} />
              )}
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}
