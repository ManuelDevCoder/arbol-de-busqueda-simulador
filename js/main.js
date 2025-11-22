/**
 * 
 * Desarrollado Por
 * 
 * ManuelDevCoder
 * 
 */
Array.prototype.contains = function(object) {
	for(i = 0; i < this.length; i++){
		if(this[i] == object){
			return i;
		}
	}
	return -1;
};

Array.prototype.add = function(object) {
	if(object === null && this.contains(object) >= 0){
		return false;
	}
	else{
		this[this.length] = object;
		return true;
	}
};

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

Array.prototype.isEmpty = function() {
	if(this == null || this.length == 0){
		return true;
	}
	else{
		return false;
	}
};

function isInCircle(x, y, center_x, center_y, radius) {
	return (Math.pow(x-center_x, 2) + Math.pow(y - center_y, 2) < radius*radius)
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


var sequence = 0;
var raiz = null; // Raíz del Árbol Binario de Búsqueda
var nodos = new Array(); // Lista plana de nodos para dibujo y búsqueda
var canvas;
var context;
var tela;
var divOpcoes;
var divOpcoesAberta = false;
var clickLiberado = false;

// Constantes de dibujo
var larguraNodo = 25;
var alturaNodo = 25;
var espacoNivel = 50;

// Contenedor de notificaciones
var toastContainer;

function init() {
	// crea tela
	tela = new Tela(1000, 600);
	
	divOpcoes = document.createElement('div');
	divOpcoes.id = "divOpcoes";

	// Inicializar contenedor de toasts
	toastContainer = document.createElement('div');
	toastContainer.id = "toast-container";
	document.body.appendChild(toastContainer);

	// canvas
	canvas = document.getElementById('drawing');
	context = canvas.getContext('2d');
	
	canvas.addEventListener('mousedown', ckmouse, false);

	// dibuja la pantalla inicial
	tela.draw();
	
	// Inicializar el botón de inserción y el campo de texto
	$("#btnInsertarNodo").button().click(manejarInsercionUI);
	$("#inputValor").keypress(function(e) {
		if (e.which == 13) {
			manejarInsercionUI();
		}
	});
}

/**
 * Muestra una notificación flotante (toast).
 * @param {string} message El mensaje a mostrar.
 * @param {string} type El tipo de mensaje ('success', 'error', 'info').
 */
function showToast(message, type) {
    var toast = $('<div>').addClass('toast toast-' + type).text(message);
    
    // Añadir a la parte superior derecha
    $('#toast-container').append(toast);

    // Mostrar y luego ocultar después de 3 segundos
    toast.fadeIn(400).delay(3000).fadeOut(400, function() {
        $(this).remove();
    });
}


function Nodo(valor) {
	this.pk;
	this.valor = valor;
	this.izquierdo = null;
	this.derecho = null;
	this.padre = null; // Referencia al padre

	this.x = null;
	this.y = null;
	this.nivel = 0;

	this.draw = drawNodo;

	obterPK(this);
}

function obterPK(objeto) {
	objeto.pk = ++sequence;
}

function findByPK(pk) {
	for (var i = 0; i < nodos.length; i++) {
		if (nodos[i].pk == pk) {
			return nodos[i];
		}
	}
	return null;
}

function findNodeByValue(valor) {
    if (!raiz) return null;
    let actual = raiz;
    while (actual) {
        if (valor === actual.valor) return actual;
        if (valor < actual.valor) {
            actual = actual.izquierdo;
        } else {
            actual = actual.derecho;
        }
    }
    return null;
}

function ckmouse(e) {
	
	$(divOpcoes).hide();

	var nodo = null;
	for (var i = 0; i < nodos.length; i++) {
		if (isInCircle(e.offsetX, e.offsetY, nodos[i].x, nodos[i].y, larguraNodo / 2)) {
			nodo = nodos[i];
			break;
		}
	}
	
	if (nodo == null) {
		return;
	}
	
	divOpcoes.innerHTML = "";
	
	// Condición: Solo mostrar "Eliminar nodo" si es un nodo hoja.
	var esHoja = nodo.izquierdo === null && nodo.derecho === null;

	if (esHoja) {
		var div = document.createElement('div');
		div.innerHTML = "Eliminar nodo";
		$(div).bind('click', function(){
			$(divOpcoes).hide();
			excluirNodo(nodo.pk, true);
            showToast("Nodo " + nodo.valor + " eliminado.", 'success');
		});
		$(divOpcoes).append(div);
	} else {
        // Si no es hoja, mostramos un mensaje informativo
        var div = document.createElement('div');
		div.innerHTML = "Solo se pueden eliminar nodos hoja";
        $(divOpcoes).append(div);
    }
		
	$("#main").append(divOpcoes);
	$(divOpcoes).css('position', 'absolute');
	$(divOpcoes).css('left', e.offsetX + 'px');
	$(divOpcoes).css('top', e.offsetY + 'px');
	$(divOpcoes).show();
	
}

function manejarInsercionUI() {
    var input = $("#inputValor");
    var valorStr = input.val();
    
    if (valorStr === null || valorStr.trim() === "") {
        showToast("Por favor, ingrese un valor.", 'error');
        return;
    }

    if (!isNumber(valorStr)) {
        showToast("Debe ingresar un número válido.", 'error');
        return;
    }
    
    var valor = parseInt(valorStr);

    if (findNodeByValue(valor)) {
        showToast("El valor ya existe en el árbol. Los BST no permiten valores duplicados.", 'error');
        return;
    }

    insertarNodo(valor);
    tela.draw();
    input.val(""); // Limpiar el campo después de la inserción
    showToast("Nodo " + valor + " insertado correctamente.", 'success');
}

function insertarNodo(valor) {
    var nuevoNodo = new Nodo(valor);
    nodos.add(nuevoNodo);

    if (raiz === null) {
        raiz = nuevoNodo;
        raiz.nivel = 0;
        return;
    }

    let actual = raiz;
    let padre = null;

    while (actual) {
        padre = actual;
        if (valor < actual.valor) {
            actual = actual.izquierdo;
        } else if (valor > actual.valor) {
            actual = actual.derecho;
        } else {
            // Esto no debería pasar si se usa findNodeByValue antes, pero es un buen fallback
            return; 
        }
    }

    nuevoNodo.padre = padre;
    nuevoNodo.nivel = padre.nivel + 1;

    if (valor < padre.valor) {
        padre.izquierdo = nuevoNodo;
    } else {
        padre.derecho = nuevoNodo;
    }

    // Ajustar altura del canvas si es necesario
    var t = document.getElementById('drawing');
    var height = t.height;
    // Estimación de Y para el nuevo nodo (se recalcula en draw, pero esto es para la altura)
    var temp = nuevoNodo.nivel * (alturaNodo + espacoNivel) + 50; 
    if (temp + 50 > height) {
        t.height = temp + 50;
        tela.altura = temp + 50;
    }
}

function encontrarMinimo(nodo) {
    let actual = nodo;
    while (actual.izquierdo) {
        actual = actual.izquierdo;
    }
    return actual;
}

function excluirNodo(pkNodo, redibujar) {
    var nodo = findByPK(pkNodo);
    if (nodo == null) {
        return false;
    }

    // Función auxiliar para eliminar de la lista plana
    function eliminarDeListaPlana(node) {
        var pos = nodos.contains(node);
        if (pos !== -1) {
            nodos.remove(pos);
        }
    }

    // Caso 1: Nodo hoja (0 hijos)
    if (nodo.izquierdo === null && nodo.derecho === null) {
        if (nodo === raiz) {
            raiz = null;
        } else {
            if (nodo.padre.izquierdo === nodo) {
                nodo.padre.izquierdo = null;
            } else {
                nodo.padre.derecho = null;
            }
        }
        eliminarDeListaPlana(nodo);
    } 
    // Caso 2: Nodo con un hijo
    else if (nodo.izquierdo === null || nodo.derecho === null) {
        let hijo = nodo.izquierdo || nodo.derecho;
        
        if (nodo === raiz) {
            raiz = hijo;
            hijo.padre = null;
        } else {
            hijo.padre = nodo.padre;
            if (nodo.padre.izquierdo === nodo) {
                nodo.padre.izquierdo = hijo;
            } else {
                nodo.padre.derecho = hijo;
            }
        }
        eliminarDeListaPlana(nodo);
    } 
    // Caso 3: Nodo con dos hijos
    else {
        let sucesor = encontrarMinimo(nodo.derecho);
        
        // Copiar valor del sucesor al nodo actual
        nodo.valor = sucesor.valor;
        
        // Recursivamente eliminar el sucesor (que ahora es un caso 1 o 2)
        // No necesitamos redibujar aquí, ya que la llamada original lo hará.
        excluirNodo(sucesor.pk, false); 
    }

    if (redibujar) {
        tela.draw();
    }
}


function limpaValoresEQuebras() {
	$("#recorrido-output").html(""); 
	tela.draw();
}

function excluirTudo() {
	raiz = null;
	nodos = new Array();
	sequence = 0;
	limpaValoresEQuebras();
    showToast("Árbol limpiado.", 'info');
	tela.draw();
}

// --- Lógica de Recorridos (Traversals) ---

function iniciarRecorrido() {
    if (!raiz) {
        showToast("El árbol está vacío. Agregue nodos primero.", 'info');
        return;
    }
    limpaValoresEQuebras();
    
    var preordenResult = [];
    var inordenResult = [];
    var postordenResult = [];
    
    recorridoPreorden(raiz, preordenResult);
    recorridoInorden(raiz, inordenResult);
    recorridoPostorden(raiz, postordenResult);

    var outputHtml = "<strong>Preorden:</strong> " + preordenResult.join(", ") + "<br>" +
                     "<strong>Inorden:</strong> " + inordenResult.join(", ") + "<br>" +
                     "<strong>Postorden:</strong> " + postordenResult.join(", ");
    $("#recorrido-output").html(outputHtml);
    showToast("Recorridos calculados.", 'success');
}

function recorridoPreorden(nodo, resultado) {
    if (nodo === null) return;
    resultado.push(nodo.valor);
    recorridoPreorden(nodo.izquierdo, resultado);
    recorridoPreorden(nodo.derecho, resultado);
}

function recorridoInorden(nodo, resultado) {
    if (nodo === null) return;
    recorridoInorden(nodo.izquierdo, resultado);
    resultado.push(nodo.valor);
    recorridoInorden(nodo.derecho, resultado);
}

function recorridoPostorden(nodo, resultado) {
    if (nodo === null) return;
    recorridoPostorden(nodo.izquierdo, resultado);
    recorridoPostorden(nodo.derecho, resultado);
    resultado.push(nodo.valor);
}


// --- Lógica de Dibujo y Reorganización ---

function Tela(largura, altura) {
	this.largura = largura;
	this.altura = altura;

	this.draw = drawTela;
}

function drawTela(nodoList) {
	if (!nodoList) {
		nodoList = nodos;
	}

	// 1. Recalcular posiciones (x, y, nivel)
	if (raiz) {
	    reorganizaNew(raiz);
	}

	// Limpiar canvas
	context.beginPath();
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.closePath();

	// 2. Dibujar líneas y nodos
	
	// Dibujar líneas
	for(var i = 0; i < nodoList.length; i++){
	    var nodo = nodoList[i];
	    
		if (nodo.padre != null) {
			context.beginPath();
			context.strokeStyle = "black";
			context.moveTo(nodo.x, nodo.y);
			context.lineTo(nodo.padre.x, nodo.padre.y);
			context.stroke();
			context.closePath();
		}
	}
	
	// Dibujar nodos encima de las líneas
	for(var i = 0; i < nodoList.length; i++){
		nodoList[i].draw();
	}
}

function drawNodo(color) {
	color = "black"
	fillstyle = "white";
	firstfill = "rgb(160,160,160)";
	
	// Dibujar círculo exterior (borde)
	context.fillStyle = firstfill;
	context.strokeStyle = color;
	context.beginPath();
	context.arc(this.x, this.y, alturaNodo/2+2, 0, 2 * Math.PI, false);
	context.fill();
	context.closePath();
	
	// Dibujar círculo interior
	context.fillStyle = fillstyle;
	context.beginPath();
	context.arc(this.x, this.y, alturaNodo/2, 0, 2 * Math.PI, false);
	context.stroke();
	context.fill();
	context.closePath();
	
	if (this.valor != null) {
		context.fillStyle = "blue";
		context.font = "bold 13px 'Courier New'";
		
		var str = new String(this.valor);
		var pxLetra = 8;
		var larg = pxLetra * str.length;
		
		context.fillText(this.valor, this.x - larg/2, this.y + 4);
	}
}

// Reorganización para BST: Asigna X, Y y Nivel a todos los nodos.
function reorganizaNew(nodo) {
    if (!nodo) return;

    // 1. Calcular niveles y limpiar posiciones
    function calcularNiveles(node, nivel) {
        if (!node) return;
        node.x = null;
        node.y = nivel * (alturaNodo + espacoNivel) + 50;
        node.nivel = nivel;
        calcularNiveles(node.izquierdo, nivel + 1);
        calcularNiveles(node.derecho, nivel + 1);
    }
    calcularNiveles(raiz, 0);

    // 2. Asignar posiciones X (basado en el orden inorden para espaciamiento)
    var nodosInorden = [];
    function getInorden(node) {
        if (!node) return;
        getInorden(node.izquierdo);
        nodosInorden.push(node);
        getInorden(node.derecho);
    }
    getInorden(raiz);

    var larguraTotal = tela.largura;
    var espacamentoHorizontal = larguraTotal / (nodosInorden.length + 1);

    for (var i = 0; i < nodosInorden.length; i++) {
        nodosInorden[i].x = (i + 1) * espacamentoHorizontal;
    }
}


$("document").ready(function(){

	init();

    // Función para cerrar el diálogo al hacer clic en el overlay
    function setupOverlayClose(dialogId) {
        // Usamos el evento 'dialogopen' para adjuntar el manejador de clic al overlay
        $(dialogId).on('dialogopen', function() {
            $('.ui-widget-overlay').on('click', function() {
                $(dialogId).dialog('close');
            });
        });
        // Usamos el evento 'dialogclose' para limpiar el manejador del overlay
        $(dialogId).on('dialogclose', function() {
            $('.ui-widget-overlay').off('click');
        });
    }
});