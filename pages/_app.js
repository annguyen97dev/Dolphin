import React from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import App from 'next/app';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router';
import '~/styles/styles.scss';
import '~/styles/responsive.scss';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
import '~/page-components/Result/MyRanking.css';
import { AuthProvider } from '~/api/auth';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {}),
			},
		};
	}

	// --------------------------- //

	// Lưu History để trả ra page home nếu lần đầu vào thẳng trang login
	state = {
		history: [], // keep history items in state
	};

	componentDidMount() {
		const { asPath } = this.props.router;

		// lets add initial route to `history`
		this.setState((prevState) => ({ history: [...prevState.history, asPath] }));
	}

	componentDidUpdate() {
		const { history } = this.state;
		const { asPath } = this.props.router;

		// if current route (`asPath`) does not equal
		// the latest item in the history,
		// it is changed so lets save it
		if (history[history.length - 1] !== asPath) {
			this.setState((prevState) => ({
				history: [...prevState.history, asPath],
			}));
		}
	}
	// --------------------------- //

	componentDidMount() {
		if (process.env.NODE_ENV !== 'production') {
			const axe = require('react-axe');
			axe(React, ReactDOM, 1000);
		}
	}

	render() {
		const { Component, pageProps } = this.props;
		const getLayout = Component.getLayout || ((page) => page);
		const theme = createMuiTheme({
			palette: {
				background: {
					default: '#eeeeee',
				},
				primary: {
					light: '#3389ff',
					main: '#006cff',
					dark: '#004bb2',
					contrastText: '#fff',
				},
				secondary: {
					light: '#f73378',
					main: '#f50057',
					dark: '#ab003c',
					contrastText: '#fff',
				},
				warning: {
					light: '#ffcf33',
					main: '#ffc400',
					dark: '#b28900',
					contrastText: '#000',
				},
			},
			typography: {
				fontFamily: [
					'"PoppinsVN"',
					'Roboto',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'"Helvetica Neue"',
					'Arial',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
				].join(','),
			},
		});

		return (
			<>
				<Head>
					<title>Dolphin Training</title>
				</Head>

				<ThemeProvider theme={theme}>
					<AuthProvider history={this.state.history} {...pageProps}>
						<CssBaseline>{getLayout(<Component {...pageProps} />)}</CssBaseline>
					</AuthProvider>
				</ThemeProvider>
			</>
		);
	}
}
