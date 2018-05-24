var Reviews = function () {
  this.reviews = [];
  this.setEvents();
  this.request(Reviews.urls);
};

Reviews.urls = {
  list: 'js/review.list.json'
};

// Отслеживание кликов
Reviews.prototype.setEvents = function () {
  $('.btn-readReview').on('click', this.onList.bind(this));
};

//Модуль вывода отзывов
//| URL: review.list.json 
//| Тип запроса:  POST, asynchronous 
//| Передаваемые данные:  {} 
//| Ожидаемый ответ: {comments: [{id_comment: 123,text: ‘Текст отзыва’}]} 
//| Ответ в случае системной ошибки: {result : 0,error_message : “Сообщение об ошибке”} 

Reviews.prototype.onList = function (event) {
  var id = parseInt($(event.currentTarget).attr('data-id'));
  if (id) {
    this.request(Reviews.urls.list, 'id=' + id);
  }
};

// загрузка JSON AJAX-запросом
Reviews.prototype.request = function (url, data) {
  $.ajax({
    dataType: "json",
    url: 'js/review.list.json',
    data: data,
    context: this,
    success: function (response) {
      console.log('Вывод отзывов для ' + data);
    },
    error: function (error) {
      console.log('Ошибка загрузки данных для ' + data);
    }
  });
};


$(document).ready(function () {
  var reviews = new Reviews();
});
