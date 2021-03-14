import 'fontsource-roboto';

import React from 'react';
import { Layout } from '../client/components/Layout';
import { Search } from '../client/components/Search';

const Index: React.FC = () => {
  return (
    <Layout>
      <Search />
    </Layout>
  );
};

export default Index;
