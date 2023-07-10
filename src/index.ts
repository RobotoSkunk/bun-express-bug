import express from 'express';
import compression from 'compression';
import { minify } from './minify';
import path from 'path';

const app = express();


(async () => {
	app.use(compression());
	app.use(await minify());


	app.use(express.static(path.join(process.cwd(), 'public'), {
		maxAge: 0,
		dotfiles: 'ignore',
		fallthrough: true,
		etag: true
	}));

	app.all('/', (req, res) => {
		res.send(`
			<script src="/index.js"></script>
			<p>Hello world!</p>
		`);
	});


	app.listen(8080, () => {
		console.log('Running!');
	});
})();
