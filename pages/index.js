import React from 'react';
import Authentication from './auth';
import Home from '~/pages/home';
import { getLayout } from '~/components/Layout';
const Index = () => (
	<React.Fragment>
		<Home />
	</React.Fragment>
);

Index.getLayout = getLayout;

export default Index;
