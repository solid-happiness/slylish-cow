import 'fontsource-roboto';

import React from 'react';
import axios from 'axios';
import { GetStaticProps } from 'next';

import { Layout } from 'client/components/Layout';
import { Search } from 'client/components/Search';
import { Company } from 'client/typings';

import { getApiUrl } from 'client/utils';

type Props = {
  companies: Company[];
};

const Index: React.FC<Props> = ({ companies }) => (
  <Layout>
    <Search companies={companies} />
  </Layout>
);

Index.defaultProps = {
  companies: [],
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<{ payload: Company[] }>(
    `${getApiUrl()}/api/companies`
  );

  return { props: { companies: data.payload } };
};

export default Index;
