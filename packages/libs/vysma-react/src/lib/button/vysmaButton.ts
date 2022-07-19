import { createEvent, createSource } from '@vysma/libs-kernel';

export interface ButtonEvent {
  name: string;
  props: any;
}

const whenButtonClicked = createEvent<ButtonEvent>('click');

export const VysmaButtonSource = createSource({
  id: 'io.vysma.react.button',
  events: [whenButtonClicked],
  // init: (_, [onClick]) => {
  //   return {};
  // },
});
