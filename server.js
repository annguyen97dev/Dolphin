const express = require('express'); // Sử dụng framework express
const next = require('next'); // Include module next

const port = parseInt(process.env.PORT, 10) || 3000; // Port để chạy app Nextjs, cũng là server nodejs
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	//Tạo ra các router. Dòng này có ý nghĩa khi gửi request đến path /a . Sẽ render file /a.js trong thư mục pages/a.js của Nextjs
	server.get('/home', (req, res) => {
		return app.render(req, res, '/home', req.query);
	});

	server.get('/', (req, res) => {
		return app.render(req, res, '/home', req.query);
	});

	server.get('/login', (req, res) => {
		return app.render(req, res, '/auth/login', req.query);
	});

	server.get('/my-course', (req, res) => {
		return app.render(req, res, '/my-course', req.query);
	});

	server.get('/my-course/course/:courseid', (req, res) => {
		app.render(req, res, '/my-course/course', req.params.courseid);
	});

	server.get('/result/resultid/:resultid', (req, res) => {
		app.render(req, res, '/result/resultid', req.params.resultid);
	});

	server.get('/blog', (req, res) => {
		return app.render(req, res, '/blog', req.query);
	});

	server.get('/blog/post/slug/:slug', (req, res) => {
		return app.render(req, res, '/blog/post/slug', req.params.slug);
	});

	server.get('/profile', (req, res) => {
		return app.render(req, res, '/profile', req.query);
	});

	server.get('/result', (req, res) => {
		return app.render(req, res, '/result', req.query);
	});

	// Nếu các bạn muốn các routing tự động liến kết đến route files giống với cấu trúc của Nextjs thì chỉ cần thêm 3 dòng bên dưới
	// https://nextjs.org/docs/routing/introduction
	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
