//Массив уже загруженных картинок
var imageArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];
var scale = 1;
window.number = '0';
//Привязываем количество картинок к размеру массива
var imageCount = imageArray.length;
var lastLoadedCount = 0;
var viewer = document.getElementById('viewer');
//Выводим картинки
document.write('<img id="images" height="480px" src="' + imageArray[0] + '">');

// Добавляем масштабирование по колесику мыши
addOnWheel(viewer, function(e) {
	var delta = e.deltaY || e.detail || e.wheelDelta;
	// отмасштабируем при помощи CSS
	if (delta > 0) scale += 0.05;
		else scale -= 0.05;
	viewer.style.transform = viewer.style.WebkitTransform = viewer.style.MsTransform = 'scale(' + scale + ')';
	// отменим прокрутку
	e.preventDefault();
});

// добавляем слушатель на кнопку выбора файлов для отображения их в нашей галерее
document.getElementById('files').addEventListener("change", showFile, false);

function image(num){
		//Если выбрана следующая картинка
	if(num == 1){
			//Если это последняя картинка, то не увеличиваем счетчик number
		if(number < imageCount - 1){
			number++;
			document.getElementById('images').src = imageArray[number];
			document.getElementById('num_img').innerHTML= number + 1 + '/' + imageCount;
		}
	}					 
	else if (num == 0){  //Если выбрана предыдущая картинка
				//Если это первая картинка, то не уменьшаем счетчик number
		if(number > 0){
			number--;
			document.getElementById('images').src = imageArray[number];
			document.getElementById('num_img').innerHTML= number + 1 + '/' + imageCount;
		}
		} else { // на первую загруженную картинку
			number = imageArray.length - lastLoadedCount;
			document.getElementById('images').src = imageArray[number];
			document.getElementById('num_img').innerHTML= number + 1 + '/' + imageCount;
	}
}
//Функция для показа стрелочек
function btn_show(){

	if(number != 0) document.getElementById('left').style.display='block';
	if(number != imageCount - 1) document.getElementById('right').style.display='block';
}
// прекращает показ стрелочек
function btn_hide(){

	document.getElementById('left').style.display='none';
	document.getElementById('right').style.display='none';
}
// добавляет слушатель на колесико мыши: при прокрутке изменяется масштаб нашего блока с картинкой
function addOnWheel(elem, handler) {
      if (elem.addEventListener) {
        if ('onwheel' in document) {
          // IE9+, FF17+
          elem.addEventListener("wheel", handler);
        } else if ('onmousewheel' in document) {
          // устаревший вариант события
          elem.addEventListener("mousewheel", handler);
        } else {
          // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
          elem.addEventListener("MozMousePixelScroll", handler);
        }
      } else { // IE8-
        viewer.attachEvent("onmousewheel", handler);
      }
    }
// восстанавливает масштаб блока с картинкой
function resize(delta) {
	if (delta > 0) scale += 0.1;
		else if (delta < 0) scale -= 0.1;
		else scale = 1;
	document.getElementById('viewer').style.transform = viewer.style.WebkitTransform = viewer.style.MsTransform = 'scale(' + scale + ')';
}

// отображение выбранных файлов в нашем просмотрщике
function showFile(e) {
    var files = e.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) continue;
      var fr = new FileReader();
      fr.onload = (function(theFile) {
        return function(e) {
		  imageCount++;
          imageArray.push(e.target.result);
		  lastLoadedCount = files.length;
		  image(2);
        };
      })(f);
      fr.readAsDataURL(f);
    }
  }