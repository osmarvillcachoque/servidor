module.exports = {

	find: function (req, res, next){

		Departamento.find().then(function(Departamentos){

			if(Departamentos){

				var Subdepartamentos = req.Subdepartamentos;
				DepartamentosJSON = [];

				Departamentos.forEach(function(departamento){

					DepartamentoJSON = {
							"id":departamento.id,
							"Nombre":departamento.Nombre,
							"Subdepartamentos":[]
						};

					Subdepartamentos.forEach(function(Subdepartamento){

						if( departamento.id == Subdepartamento.Departamento ){

							DepartamentoJSON.Subdepartamentos.push({id:Subdepartamento.id,Nombre:Subdepartamento.Nombre, Departamento:Subdepartamento.Departamento ,Instalaciones:Subdepartamento.Instalaciones});

						}
					});

					DepartamentosJSON.push(DepartamentoJSON);
				});
				res.json(DepartamentosJSON);
			}
		}).catch(function(error){next(error);});
	
	}
	/*find: function (req, res, next){
	
		Departamento.find().populateAll().then(function(Departamentos){
	
			if (Departamentos) {

				var DepartamentosJSON = [];

				Departamentos.forEach(function(Departamento){

					 var Instalaciones = [];

					Departamento.Instalaciones.forEach(function(Instalacion){
						
						Instalaciones.push({ id: Instalacion.id, Nombre: Instalacion.Nombre });

					});

					DepartamentosJSON.push({ id: Departamento.id, Nombre: Departamento.Nombre, Instalaciones: Departamento.Instalaciones });

				});

				res.json(DepartamentosJSON);

			}
			else { 
				res.json(404, {err: 'No se han encontrado Departamentos.'});
			}
	
		}).catch(function(error){next(error);});
	
	}*/

};