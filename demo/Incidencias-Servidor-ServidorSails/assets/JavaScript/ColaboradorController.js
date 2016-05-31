angular.module("AppIncidencias")

	.controller('ColaboradorController', function ($scope, $route, $routeParams, $http, $timeout, $uibModalInstance, IncidenciaID) {

		$scope.DepartamentoSeleccionado;
		$scope.SubdepartamentoSeleccionado;
		$scope.InstalacionSeleccionada;
		$scope.Departamentos = "";
		$scope.TiposIncidencia = "";
		$scope.TipoSeleccionado;

		$scope.getDepartamentos = function() {
			$http.get('/Departamento')
				.success(function(data) {
					$scope.Departamentos = data;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.SubdepartamentoSeleccionado = $scope.Departamentos[0].Subdepartamentos[0];
					$scope.InstalacionSeleccionada = $scope.Departamentos[0].Subdepartamentos[0].Instalaciones[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};

		$scope.getTiposIncidencia = function() {
			$http.get('/TiposIncidencia')
				.success(function(data) {
					$scope.TiposIncidencia = data.Tipos;
					$scope.TipoSeleccionado = $scope.TiposIncidencia[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};

		$scope.setSubdepartamento = function() {
			$scope.SubdepartamentoSeleccionado = $scope.Departamentos[$scope.DepartamentoSeleccionado.id-1].Subdepartamentos[0];
			$scope.InstalacionSeleccionada =$scope.SubdepartamentoSeleccionado.Instalaciones[0];
		};
		$scope.setInstalacion = function() {
			$scope.InstalacionSeleccionada =$scope.SubdepartamentoSeleccionado.Instalaciones[0];
		};

		$scope.setDepartamento = function(InstalacionID) {
			console.log("InstalacionID");
			console.log(InstalacionID);
			$timeout(function() {
					for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
						for ( var n = 0 ; n < $scope.Departamentos[i].Subdepartamentos.length ; n++ ) {
							for ( var o = 0 ; o < $scope.Departamentos[i].Subdepartamentos[n].Instalaciones.length ; o++ ){
								if ( $scope.Departamentos[i].Subdepartamentos[n].Instalaciones[o].id == InstalacionID ) {
									console.log("$scope.Departamentos[i].Subdepartamentos[n].Instalaciones[o].id");
									console.log($scope.Departamentos[i].Subdepartamentos[n].Instalaciones[o].id);
									console.log("Departamento");
									$scope.DepartamentoSeleccionado = $scope.Departamentos[i];	
									console.log("Subdepartamento");
									$scope.SubdepartamentoSeleccionado = $scope.Departamentos[i].Subdepartamentos[n];
									console.log("Instalacion");
									$scope.InstalacionSeleccionada = $scope.Departamentos[i].Subdepartamentos[n].Instalaciones[o];
								}
							}						
						}
					}
			}, 5 );
			console.log("fin");
		}


		$scope.setTipoIncidencia = function(Tipo) {
			$timeout(function() {
					for ( var i = 0 ; i < $scope.TiposIncidencia.length ; i++ ) {
						if ( $scope.TiposIncidencia[i] == Tipo ) {
							$scope.TipoSeleccionado = $scope.TiposIncidencia[i];
						}
					}
			}, 5 );
		}

		$scope.getIncidencia = function () {
			$http.get('/Incidencia/' + IncidenciaID)
				.success(function(data) {
					console.log("data");
					console.log(data);
					$scope.Titulo = data.Titulo;
					$scope.Descripcion = data.Descripcion;
					$scope.setDepartamento(data.Instalacion.id);
					$scope.setTipoIncidencia(data.Tipo);
				})
				.error(function(error) {
					console.log(error);
				});
		};

		$scope.CrearIncidencia = function () {
			$http.post('/Incidencia', { Titulo: $scope.Titulo, Descripcion: $scope.Descripcion, Tipo: $scope.TipoSeleccionado, Instalacion: $scope.InstalacionSeleccionada })
				.success(function(data) {
					$route.reload();
				})
				.error(function(error) {
					console.log(error);
				});

			$timeout(function() {
				$route.reload();
			}, 5 );

			$uibModalInstance.close();
		};

		$scope.EditarIncidencia = function () {
			console.log("tipo TipoSeleccionado");
			console.log($scope.TipoSeleccionado);
			$http.post('/Incidencia/' + IncidenciaID, { Titulo: $scope.Titulo, Descripcion: $scope.Descripcion, Tipo: $scope.TipoSeleccionado, Instalacion: $scope.InstalacionSeleccionada })
				.success(function(data) {
					$route.reload();
				})
				.error(function(error) {
					console.log(error);
				});	

			$timeout(function() {
				$route.reload();
			}, 5 );

			$uibModalInstance.close();
		};

		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
			$timeout(function() {
				$route.reload();
			}, 5 );
		};

	});