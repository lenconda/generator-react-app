import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './index.<%= preprocessor %>';

interface <%= name %>PageProps extends RouteComponentProps {}

const <%= pageName %>Page = (props: <%= name %>PageProps) => {
  return (
    <>
      This is the <%= pageName %> page!
    </%=>
  );
}

export default <%= pageName %>Page;
