angular.module("AppIncidencias")

	.factory('SupervisorService', function($http) {
		return {

			getDepartamentos: function() {
				return $http.get('/Departamento');
			},

			getSupervisores: function() {
				return $http.get('/Supervisores');
			},

			getOperadores: function() {
				return $http.get('/Operadores');
			},

			getColaboradores: function() {
				return $http.get('/Colaboradores');
			},

			getEstadosIncidencia: function() {
				return $http.get('/EstadosIncidencia');
			},

			getPrioridadesIncidencia: function() {
				return $http.get('/PrioridadesIncidencia');
			},

			getTiposIncidencia: function() {
				return $http.get('/TiposIncidencia');
			},

			getTiposOperador: function() {
				return $http.get('/TiposOperador');
			},

			getIncidencia: function(IncidenciaID) {
				return $http.get('/Incidencia/' + IncidenciaID);
			},

			CrearIncidencia: function($scope) {
				return $http.post('/Incidencia', { 
								Titulo: $scope.Titulo, 
						    		Descripcion: $scope.Descripcion, 
					    			Departamento: $scope.DepartamentoSeleccionado, 
					    			Ubicacion: $scope.UbicacionSeleccionada, 
					    			Instalacion: $scope.InstalacionSeleccionada, 
					    			Tipo: $scope.TipoSeleccionado, 
					    			Prioridad: $scope.PrioridadSeleccionada, 
					    			Estado: $scope.EstadoSeleccionado, 
					    			Operador: $scope.OperadorSeleccionado.ID, 
					    			FechaInicio: $scope.FechaInicio, 
					    			FechaPrevista: $scope.FechaPrevista, 
					    			FechaFin: $scope.FechaFin
    							});
			},

			EditarIncidencia: function($scope, IncidenciaID) {
				return $http.post('/Incidencia/' + IncidenciaID, { 
								Titulo: $scope.Titulo, 
						    		Descripcion: $scope.Descripcion, 
					    			Instalacion: $scope.InstalacionSeleccionada.id, 
					    			Tipo: $scope.TipoSeleccionado, 
					    			Prioridad: $scope.PrioridadSeleccionada, 
					    			Estado: $scope.EstadoSeleccionado, 
					    			Operador: $scope.OperadorSeleccionado.ID, 
					    			FechaInicio: $scope.FechaInicio, 
					    			FechaPrevista: $scope.FechaPrevista, 
					    			FechaFin: $scope.FechaFin
					    		});
			},

			EstadisticasColaborador: function($scope) {
				console.log($scope);
				return $http.post('/EstadisticaColaborador', { 
								FechaInicio: $scope.Fechas.Inicio, 
						    		FechaFin: $scope.Fechas.Fin, 
					    			Colaborador: $scope.Colaborador.Seleccionado.ID
					    		});
			},

			EstadisticasOperador: function($scope) {
				return $http.post('/EstadisticaOperador', { 
								FechaInicio: $scope.Fechas.Inicio, 
						    		FechaFin: $scope.Fechas.Fin, 
					    			Operador: $scope.Operador.Seleccionado.ID
					    		});
			},

			EstadisticasInstalacion: function($scope) {
				return $http.post('/EstadisticaInstalacion', { 
								FechaInicio: $scope.Fechas.Inicio, 
						    		FechaFin: $scope.Fechas.Fin, 
					    			Instalacion: $scope.Instalacion.Seleccionada.id
					    		});
			},

			/*ADMIN*/
			CrearDepartamento: function($scope) {
				console.log($scope.NombreDepartamento);
				return $http.post('/Departamento', { 
								Nombre: $scope.NombreDepartamento, 
								Ubicaciones: []
					    		});
			},

			CrearUbicacion: function($scope) {
				
			},

			CrearInstalacion: function($scope) {
				
			}

		}

	});