<template>
  <Page actionBarHidden="true" class="app">
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <GridLayout columns="*" rows="*,*">
      <Label class="message" text="Move your phone to make the slider reach the dot" col="0" row="0"
             textWrap="true"/>
      <Slider value="0" @valueChange="match" col="0" row="1" v-model="sliderPosition"
              backgroundColor="#fff"
      />
      <GridLayout rows="*" :columns="'* '.repeat(100).trim().split(' ').join(',')" col="0" row="1"
                  class="gravity"
                  width="93%">
        <Image src="res://icon" row="0" :col="position" class="image"/>
      </GridLayout>
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

import {
  mapActions,
  mapState,
} from 'vuex';

import {
  Action,
  State,
} from 'vuex-class';

import * as constants from '@/store/constants.js';

@Component({})
export default class App extends Vue {
  public accelerometer = {
    x_data: null,
    y_data: null,
    z_data: null,
  };
  public androidSensors: AndroidSensors;
  public accReached: Boolean = false;
  public sliderPosition: number = 0;

  @State(state => state['Session'].position) position!: Number;
  @State(state => state['Session'].fit) fit!: Boolean;
  @Action(constants.SESSION_INIT) init;
  @Action(constants.SESSION_SET_POSITION) setPosition;

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
  }

  mounted() {
    this.init();
  }

  match() {
    this.setPosition(this.sliderPosition);
  }

  updatePosition() {
    this.init();
  }

  get info(): String {
    return `X: ${this.accelerometer.x_data} | Y: ${this.accelerometer.y_data} | Z: ${this.accelerometer.z_data}`;
  }

  @Watch('gravity')
  onGravityChanged(newVal: Number, oldVal: Number) {
    this.accReached = newVal >= 13;
  }

  @Watch('fit')
  onFitTrue(newVal: Boolean, oldVal: Boolean) {
    if (newVal)
      this.$goto('human');
  }

  @Watch('accelerometer.x_data')
  onXChanged(newVal: Number, oldVal: Number) {
    if (newVal < 0)
      this.sliderPosition += 1;
    else if (newVal > 0)
      this.sliderPosition -= 1;
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

<style lang="scss">
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .app {
    background-image: linear-gradient(#2b37a5, #050e57);
    color: #fff;
  }

  .image {
    width: 500%;
    height: auto;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
  }

  .gravity {
    color: crimson;
  }
</style>
