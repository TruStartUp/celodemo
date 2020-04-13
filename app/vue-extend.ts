import { Vue } from "vue-property-decorator";

declare module "vue-property-decorator" {
  interface Vue {
    $navigateTo(args);
    $goto(args);
    $firebase;
    $showModal(args, bargs);
  }
}
