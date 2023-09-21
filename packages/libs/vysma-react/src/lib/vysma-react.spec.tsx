import { render } from '@testing-library/react';

import VysmaReact from './vysma-react';

describe('VysmaReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VysmaReact />);
    expect(baseElement).toBeTruthy();
  });
});
