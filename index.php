<?php
	require_once('php/config.php');
?>

<!doctype html>
<html>

<head>
  <meta charset="utf-8" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="js/cart.js?123" type="text/javascript"></script>
  <script src='js/reviews.js?123' type='text/javascript'></script>
</head>

<body>
  <div id="cart">
    <div>Товаров: <span class="items"></span></div>
    <div>Сумма: <span class="amount"></span></div>
    <a href="#" class="btn-clear">Очистить</a>
  </div>

  <div id="products">
    <?php foreach ( $products as $id => $product ) { ?>
    <div class="product product-<?php echo $id ?>">
      <p class="name"><b><?php echo $product['name'] ?></b></p>
      <p>Цена : <span class="price"><?php echo $product['price'] ?></span> &bull; В корзине : <span class="count">0</span></p>
      <div>
        <a href="#" class="btn-add" data-id="<?php echo $id ?>">Купить</a> |
        <a href="#" class="btn-remove" data-id="<?php echo $id ?>">Удалить</a> |
        <a href="#" class='btn-addReview' data-id="<?php echo $id ?>">Добавить отзыв</a> |
        <a href="#" class='btn-readReview' data-id="<?php echo $id ?>">Прочесть отзывы</a>
      </div>
    </div>
    <?php } ?>

  </div>
</body>

</html>
