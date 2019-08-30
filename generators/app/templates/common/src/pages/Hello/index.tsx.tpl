import React from 'react';
import './index.<%= extension %>';
import { RouteComponentProps } from 'react-router';

interface HelloPageProps extends RouteComponentProps {}

const Hello = (props: HelloPageProps): JSX.Element => {
  return (
    <p>It works!</p>
  );
};

export default Hello;
