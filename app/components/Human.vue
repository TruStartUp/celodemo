<template>
  <Page actionBarHidden="true" class="app">
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <GridLayout columns="*" rows="*">
      <Label class="message" text="You are a beautiful human!" col="0" row="0" textWrap="true"/>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component({})
export default class Human extends Vue {
};
</script>

<style scoped lang="scss">
  .app {
    background-image: linear-gradient(#2b37a5, #050e57);
    color: #fff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 30;
  }
</style>
