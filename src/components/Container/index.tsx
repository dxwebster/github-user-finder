import React from 'react';
import PropTypes from 'prop-types';

import { ContainerStyle } from './styles';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
