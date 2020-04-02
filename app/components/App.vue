<template>
  <Page actionBarHidden="true">
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <GridLayout columns="*" rows="*,*,*">
      <Label class="message" :text="contractText" col="0" row="0"/>
      <Label class="message" :text="info" col="0" row="1"/>
      <Label class="message" :class="{gravity: accReached}" :text="gravity" col="0" row="2"/>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue,
} from 'vue-property-decorator';
import {
  AndroidSensors,
  AndroidSensorListener,
  SensorDelay,
} from "nativescript-android-sensors";
import SC from '../handlers';

@Component({})
export default class App extends Vue {
  public msg = 'Hola mundo';
  public accelerometer = {
    x_data: null,
    y_data: null,
    z_data: null,
  };
  public androidSensors: AndroidSensors;
  public accReached: Boolean = false;
  public txt: string = '';
  constructor() {
    super();
    this.androidSensors = new AndroidSensors();
    const mHWListener = new AndroidSensorListener({
      onSensorChanged: (result) => {
        const parsedData = JSON.parse(result);
        const rawSensorData = parsedData.data;
        this.accelerometer.x_data = rawSensorData.x.toFixed(2);
        this.accelerometer.y_data = rawSensorData.y.toFixed(2);
        this.accelerometer.z_data = rawSensorData.z.toFixed(2);
      },
      onAccuracyChanged: (sensor, accuracy) => {
        console.log(`Accuracy changed: Sensor => ${sensor} | Accuracy => ${accuracy}`);
      },
    });
    const acceleration = this.androidSensors.startSensor(
      android.hardware.Sensor.TYPE_ACCELEROMETER,
      SensorDelay.NORMAL,
      8000000,
    );
    this.androidSensors.setListener(mHWListener);
    const sc = new SC();
    sc.text.then((text) => {
      this.txt = text;
    });
  }

  get info(): String {
    return `X: ${this.accelerometer.x_data} | Y: ${this.accelerometer.y_data} | Z: ${this.accelerometer.z_data}`;
  }

  get contractText(): String {
    return this.txt;
  }

  @Watch('gravity')
  onGravityChanged(newVal: Number, oldVal: Number) {
    this.accReached = newVal >= 13;
  }

  get gravity(): Number {
    return parseFloat(Math.sqrt(
      Math.pow(this.accelerometer.x_data, 2)
      + Math.pow(this.accelerometer.y_data, 2)
      + Math.pow(this.accelerometer.z_data, 2)
    ).toFixed(2));
  }
}
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }

  .gravity {
    color: crimson;
  }
</style>
