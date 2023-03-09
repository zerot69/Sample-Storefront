import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import type { ITransitMessage } from "~/interfaces/common.interface";

export const middleWare = async (props: {
  dto: any;
  request: Request;
}): Promise<ITransitMessage> => {
  const formData = await props.request.formData();
  const data = Object.fromEntries<any>(formData.entries());
  const dto: any = plainToClass(props.dto, data);
  const errors = await validate(dto);
  // console.log({ errors });
  const messages: any = errors.map(
    (obj: any) => Object.values(obj.constraints)[0]
  );
  return { success: messages.length === 0, data, messages };
};
