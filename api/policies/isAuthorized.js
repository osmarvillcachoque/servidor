module.exports = function (req, res, next) {
	var token;

	if (req.headers && req.headers.authorization) {
		var parts = req.headers.authorization.split(' ');
		if (parts.length == 2) {
			var scheme = parts[0], credentials = parts[1];

			if (/^Bearer$/i.test(scheme)) {
				token = credentials;
			}
		} 
		else {
			return res.json(401, {err: 'Cabecera de autorización incorrecta.'});
		}

	}
	else if (req.param('token')) {
		token = req.param('token');
		delete req.query.token;
	} 
	else {
		return res.json(401, {err: 'No se ha encontrado una cabecera de autorización.'});
	}

	JWToken.verify(token, function (err, token) {
		if (err) { return res.json(401, { err: '¡Token inválido!' }); }

		Usuario.findOne(token.id).then(function (Usuario) {
			req.Usuario = Usuario;
			req.Rol = Usuario.Rol;
			req.tipoOperador = Usuario.tipoOperador;
			next();
		})
	});
};