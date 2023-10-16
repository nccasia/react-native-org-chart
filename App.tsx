/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import NodeComponent from './NodeComponent';
import OrgChart from './OrgChartFile';
import {RNSVGTSpan} from 'react-native-svg';

const tree = {
  nodes: [
    {
      text: 'node 0',
      nodes: [
        {
          text: 'node 1',
          nodes: [
            {
              text: 'node 2',
            },
          ],
        },
        {
          text: 'node 3',
          nodes: [
            {
              text: 'node 4',
            },
          ],
        },
      ],
    },
  ],
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text>vsfcvsd sd f sdf </Text>
        <OrgChart
          tree={tree}
          nodeWidth={16}
          nodeHeight={5}
          floorHeight={4}
          nodeSpace={4}
          NodeComponent={NodeComponent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
