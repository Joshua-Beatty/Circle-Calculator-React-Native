import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { radius: "", diameter: "", circumference: "", area: "", pi: "3.14", piDigits: 3, piFull: "3.14159265358979", decimals: "2", set: 0 };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleTextChange(num, set) {
    if (set == 0) {
      this.setState({ radius: String(num), diameter: String(num / 2) });
      this.setState((state, props) => ({ area: String(state.radius * state.radius * state.pi), circumference: String(state.radius * 2 * state.pi) }));
    }
    if (set == 1) {
      this.setState({ radius: String(num * 2), diameter: String(num) });
      this.setState((state, props) => ({ area: String(state.radius * state.radius * state.pi), circumference: String(state.radius * 2 * state.pi) }));
    }
    if (set == 2) {
      this.setState((state, props) => ({ radius: String(num / 2 / state.pi), circumference: String(num) }));
      this.setState((state, props) => ({ area: String(state.radius * state.radius * state.pi), diameter: String(state.radius / 2) }));
    }
    if (set == 3) {
      this.setState((state, props) => ({ area: String(num), radius: String(Math.sqrt(num / state.pi)) }));
      this.setState((state, props) => ({ circumference: String(state.radius * 2 * state.pi), diameter: String(state.radius / 2) }));
    }
    this.setState({ set });


  }

  handleSliderChange(num) {
    if (num != 1) {
      this.setState((state, props) => ({ piDigits: num, pi: state.piFull.substring(0, num + 1) }));
    } else {
      this.setState((state, props) => ({ piDigits: num, pi: state.piFull.substring(0, num) }));
    }
    if (this.state.radius != "") {
      if (this.state.set == 0) {
        this.handleTextChange(this.state.radius, 0)
      }
      if (this.state.set == 1) {
        this.handleTextChange(this.state.diameter, 1)
      }
      if (this.state.set == 2) {
        this.handleTextChange(this.state.circumference, 2)
      }
      if (this.state.set == 3) {
        this.handleTextChange(this.state.area, 3)
      }
    }

  }



  render() {
    let windowWidth = Dimensions.get('window').width;
    const textStyle = StyleSheet.create({
      style: {
        height: 40,
        width: windowWidth * .8,
        fontSize: 20,
        borderBottomWidth: .30,
      },
      slider: {
        height: 40,
        width: windowWidth * .8,
        borderBottomWidth: .30,
      },
    });
    return (
      <KeyboardAvoidingView style={styles.container } behavior="padding" enabled>
        <View style={styles.container}>
          <View >
            <Text style={styles.text}>Radius</Text>
            <TextInput
              style={textStyle.style}
              placeholder="Enter your radius here!"
              onChangeText={newText => this.handleTextChange(newText, 0)}
              value={this.state.radius}
              keyboardType="decimal-pad"
            />
          </View>

          <View>
            <Text style={styles.text}>Diameter</Text>
            <TextInput
              style={textStyle.style}
              placeholder="Enter your diameter here!"
              onChangeText={newText => this.handleTextChange(newText, 1)}
              value={this.state.diameter}
              keyboardType="decimal-pad"
            />
          </View>

          <View>
            <Text style={styles.text}>Circumference</Text>
            <TextInput
              style={textStyle.style}
              placeholder="Enter your circumference here!"
              onChangeText={newText => this.handleTextChange(newText, 2)}
              value={this.state.circumference}
              keyboardType="decimal-pad"
            />
          </View>

          <View>
            <Text style={styles.text}>Area</Text>
            <TextInput
              style={textStyle.style}
              placeholder="Enter your area here!"
              onChangeText={newText => this.handleTextChange(newText, 3)}
              value={this.state.area}
              keyboardType="decimal-pad"
            />
          </View>
          <View>
            <Text style={styles.text}>Pi: {this.state.pi}</Text>
            <Slider
              style={textStyle.slider}
              minimumValue={1}
              maximumValue={15}
              step={1}
              value={this.state.piDigits}
              onValueChange={value => this.handleSliderChange(value)}
            />
          </View>

        </View>

      </KeyboardAvoidingView>
    );
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15
  },
  text: {
    fontSize: 20,
  }
});
