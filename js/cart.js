// 1. начнем с получим все текущие элементы корзины
// использовать метод get 
// завести класс Cart

var Cart = function () {
  this.items = [];
  this.view = {};
  this.view.cart = $('#cart');
  this.view.products = $('#products');
  this.totalAmount = 0;
  this.itemsCount = 0;
  this.setEvents();
  this.request(Cart.urls.load);
};

Cart.urls = {
  load: 'php/cart.php?method=get',
  add: 'php/cart.php?method=add',
  remove: 'php/cart.php?method=remove',
  clear: 'php/cart.php?method=clear'
};

Cart.prototype.setEvents = function () {
  // @todo: событие нажатия на кнопку clear
  $('.btn-clear').on('click', this.onClear.bind(this));
  // @todo: событие нажатия на кнопке remove
  $('.btn-remove').on('click', this.onRemove.bind(this));
  $('.btn-add').on('click', this.onAdd.bind(this));
};

Cart.prototype.onAdd = function (event) {
  var id = parseInt($(event.currentTarget).attr('data-id'));
  console.log('Добавление товара в корзину');
  if (id) {
    this.request(Cart.urls.add, 'id=' + id);
  }
};

Cart.prototype.onRemove = function (event) {
  var id = parseInt($(event.currentTarget).attr('data-id'));
  console.log('Удаление товара из корзины');
  if (id) {
    this.request(Cart.urls.remove, 'id=' + id);
  }
};


// метод очищения корзины
Cart.prototype.onClear = function () {
  console.log('Очистка корзины');
  this.request(Cart.urls.clear, '');
}

// написать метод render, который выводит html
Cart.prototype.render = function () {
  this.view.cart.find('.items').html(this.itemsCount);
  this.view.cart.find('.amount').html(this.totalAmount);

  this.items.forEach(function (item) {
    this.view.products.find('.product-' + item.id).find('.count').html(item.count);
  }, this);
};

// реализовать метод запроса на сервер
Cart.prototype.request = function (url, data) {
  $.get({
    url: url,
    data: data,
    dataType: 'json',
    context: this,
    success: function (response) {
      this.process(url, response);
    },
    error: function (error) {}
  });
};

Cart.prototype.getProduct = function (id) {
  return this.items.find(function (item) {
    return item.id == id;
  });
};

Cart.prototype.removeProduct = function (product) {
  // @todo: реализация метода
  var item = this.getProduct(product.id);

  if (item) {
    --item.count;
  } else {
    this.items.push(product);
  }
};

Cart.prototype.addProduct = function (product) {
  var item = this.getProduct(product.id);

  if (item) {
    ++item.count;
  } else {
    this.items.push(product);
  }
};

Cart.prototype.calculate = function () {
  this.totalAmount = 0;
  this.itemsCount = 0;

  this.items.forEach(function (item) {
    if (item.count > 0) {
      this.itemsCount += item.count;
      this.totalAmount += (item.count * item.price);
    }
  }, this);
};

// метод обработки запроса
Cart.prototype.process = function (url, response) {
  if (response.result) {
    switch (url) {
      case Cart.urls.load:
        this.items = response.items;
        break;
      case Cart.urls.add:
        this.addProduct(response.item);
        break;
      case Cart.urls.remove:
        this.removeProduct(response.id);
        break;
      case Cart.urls.clear:
        this.items = [];
        break;
      default:
        break;
    }
    this.calculate();
    this.render();
  }
};

$(document).ready(function () {
  var cart = new Cart();
});
