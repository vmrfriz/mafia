/*************************************
*	Переменные для редактирования
* + headerTitle - заголовок страницы
*************************************/

var headerTitle = {
	die:	{title: "Утро", text: "Объявление о ночных происшествиях"},
	talk:	{title: "Обсуждение", text: "Поочередное высказывание догадок жителей города"},
	vote:	{title: "Голосование", text: "Голосование за казнь жителя одного города"},
	mafia:	{title: "Мафия", text: ""},
	police:	{title: "Комиссар", text: ""},
	killer:	{title: "Маньяк", text: ""},
	whore:	{title: "Любовница", text: ""},
	doctor:	{title: "Доктор", text: ""},
	default:{title: "Мафия", text: "Командная психологическая пошаговая ролевая игра с детективным сюжетом"}
};

var players = [];

$(function(){

/***************************
*			Бинды
***************************/
	// Открыть списка игроков
	$("#players-list")
	.removeClass("invisible")
	.click(function(){
		$(this).addClass("invisible");
		showRightBar();
	});
	
	// Скрыть список игроков
	$("#page-shadow").click(function(){
		hidePlayerContext();
		hideRightBar();
	});

	// Открыть контекстное меню игрока
	$(".players-list").on("click", ".player", function(event) {
		var id = $( event.currentTarget ).attr("data-id");
		showPlayerContext(id);
	});

	// Закрыть контекстрое меню игрока
	$(".players-list .shadow").click(function(){
		hidePlayerContext();
	});

	// Изменение шапки при нажатии на нижние блоки
	$(".sequence .step").click(function(){
		headerChange( $(this).attr("id") );
	});
    
    // Добавление пользователя
    $("#add-player").click(function(){
        $(this).addClass("invisible");
        showAddPlayer();
    });
});

/***************************
*		Функционал
***************************/

// Открытие списка игроков
function showRightBar() {
	$(this).addClass("invisible");
	$("#page-shadow").removeClass("nodisplay");
	$(".right-bar").css("right", 0);
	$("#page-wrapper").addClass("blur");
	$("button#add-player").removeClass("invisible");
}

// Закрытие списка игроков
function hideRightBar() {
	$("#page-shadow").addClass("nodisplay");
	$("button#add-player").addClass("invisible");
	$(".right-bar").removeAttr("style");
	$("#players-list").removeClass("invisible");
	$("#page-wrapper").removeClass("blur");
}

// Открыть контекстное меню
function showPlayerContext(id) {
	$(".players-list").find(".player").each(function(){
		if( $(this).attr("data-id") == id ) {
			var target = $(this);
			target.addClass("selected");
			$(".players-list .shadow").removeClass("nodisplay");
			$("#context")
				.css("top", target.outerHeight() + target.offset().top)
				.fadeIn(300);
		}
	});
	return true;
}

// Закрыть контекстное меню
function hidePlayerContext() {
	$("#context").fadeOut(300);
	$(".players-list").find(".player").each(function(){
		$(this).removeClass("selected disabled");
		$(".players-list .shadow").addClass("nodisplay");
	});
}

// Включение, выключение, переключение музыки

// Страница для каждого этапа игры

// Изменение шага в нижней панели

// Добавление игрока
function addPlayer(id, nickname, name) {
	var player = {id: id, nickname: nickname, name: name};
	var id = players.push(player);
	addPlayerHTML(id, player);
}

function addPlayerHTML(id, playerObj) {
	$(".players-list").append('\
	<div class="player" data-id="'+ id +'">\
		<div class="id">'+ playerObj["id"] +'</div>\
		<div class="nickname">'+ playerObj["nickname"] +'</div>\
		<div class="name">'+ playerObj["name"] +'</div>\
	</div>');
}

// Развернуть блок добавления игрока
function showAddPlayer() {
    $(".players-add")
    .removeClass("nodisplay")
    .addClass("show");
}

// Удаление игрока
function editPlayer() {
	
}

// Удаление игрока
function deletePlayer() {
	
}

// Изменение шапки
function headerChange(name) {
	headerTextChange(name);
	headerBgChange(name);
	return true;
}

// __изменение текста шапки
function headerTextChange(name) {
	$("header .title").text(
		headerTitle[name].title
		|| headerTitle["default"]["title"]
	);
	$("header .description").text(
		headerTitle[name].text
	);
	return true;
}

// __изменение фона шапки
function headerBgChange(name) {
	$("[class|='header-bg']").removeAttr("style");
	$(".header-bg-" + name).css("opacity", 1);
	return true;
}