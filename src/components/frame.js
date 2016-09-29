// @flow

import React from 'react';
import Nav from './nav';
// eslint-disable-next-line
import type { Props as NavProps } from './nav';
import Modal from './modal';

type Props = NavProps & {
  modal?: {
    component: () => void,
    title: string,
  },
  children: React.Element | React.Element[],
};

export default ({ modal, children, ...props }: Props) => (
  <div>
    <Nav {...props} />
    <div className="spacer">
      <div className="container">
        {children}
      </div>
    </div>
    {(modal) ? (
      <Modal title={modal.title}>
        {React.createElement(modal.component, props)}
      </Modal>
      ) : null}
  </div>
);
