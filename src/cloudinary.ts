import { v2 } from "cloudinary";
import { CLOUDINARY } from "./constants";

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dhqpm9g01',
      api_key: '289394936245893',
      api_secret: 'AvUeymF3fWMlX4F53LVYXg9iYGA'
    });
  }
};
