import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface examplePageProps extends RouteComponentProps {}

const ExamplePage = (props: examplePageProps) => {
  return (
    <>
      Here is page!
    </>
  );
}

export default ExamplePage;
