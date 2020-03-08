import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import Pedometer, {
  PedometerInterface,
} from '@t2tx/react-native-universal-pedometer';

// interface PedoResult : PedometerInterface | string | null;

export class PedometerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      error: 'none',
    };
  }

  check = () => {
    Pedometer.isStepCountingAvailable((error, result) => {
      console.log(error, result);
      this.setState({
        data: {result: result + ''},
        error,
      });
    });
  };

  start = () => {
    Pedometer.startPedometerUpdatesFromDate(
      new Date().setHours(0, 0, 0, 0),
      data => {
        this.setState({
          data: data || {},
          error: '-',
        });
      },
    );
  };

  stop = () => {
    Pedometer.stopPedometerUpdates();
    this.setState({
      data: {state: 'stoped'},
      error: '-',
    });
  };

  load = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();

    Pedometer.queryPedometerDataBetweenDates(
      start.getTime(),
      end.getTime(),
      (error, data: PedometerInterface | null) => {
        console.log(error);
        console.log(data);
        this.setState({
          data: data || {},
          error,
        });
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Button title=" ? " onPress={this.check} />
          </View>
          <View style={styles.rowItem}>
            <Button title=" ▶︎ " onPress={this.start} />
          </View>
          <View style={styles.rowItem}>
            <Button title=" ■ " onPress={this.stop} />
          </View>
          <View style={styles.rowItem}>
            <Button title=" ◎ " onPress={this.load} />
          </View>
        </View>
        <View style={[styles.row, styles.rowItem]}>
          <Text>ERROR: {this.state.error}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text>DATA:</Text>
        </View>
        {Object.keys(this.state.data).map(key => {
          return (
            <View key={key} style={styles.detailItem}>
              <Text>
                {key}: {this.state.data[key]}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowItem: {
    margin: 3,
  },
  detailItem: {
    marginTop: 5,
    marginLeft: 15,
  },
});

export default PedometerComponent;
